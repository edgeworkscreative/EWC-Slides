import { Component, Element, Event, EventEmitter, Listen, Method, Prop, State, Watch } from '@stencil/core';
import { addClass, removeClass } from '../../utils';

@Component({
  tag:      'ewc-slides',
  styleUrl: 'ewc-slides.css',
  shadow:   true
})
export class EwcSlides {
  private container: HTMLElement;
  @Element() el!: HTMLElement;
  @State() touchStartX: number;
  @State() touchMoveX: number;
  @State() moveX: number;
  @State() index: number = 0;
  @State() totalSlides: number;
  @State() innerEl: HTMLElement;
  @State() isLocked: boolean;
  @State() mouseIsDown: boolean;
  
  /**
   * Value in px. Defaults to `30`.
   * If "touch distance" is lower than this value then slide will not start moving.
   * See `threshold` for more information.
   */
  @Prop() dragThreshold: number = 30;
  
  /**
   * Value in px. Defaults to `80`.
   * If "touch distance" is greater than this value then active slide will change upon release.
   * If "touch distance" is NOT greater than this value then the active slide will snap back upon release.
   */
  @Prop() threshold: number = 80;
  
  /**
   * Enable/disable swiping on elements. Defaults to `true`.
   */
  @Prop() noSwiping: boolean = true;
  
  /**
   * Specify elements to disable swiping on. Defaults to `['input', 'textarea', 'img']`.
   */
  @Prop() noSwipingTags: string[] = ['input', 'textarea', 'img'];
  
  /**
   * Emitted when the slider is actively being moved.
   */
  @Event() sliderDrag!: EventEmitter;
  
  /**
   * Emitted when the active index has changed.
   */
  @Event() sliderIndexChange!: EventEmitter;
  
  /**
   * Emitted when the slider is at the first slide.
   */
  @Event() sliderReachBeginning!: EventEmitter;
  
  /**
   * Emitted when the slider is at the last slide.
   */
  @Event() sliderReachEnd!: EventEmitter;
  
  /**
   * Emitted when the user first touches the slider.
   */
  @Event() sliderTouchStart!: EventEmitter;
  
  /**
   * Emitted when the user releases the touch.
   */
  @Event() sliderTouchEnd!: EventEmitter;
  
  componentDidLoad() {
    this.container   = (this.el.shadowRoot || this.el) as HTMLElement;
    this.innerEl     = this.container.querySelector('.inner');
    this.totalSlides = (this.el.querySelectorAll('ewc-slide').length - 1);
  }
  
  private addAnimations() {
    addClass(this.innerEl, 'animate');
    addClass(this.el.querySelector(`ewc-slide:nth-child(${this.index})`), 'animate');
  }
  
  private removeAnimations() {
    removeClass(this.innerEl, 'animate');
    removeClass(this.el.querySelector(`ewc-slide-item:nth-child(${this.index})`), 'animate');
  }
  
  private updateSlidePosition(indexDidChange: boolean) {
    if (!this.isLocked) {
      if (indexDidChange) {
        if (this.isEnd()) {
          this.sliderReachEnd.emit();
        }
        if (this.isBeginning()) {
          this.sliderReachBeginning.emit();
        }
        this.sliderIndexChange.emit(this.index);
        this.addAnimations();
      } else this.removeAnimations();
      this.innerEl.style.transform = `translate3d(-${(this.index * this.el.offsetWidth)}px,0,0)`;
    }
  }
  
  private getSwipeDirection(): 'RIGHT' | 'LEFT' {
    return (this.touchStartX - this.touchMoveX) < 0 ? 'RIGHT' : 'LEFT';
  }
  
  private clickContainsNoSwipingTags(event: any) {
    return event.path.some((node: HTMLElement) => {
      if (node.tagName) {
        return (this.noSwipingTags.indexOf(node.tagName.toLowerCase()) != -1);
      }
    });
  }
  
  /**
   * Get the index of the active slide.
   */
  @Method()
  getActiveIndex(): number {
    return this.index;
  }
  
  /**
   * Get the index of the next slide.
   */
  @Method()
  getNextIndex(): number {
    return this.index === this.totalSlides ? this.totalSlides : (this.index + 1);
  }
  
  /**
   * Get the index of the previous slide.
   */
  @Method()
  getPreviousIndex(): number {
    return this.index === 0 ? 0 : (this.index - 1);
  }
  
  /**
   * Get the percent of completed slides.
   */
  @Method()
  getProgress() {
    return Math.round((this.index / this.totalSlides) * 100);
  }
  
  /**
   * Get the total number of slides.
   */
  @Method()
  getTotalSlides(): number {
    return this.totalSlides;
  }
  
  /**
   * Get whether or not the current slide is the first slide.
   */
  @Method()
  isBeginning(): boolean {
    return this.index === 0;
  }
  
  /**
   * Get whether or not the current slide is the last slide.
   */
  @Method()
  isEnd(): boolean {
    return this.index === this.totalSlides;
  }
  
  /**
   * Lock or unlock the ability to change the active slide.
   */
  @Method()
  lockSwipes(shouldLockSwipes: boolean) {
    this.isLocked = shouldLockSwipes;
  }
  
  /**
   * Transition to the next slide.
   */
  @Method()
  nextSlide() {
    this.index = this.getNextIndex();
  }
  
  /**
   * Transition to the previous slide.
   */
  @Method()
  previousSlide() {
    this.index = this.getPreviousIndex();
  }
  
  /**
   * Transition to the specified slide.
   */
  @Method()
  slideTo(index: number) {
    this.index = index;
  }
  
  @Watch('index')
  indexChanged() {
    this.updateSlidePosition(true);
  }
  
  @Watch('moveX')
  translateMovingSlider() {
    let absMove = Math.abs((this.moveX - (this.index * this.el.offsetWidth)));
    if (this.mouseIsDown && (absMove > this.dragThreshold)) {
      this.sliderDrag.emit(-this.moveX);
      this.innerEl.style.transform = `translate3d(-${this.moveX}px,0,0)`;
    }
  }
  
  @Listen('window:resize')
  onWindowResize() {
    this.updateSlidePosition(false);
  }
  
  @Listen('mousedown')
  @Listen('touchstart')
  touchStart(event: MouseEvent | TouchEvent) {
    this.sliderTouchStart.emit();
    if (!this.isLocked && !this.clickContainsNoSwipingTags(event)) {
      this.mouseIsDown = true;
      this.touchStartX = (event instanceof MouseEvent) ? event.pageX : event.touches[0].pageX;
      this.removeAnimations();
    }
  }
  
  @Listen('mousemove')
  @Listen('touchmove')
  touchMove(event: MouseEvent | TouchEvent) {
    if (!this.isLocked && this.mouseIsDown) {
      this.touchMoveX = (event instanceof MouseEvent) ? event.pageX : event.touches[0].pageX;
      this.moveX      = ((this.index * this.el.offsetWidth) + (this.touchStartX - this.touchMoveX));
    }
  }
  
  @Listen('mouseup')
  @Listen('touchend')
  touchEnd(event: MouseEvent | TouchEvent) {
    this.sliderTouchEnd.emit();
    if (!this.isLocked && this.mouseIsDown) {
      this.mouseIsDown = false;
      let endX         = (event instanceof MouseEvent) ? event.pageX : event.changedTouches[0].pageX;
      let absMove      = Math.abs((this.touchStartX - endX));
      if (this.getSwipeDirection() === 'LEFT' && (this.index < this.totalSlides) && absMove > this.threshold) {
        this.index++;
      } else if (this.getSwipeDirection() === 'RIGHT' && (this.index > 0) && absMove > this.threshold) {
        this.index--;
      } else if (endX >= this.dragThreshold || this.index === this.totalSlides || this.index === 0) {
        // drag distance wasn't far enough to trigger a slide change. Move slide back to original position.
        this.updateSlidePosition(true);
      }
    }
  }
  
  render() {
    return [
      <div class="slider-container" id="slider">
        <div class="inner">
          <slot/>
        </div>
      </div>
    ];
  }
}

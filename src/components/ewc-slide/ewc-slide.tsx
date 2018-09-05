import { Component, Element } from '@stencil/core';

@Component({
  tag:      'ewc-slide',
  styleUrl: 'ewc-slide.css',
  shadow:   true
})
export class EwcSlide {
  @Element() el!: HTMLElement;
  
  componentDidLoad() {
    const imgs = this.el.querySelectorAll('img');
    (Array.from(imgs) as HTMLImageElement[]).map((img) => {
      img.style.pointerEvents = 'none';
    })
  }
  
  render() {
    return (
      <div class=" slide-wrapper">
        <slot/>
      </div>
    );
  }
}

import { Component } from '@stencil/core';

@Component({
  tag:      'ewc-slide',
  styleUrl: 'ewc-slide.css',
  shadow:   true
})
export class EwcSlide {
  
  render() {
    return (
      <div class="slide-wrapper">
        <slot />
      </div>
    );
  }
}

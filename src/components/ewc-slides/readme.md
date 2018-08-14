# ewc-slides



<!-- Auto Generated Below -->


## Events

| Event                  | Description                                      |
| ---------------------- | ------------------------------------------------ |
| `sliderDrag`           | Emitted when the slider is actively being moved. |
| `sliderIndexChange`    | Emitted when the active index has changed.       |
| `sliderReachBeginning` | Emitted when the slider is at the first slide.   |
| `sliderReachEnd`       | Emitted when the slider is at the last slide.    |
| `sliderTouchEnd`       | Emitted when the user releases the touch.        |
| `sliderTouchStart`     | Emitted when the user first touches the slider.  |


## Methods

| Method             | Description                                              |
| ------------------ | -------------------------------------------------------- |
| `getActiveIndex`   | Get the index of the active slide.                       |
| `getNextIndex`     | Get the index of the next slide.                         |
| `getPreviousIndex` | Get the index of the previous slide.                     |
| `getProgress`      | Get the percent of completed slides.                     |
| `getTotalSlides`   | Get the total number of slides.                          |
| `isBeginning`      | Get whether or not the current slide is the first slide. |
| `isEnd`            | Get whether or not the current slide is the last slide.  |
| `lockSwipes`       | Lock or unlock the ability to change the active slide.   |
| `nextSlide`        | Transition to the next slide.                            |
| `previousSlide`    | Transition to the previous slide.                        |
| `slideTo`          | Transition to the specified slide.                       |


## CSS Custom Properties

| Name                 | Description             |
| -------------------- | ----------------------- |
| `--slide-transition` | Active slide transition |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*

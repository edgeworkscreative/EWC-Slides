# ewc-slides











<!-- Auto Generated Below -->


## Properties

| Property        | Attribute        | Description                                                                                                                                                                                                                     | Type       |
| --------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `dragThreshold` | `drag-threshold` | Value in px. Defaults to `30`. If "touch distance" is lower than this value then slide will not start moving. See `threshold` for more information.                                                                             | `number`   |
| `noSwipingTags` | --               | Specify elements to disable swiping on. Defaults to `['input', 'textarea', 'img']`.                                                                                                                                             | `string[]` |
| `noSwiping`     | `no-swiping`     | Enable/disable swiping on elements. Defaults to `true`.                                                                                                                                                                         | `boolean`  |
| `threshold`     | `threshold`      | Value in px. Defaults to `80`. If "touch distance" is greater than this value then active slide will change upon release. If "touch distance" is NOT greater than this value then the active slide will snap back upon release. | `number`   |


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

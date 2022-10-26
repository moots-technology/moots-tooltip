# Moots Tooltip

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.0

# Usage

Using with the Ionic lifescycle hooks.

## Install

Dependencies:

`npm i @floating-ui/dom arrows-svg`

The tooltip:

`npm i moots-arrow-tooltip`

## Example
### Add arrows-svg moudle declaration file (TypeScript project only)
Due to `arrows-svg` currently is a JavaScript library. So we have to create a moudle declaration to let TypeScript know it exists.

In your project, create a new file called arrows-svg.d.ts.
```ts
declare module 'arrows-svg' {
  interface IArrow {
    node: DocumentFragment;
    clear: () => void;
  }
}
```
Include the declarations file in your `tsconfig.json` or `tsconfig.spec.json`
```ts
{
  ...
  "include": [
    "src"
    ".../arrows-svg.d.ts" // <-
  ]
}
```
### Apply it in your code
> *Tips: you may want apply tooltip with Angular or other frameworks lifecycle hooks for the best performance.*

For example, in the `ion-page.ts` file of an Ionic project:
```ts
import { Component } from '@angular/core';
import { MootsTooltipService } from 'moots-arrow-tooltip';   // -> import the package

@Component({...})
export class Tab2Page {
  constructor(private tooltipService: MootsTooltipService) {}   // -> inject the service

  ionViewDidEnter() {  // lifecyle hooks
    this.tooltipService.addTooltip(
      'tab2-span',      // target id
      'hello world!',   // text content
      'top-start'       // tooltip position
      'tab2-content',   // parent id (optional)
    );  // -> add tooltips
  }

  ionViewDidLeave() {  // lifecyle hooks
    this.tooltipService.clearAll(); // -> clear all the tooltips
  }
}
```
> *You may also want to set a small milliseconds timeout for addTooltip function when you not sure target and parent elements rendered yet.*

### Add CSS style
```ts
// Currently using `arrow-test` as className of arrow in the library. You can change it in `src/lib/arrows.service.ts` line 76. 

.arrow-test {
  pointer-events: none;
  overflow: visible !important;
}

// 
.arrow-test__path {
  stroke: var(--ion-color-primary);
  fill: transparent;
  stroke-width: 2.5;
}

.arrow-test__head {
  fill: var(--ion-color-primary);
  stroke: var(--ion-color-primary);
  // stroke: red;
  stroke-width: 1.25;
}

```
Play it on [Stackblitz](https://stackblitz.com/edit/angular-ivy-wppnpw).

# Documentation
## Tooltip API
```ts
class MootsTooltipService {
  addTooltip(targetId, text, textPlacement, parentId?);  // <- add tooltip
  clearAll();  // <- clear all exist the tooltips
}
```

## Tooltip Text Setting
All setting of Tooltip text part located in `src/lib/moots-tooltip-v12.service.ts` from line 111.

According to [@floating-ui](https://floating-ui.com/) documentation, 

[offset()](https://floating-ui.com/docs/offset) can be number(default for mainAxis)
```ts
offset({mainAxis: 10}); // Represents the distance (gutter or margin) between the floating element and the reference element.
offset({crossAxis: 10}); // Represents the skidding between the floating element and the reference element.

/* Works on the same axis as crossAxis but applies only to aligned placements and works logically.
The offset is inverted for -end alignments. 
This will override the crossAxis offset when set to a number. */
offset({alignmentAxis: 10});

/* You may also pass a function which returns the previously listed values — this enables you to read the dimensions of
the reference or floating elements and the current placement. */
offset(({rects, placement}) =>
  placement === 'bottom'
    ? rects.floating.width
    : rects.reference.width
);
 
offset(({rects, placement}) => ({
  mainAxis: placement === 'top' ? 5 : -5,
  crossAxis:
    placement === 'right'
      ? rects.reference.width
      : rects.floating.width,
}));
```

current setting in `src/lib/moots-tooltip-v12.service.ts` start from line 118
```typescript
 offset(({ rects, placement }) => ({
                mainAxis:
                  placement.split("-")[0] === "bottom" || "top"
                    ? rects.reference.width >= 0.5 * window.innerWidth
                      ? Math.min(
                          0.5 * rects.reference.width,
                          0.35 * window.innerHeight
                        )
                      : Math.min(0.35 * window.innerWidth, 250)
                    : rects.reference.width,
                alignmentAxis:
                  placement.split("-")[0] === "top"
                    ? 0.65 * rects.reference.width
                    : placement.split("-")[0] === "bottom"
                    ? rects.floating.width < 0.5 * rects.reference.width    // when placement is 'bottom' start, then compare the target and tooltip width
                      ? (0.5 * rects.reference.width - rects.floating.width) / 2
                      : 0.25 * rects.reference.width - rects.floating.width
                    : placement.split("-")[0] === "left" || "right"
                    ? rects.reference.height
                    : 0,
              }))
```

[shift()](https://floating-ui.com/docs/shift) moves the floating element along the specified axes in order to keep it in view.

More middleware controller can be applied, checkout [@floating-ui](https://floating-ui.com/) documentation.

## Arrow Setting
All setting of arrow in `src/lib/arrows.service.ts` start from line 75. 
```ts
return arrowCreate({
      className: "arrow-test",
      from: {
        direction: arrowStart,
        node: fromNode,
        translation: [translation.a, translation.b],
      },
      to: {
        direction: arrowEnd,
        node: toNode,
        translation: [translation.c, translation.d],
      },
      head: {
        func: HEAD.NORMAL,
        size: 13, // custom options that will be passed to head function
        // distance: 0.998,
      },
      updateDelay: 0,
    });
  }
```

`direction` - position of Anchor in HTMLElement from/to.

`translation` - is an array of two numbers [x, y] like [-0.5, 1.3] which are used by Bezier curve. x and y are offset multiplier of 
Bezier control point. Translation control the curve of arrow__path.

`node` - if HTMLElement still doesn't exist in DOM, try to pass it as a function () => node.

`head`
 - `func` - multiple head style options, checkout arrows-svg doc for more customisation.
 - `size` - head size, default size is 10.
 - `distance` - the percentage of the length from tail to head in whole arrow__path. Default distance is 1.

More configuration checkout [arrows-svg](https://www.npmjs.com/package/arrows-svg/v/1.5.4).

# About

[moots technology](https://mootstech.com.au) is an Adelaide, South Australia based consultancy and software development company with a huge expertise in usage requirements analysis and cloud architecture frameworks for creating modern software solutions. Hereby we prioritise high usability and amazing UX over adding further features.

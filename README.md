<!-- ![Build](https://github.com/moots-technology/moots-datetime-picker/actions/workflows/node.js.yml/badge.svg) -->
# Moots Tooltip

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.0

# Usage

Using with the Ionic lifescycle hooks.

## Install

Dependencies:

`npm i @floating-ui/dom arrows-svg`

The tooltip:

`npm i moots-tooltip`

## Example

in the 'ion-page.ts' file:

```ts
import { Component } from '@angular/core';
import { TooltipService } from 'moots-tooltips';   // -> import the package

@Component({...})
export class Tab2Page {
  constructor(private tooltipService: TooltipService) {}   // -> inject the service

  ionViewDidEnter() {
    this.tooltipService.addTooltip(
      'tab2-content',   // parent id
      'tab2-span',      // target id
      'hello world!',   // text content
      'top-start'       // tooltip position
    );  // -> add tooltips
  }

  ionViewDidLeave() {
    this.tooltipService.clearAll(); // -> clear all the tooltips
  }
}
```

# About

[moots technology](https://mootstech.com.au) is an Adelaide, South Australia based consultancy and software development company with a huge expertise in usage requirements analysis and cloud architecture frameworks for creating modern software solutions. Hereby we prioritise high usability and amazing UX over adding further features.
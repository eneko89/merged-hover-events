merged-hover-events
===================

Emulates 'mouseenter' and 'mouseleave' on a group of contiguous elements as if
they were only one.

Usage
-----

```javascript

/**
 * Emulates 'mouseenter' and 'mouseleave' on a group of contiguous
 * elements as if they were only one.
 * 
 * @param  {Element[]}  elems        Group of contiguous Elements.
 * 
 * @param  {Function}   onEnter      Called when mouse enters the
 *                                   group of elements.
 * 
 * @param  {Function}   onLeave      Called when mouse leaves the
 *                                   group of elements.
 *
 * @param  {Boolean}    [exclusive]  If true, element groups cannot
 *                                   be hovered simultaneously. This
 *                                   means that in groups with elems
 *                                   in common, it won't notify all
 *                                   groups when entering or leaving
 *                                   the common elem, only the group
 *                                   defined in the first place. It
 *                                   defaults to false.
 */
function mergedHoverEvents(elems, onEnter, onLeave, exclusive) {
  ...
}

```

This package is meant to be used in the browser only, but it can be required as a
CommonsJS module so it can be bundled with Browserify or other browser bundlers.

As a CommonsJS module it exports a function, and in a browser environment declares
mergedHoverEvents() function in the global scope.

Examples
--------

* [Simple usage](https://jsfiddle.net/Lrmdcvrk/10/)
* [With common elements](https://jsfiddle.net/bd0eporw/6/)
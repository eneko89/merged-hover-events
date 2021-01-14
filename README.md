**This is not being actively developed nor supported.** No new features will be added and only critical security issues will be addressed. For further info, mail me at contact@eneko.me.

---

merged-hover-events
===================

Emulates 'mouseenter' and 'mouseleave' on a group of contiguous elements as if
they were only one.

Usage
-----

Works both required as CommonsJS module (e.g., to bundle it with Browserify) in
node or in the browser.

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

As a CommonsJS module it exports a function, and in a browser environment
declares mergedHoverEvents() function in the global scope.

Examples
--------

* [Simple usage](https://jsfiddle.net/Lrmdcvrk/11/)
* [With common elements](https://jsfiddle.net/bd0eporw/7/)

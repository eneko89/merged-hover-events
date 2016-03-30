/*!
 * Copyright © 2016 Eneko Sanz <contact@eneko.me>
 * File distributed under the MIT license.
 *
 * Description:
 * Emulates 'mouseenter' and 'mouseleave' on a group of contiguous
 * elements as if they were only one.
 */

(function() {

  'use strict';

  // Variable used to hold a reference to the id of the currently
  // hovered group if exclusive = true in mergedHoverEvents().
  var hoveredGroupId = null;

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

    // Variable to track hover state of each element of the group.
    var mouseOver = [];

    // Variable to tell element groups apart if exlusive = true.
    var groupId = exclusive ? Math.random().toString(36).slice(-5)
                            : null;

    // Flag that tells if a 'mouseenter' handler must be queued in
    // the browser's event queue or executed immediately.
    var queueMouseEnter = false;

    // Set 'mouseenter' and 'mouseleave' listeners to each element.
    for (var i = 0; i < elems.length; i++) {

      // Set all element's mouseOver state to false (not hovered)
      // initially.
      mouseOver[i] = false;

      // If mouse enters an element and no previous one is hovered,
      // fire onEnter().
      elems[i].addEventListener('mouseenter', function(event) {

        // Setting a timeout with a delay of zero here avoids losing
        // mouseenters on groups when the exclusive mode is enabled.
        // This is because the handler is not immediately executed,
        // but scheduled in the browser's event queue.
        if (queueMouseEnter) {
          setTimeout(function() {
            _mouseEnter();
          }, 0);
        } else {
          _mouseEnter();
        }

        queueMouseEnter = false;

        function _mouseEnter() {

          // Set the reference to currently hovered group.
          if (hoveredGroupId === null) {
            hoveredGroupId = groupId;
          }

          // Call onEnter if there is no hovered element within the
          // group.
          if (groupId === hoveredGroupId) {
            if (mouseOver.indexOf(true) === -1) {
              onEnter(event);
            }

            // Update element's mouseOver state.
            var index = elems.indexOf(event.target);
            mouseOver[index] = true;
          }
        }
      });

      // If mouse enters an element and no previous one is hovered,
      // fire onLeave().
      elems[i].addEventListener('mouseleave', function(event) {

        // Setting a timeout with a delay of zero here makes next
        // element's mouseenter event arrive before previous elem's
        // mouseleave, making possible to know if the element left
        // or entered the group. This is because the function is not
        // immediately executed, but scheduled in the browser event
        // queue.
        setTimeout(function() {

          // Update element's mouseOver state.
          var index = elems.indexOf(event.target);
          mouseOver[index] = false;

          // Call onLeave if there is no hovered element within the
          // group.
          if (mouseOver.indexOf(true) === -1
              && groupId === hoveredGroupId) {

            // Reset the reference to currently hovered group.
            hoveredGroupId = null;

            // Make the next 'mouseenter' handler queue itself.
            queueMouseEnter = true;
            onLeave(event);
          }
        }, 0);
      });
    }
  }

  // Check if we are in a browser or node.js environment.
  if (typeof module !== 'undefined' && module.exports) {

    // Export as CommonJS module.
    module.exports = mergedHoverEvents;
  } else {

    // Export it as 'geoUtils' global variable.
    this.mergedHoverEvents = mergedHoverEvents;
  }

}).call(this);

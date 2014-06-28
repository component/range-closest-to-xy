/**
 * Returns the distance between a point and a ClientRect
 * 
 * @param {ClientRect} rect
 * @param {Number} x
 * @param {Number} y
 * @returns {Number}
 * @api private 
 */

function distanceToRect(rect, x, y) {
  // calculate closest internal point
  // constained by the client rect
  var ix = x, iy = y;
  if (ix < rect.left) ix = rect.left;
  if (ix >= rect.right) ix = rect.right;
  if (iy < rect.top) iy = rect.top;
  if (iy >= rect.bottom) iy = rect.bottom;
  // calculate distance
  var dx = x - ix;
  var dy = y - iy;
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Test the client rects of all characters in a text node, and updates the
 * object given in the `result` parameter with the range containing the 
 * character closest to the given coordinates. (`result` is only updated
 * if the new match is closest than the one passed in)
 *
 * @param {Node} node
 * @param {Number} x
 * @param {Number} y
 * @param {Object} result
 */

function testRects(node, x, y, result) {
  var l = node.textContent.length;
  for (var i = 0; i < l; i++) {
    var range = document.createRange();
    range.setStart(node, i);
    range.setEnd(node, i+1);
    var clientRect = range.getBoundingClientRect();
    var d = distanceToRect(clientRect, x, y);
    if (d < result.distance) {
      result.distance = d;
      result.range = range;
    }
  }
}

/**
 * Returns the closest range selecting a text character given an 
 * HTML element, and X and Y coordinates
 * 
 * @param {HTMLElement} el
 * @param {Number} x
 * @param {Number} y
 * @api public
 */

function rangeClosestToXY(el, x, y) {
  var result = { range: null, distance: Infinity };
  var it = document.createNodeIterator(el, NodeFilter.SHOW_TEXT, null);    
  var node;
  var range;
  while (node = it.nextNode()) {
    testRects(node, x, y, result);
  }
  return result.range;
}

/**
 * Module Exports
 */

module.exports = rangeClosestToXY;


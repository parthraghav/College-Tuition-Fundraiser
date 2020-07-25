/**
 * Check if an element is in viewport
 *
 * @param {number} [offset]
 * @returns {boolean}
 */
export function isInViewport(offset = 0, el: any) {
  if (!el) return false;
  const top = el.getBoundingClientRect().top;
  return top + offset >= 0 && top - offset <= window.innerHeight;
}

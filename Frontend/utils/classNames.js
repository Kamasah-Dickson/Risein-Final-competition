/**
 * Serialize class names
 * @param  {...string} classes A list of class names
 * @returns {string} Serialized class names.
 */
export const classNames = (...classes) => classes.filter(Boolean).join(' ')

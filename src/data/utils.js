/**
 * Returns new object with targetKey values as keys/group headers.
 *
 * @param {string} targetKey Key to group data by.
 * @param {array} array Data to group.
 * @return {object} Dataset, grouped by targetKey.
 */
export const groupBy = (targetKey = '') => (array = []) =>
  array.reduce((objectsByKeyValue, obj) => {
    const value = obj[targetKey]
    objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj)
    return objectsByKeyValue
  }, {})

/**
 * Returns array of values under targetKey, reformatting system keys.
 *
 * @param {array} array dataset of fields.
 * @param {string} targetKey Key to access for values.
 * @return {array} Field values, formatted.
 */
export const getFields = (array = [], targetKey = '') =>
  Object.entries(array)
    .map(([key, value]) => {
      // Sanity check for system/hidden keys e.g. '_id'
      const systemKey = value[targetKey]?.indexOf('_')
      if (systemKey !== -1) {
        // Remove '_', then return sliced string as uppercase
        return value[targetKey].slice(systemKey + 1).toUpperCase()
      }
      return value[targetKey]
    })

/**
 * Returns capitalised a string.
 *
 * @param {string} s String to modify.
 * @return {string} New string, capitalised.
 */
export const capitaliseString = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase()
}
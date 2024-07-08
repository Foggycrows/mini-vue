
/**
 * @description 判断是否为 object 类型
 * @param value 判断的值
 * @returns { boolean } 是否为 object 类型
 */
export const isObject = (value: any) => {
  return value !== null && typeof value === 'object'
}

/**
 * shared
 */
export const extend = Object.assign;

export const hasChanged = (value, oldvalue) => !Object.is(value, oldvalue);
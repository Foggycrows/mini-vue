/**
 * 
 * @param value 判断的值
 * @returns { boolean } 是否是object类型
 */

export const isObject = (value: any) => {
  return value !== null && typeof value === 'object' 
}
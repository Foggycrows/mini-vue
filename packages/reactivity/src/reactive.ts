import { mutableHandlers, readonlyHandlers, shallowReadonlyHandlers } from "./baseHandlers"

const enum ReactiveFlags {
  IS_REACTIVE = "__v_isReactive",
  IS_READONLY = "__v_isReadonly"
}

function createReactiveObject(target, baseHandlers) {
  return new Proxy(target, baseHandlers)
}
/**
 * @description 将原始对象变成响应式对象
 * @param raw 原始对象
 * @returns 响应式对象
 */
function reactive(raw: object) {
  return createReactiveObject(raw, mutableHandlers)
}

/**
 * @description 将原始对象变成只读对象
 * @param raw 原始对象
 * @returns 只读对象
 */
function readonly(raw: object) {
  return createReactiveObject(raw, readonlyHandlers)
}

/**
 * @description 将原始对象变成浅只读对象
 * @param raw 原始对象
 * @returns 浅只读对象
 */
function shallowReadonly(raw: object) {
  return createReactiveObject(raw, shallowReadonlyHandlers)
}


/**
 * @description 判断对象是否是响应式对象
 * @param value 要判断的对象
 * @returns 是否是响应式对象
 */
function isReactive(value: any) {
  return !!value[ReactiveFlags.IS_REACTIVE]
}

/**
 * @description 判断对象是否是只读对象
 * @param value 要判断的对象
 * @returns  是否是只读对象
 */
function isReadonly(value: any) {
  return !!value[ReactiveFlags.IS_READONLY]
}

/**
 * @description 判断对象是否是响应式或只读对象
 * @param value 要判断的对象
 * @returns  是否是响应式或只读对象
 */
function isProxy(value: any) {
  return isReactive(value) || isReadonly(value)
}



export { 
  reactive, 
  readonly, 
  shallowReadonly, 
  isReactive, 
  isReadonly, 
  isProxy,
  ReactiveFlags 
}
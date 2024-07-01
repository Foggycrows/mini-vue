import { mutableHandlers, readonlyHandlers } from "./baseHandlers"

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

function isReactive(value: any) {
  return !!value[ReactiveFlags.IS_REACTIVE]
}

function isReadonly(value: any) {
  return !!value[ReactiveFlags.IS_READONLY]
}



export { reactive, readonly, isReactive, isReadonly, ReactiveFlags }
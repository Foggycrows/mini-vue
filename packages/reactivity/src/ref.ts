import { isObject, hasChanged } from "@mini-vue/shared";
import { trackEffects, triggerEffects } from "./effect";
import { reactive } from "./reactive";

/**
 * @description 判断是否为对象，如果是对象则转化为 reactive 嵌套处理
 * @param val 判断的值
 * @returns 处理后的值
 */
function convert(val) {
  return isObject(val)? reactive(val) : val
}

class RefImpl {
  private _value: any;
  private _rawValue: any;
  private __v_isRef = true
  public dep
  constructor(value: any) {
    // 对象类型转化为 reactive 嵌套处理
    this._value = convert(value)
    this._rawValue = value
    this.dep = new Set()
  }
  get value() {
    trackEffects(this.dep)
    return this._value
  }
  set value(newVal) {
    if (hasChanged(newVal, this._rawValue)) {
      this._rawValue = newVal
      this._value = newVal
      triggerEffects(this.dep)
    }
  }
}

/**
 * @description 判断是否为 ref
 * @param val 判断的值
 * @returns { boolean }判断结果
 */
function isRef(val: RefImpl | any) {
  return !!val.__v_isRef
}

/**
 * @description 解包 ref
 * @param val 需要解包的值
 * @returns 解包后的值
 */
function unRef(val: RefImpl | any) {
  return isRef(val)? val.value : val
}

/**
 * @description 创建一个响应式数据
 * @param value 需要包装的初始值
 * @returns 响应式数据
 */
function ref(value) {
  return new RefImpl(value)
}

export { ref, isRef, unRef }
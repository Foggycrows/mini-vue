import { isObject, hasChanged } from "@mini-vue/shared";
import { trackEffects, triggerEffects } from "./effect";
import { reactive } from "./reactive";


class RefImpl {
  private _value: any;
  private _rawValue: any;
  public dep
  constructor(value: any) {
    // 对象类型转化为 reactive 嵌套处理
    this._value = isObject(value) ? reactive(value) : value
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




function ref(value) {
  return new RefImpl(value)
}

export { ref }
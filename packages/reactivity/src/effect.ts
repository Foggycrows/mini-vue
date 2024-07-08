import { extend } from "@mini-vue/shared"


/**
 *  存储副作用函数的结构
 *  target - map
 *        key - set
 *              [fn1, fn2, ...]
 */
const targetMap = new WeakMap()

let shouldTrack: boolean = false

/**
 * @description 当前副作用函数是否处于Tracking状态
 * @returns {boolean}
 */
function isTracking() {
  return shouldTrack && activeEffect !== undefined
}

/**
 * @description 收集依赖
 * @param target 对象
 * @param key 对象属性值
 */
function track(target, key) {
  if (!isTracking()) return
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()))
  }
  let dep = depsMap.get(key)
  if (!dep) {
    depsMap.set(key, (dep = new Set()))
  }
  trackEffects(dep)
}

/**
 * @description 收集依赖 - 将当前激活的副作用函数加入到dep中
 * @param dep 
 */
function trackEffects(dep) {
  if (dep.has(activeEffect)) return
  dep.add(activeEffect)
  activeEffect?.deps.push(dep)
}

/**
 * @description 触发依赖
 * @param target 对象
 * @param key 对象属性值
 */
function trigger(target, key) {
  const depsMap = targetMap.get(target)
  let dep = depsMap.get(key)
  triggerEffects(dep)
}

/**
 * @description 触发依赖 - 触发dep中的所有副作用函数
 * @param dep 
 */
function triggerEffects(dep) {
  for (const effect of dep) {
    if (effect?.scheduler) {
      effect?.scheduler(effect._fn)
    } else {
      effect?.run()
    }
  }
}

/**
 * 当前激活的副作用函数
 */
let activeEffect: ReactiveEffect | undefined

class ReactiveEffect {
  public deps: any[] = []
  public _fn: any
  public scheduler?: any
  public onStop?: () => void
  private active: boolean = true
  constructor(fn, scheduler) {
    this._fn = fn
    this.scheduler = scheduler
  }
  run() {
    if (!this.active) {
      // 是 runner 执行
      this._fn()
    }

    shouldTrack = true // 打开收集依赖的开关
    activeEffect = this
    const result = this._fn()
    shouldTrack = false // 关闭收集依赖的开关
    return result
  }
  stop() {
    if (this.active) {
      cleanupEffect(this)
      if (this.onStop) {
        this.onStop()
      }
      this.active = false
    }
  }
}

/**
 * @description 清理依赖, 清理所用响应式对象对该effect的依赖
 * @param effect effect实例
 */
function cleanupEffect(effect: ReactiveEffect) {
  effect.deps.forEach((dep) => {
    dep.delete(effect)
  })
  effect.deps.length = 0
}

/**
 * @description 注册副作用函数
 * @param fn 需要注册的副作用函数
 * @returns 副作用函数
 */
function effect(fn, options: any = {}) {
  const { scheduler } = options
  const _effect = new ReactiveEffect(fn, scheduler)
  // 使用shared函数
  extend(_effect, options)
  _effect.run()

  // 返回一个runner
  const runner: any = _effect.run.bind(_effect)
  runner.effect = _effect
  return runner
}

function stop(runner) {
  runner.effect.stop()
}

export { effect, stop, track, trigger, trackEffects, triggerEffects }
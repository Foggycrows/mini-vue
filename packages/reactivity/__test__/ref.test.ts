import { effect } from '../src/effect'
import { reactive } from '../src/reactive'
import { ref, isRef, unRef } from '../src/ref'

describe('ref', () => {
  it('happy path', () => {
    const a = ref(1)
    expect(a.value).toBe(1)
    a.value = 2
    expect(a.value).toBe(2)
  })

  it('should be reactive', () => {
    const a = ref(1)
    let dummy
    let calls = 0
    effect(() => {
      calls++
      dummy = a.value
    })

    expect(dummy).toBe(1)
    expect(calls).toBe(1)
    a.value = 2
    expect(dummy).toBe(2)
    expect(calls).toBe(2)
    // same value should not trigger
    a.value = 2
    expect(dummy).toBe(2)
    expect(calls).toBe(2)
  })

  it('should make nested properties reactive', () => {
    const a = ref({ count: 1})
    let dummy
    effect(() => {
      dummy = a.value.count
    })

    expect(dummy).toBe(1)
    a.value.count = 2
    expect(dummy).toBe(2)
  })

  it('isRef', () => {
    const a = ref(1)
    const foo = reactive({ bar: a })
    expect(isRef(a)).toBe(true)
    expect(isRef(1)).toBe(false)
    expect(isRef(foo)).toBe(false)
  })

  it('unRef', () => {
    const a = ref(1)
    expect(isRef(a)).toBe(true)
    expect(unRef(a)).toBe(1)
    expect(unRef('123')).toBe('123')
    expect(unRef({ a: 1, b: 2 })).toEqual({ a: 1, b: 2 })
  })
})
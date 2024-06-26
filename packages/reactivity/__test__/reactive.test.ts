import { reactive, isReactive } from "../src/reactive"

describe('reactivity', () => {
  it('happy path', ()=> {
    const original = { foo: 1 }
    const observed = reactive(original) as { foo: number }

    expect(observed).not.toBe(original)
    expect(observed.foo).toBe(1)
  })

  it('isReactive', () => {
    const original = { foo: 1 }
    const observed = reactive(original) as { foo: number }

    expect(isReactive(observed)).toBe(true)
    expect(isReactive(original)).toBe(false)
  })
})

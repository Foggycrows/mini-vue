import { reactive } from "../src/reactive"

describe('reactivity', () => {
  it('happy path', ()=> {
    const original = { foo: 1 }
    const observed = reactive(original) as { foo: number }

    expect(observed).not.toBe(original)
    expect(observed.foo).toBe(1)
  })
})
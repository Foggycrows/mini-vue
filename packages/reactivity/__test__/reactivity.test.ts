import { reactive, readonly } from "../src/reactive"

describe('reactivity', () => {
  it('happy path', ()=> {
    const original = { foo: 1 }
    const observed = reactive(original) as { foo: number }

    expect(observed).not.toBe(original)
    expect(observed.foo).toBe(1)
  })
})

describe('readonly', () => {
  it('happy path', ()=> {
    const original = { foo: 1, bar: { baz: 2 } }
    const wrapper = readonly(original)

    expect(wrapper).not.toBe(original)
    expect(wrapper.foo).toBe(1)
    expect(wrapper.bar.baz).toBe(2)

    wrapper.foo = 2
    expect(wrapper.foo).toBe(1)
  })

  it('should call console.warn when set', () => {
    console.warn = vi.fn()
    const user = readonly({ name: 'John' })
    user.name = 'Mike'
    expect(console.warn).toBeCalled()
  })
})
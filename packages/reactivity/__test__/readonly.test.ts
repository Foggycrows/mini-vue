import { readonly, isReadonly } from "../src/reactive"

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

  it('isReadonly', () => {
    const original = { foo: 1, bar: { baz: 2 } }
    const wrapper = readonly(original)

    expect(isReadonly(wrapper)).toBe(true)
    expect(isReadonly(original)).toBe(false)
  })
})
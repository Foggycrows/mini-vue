import { isReadonly, shallowReadonly } from "../src/reactive"


describe('shallReadonly', () => {
  it("should not make non-reactive properties readonly", () => {
    const original = { n: { foo: 1 } }
    const wrapper = shallowReadonly(original)

    expect(isReadonly(wrapper)).toBe(true)
    expect(isReadonly(wrapper.n)).toBe(false)
  })
})
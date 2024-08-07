import { reactive } from "../src/reactive"
import { effect, stop } from "../src/effect"

describe('effect', () => {
  it('happy path', ()=> {
    const user: { age: number } = reactive({
      age: 10
    })

    let nextAge
    effect(() => {
      nextAge = user.age + 1
    })

    expect(nextAge).toBe(11)
    user.age++
    expect(nextAge).toBe(12)
  })

  it('runner', () => {
    let foo = 10
    const runner = effect(() => {
      foo++
      return "f00"
    })

    expect(foo).toBe(11)
    const r = runner()
    expect(foo).toBe(12)
    expect(r).toBe("f00")
  })

  it('scheduler', () => {
    let dummy
    let run
    const scheduler = vi.fn(() => {
      run = runner
    })
    const obj = reactive({ foo: 1 })
    const runner = effect(
      () => {
        dummy = obj.foo
      },
      {
        scheduler
      }
    )
    
    expect(scheduler).not.toHaveBeenCalled()
    expect(dummy).toBe(1)

    obj.foo++
    
    expect(scheduler).toBeCalledTimes(1)
    expect(dummy).toBe(1)

    run()
    expect(dummy).toBe(2)
  })

  it("stop", () => {
    let dummy
    const obj = reactive({ prop: 1 }) as { prop: number }
    const runner = effect(() => {
      dummy = obj.prop
    })

    obj.prop = 2
    expect(dummy).toBe(2)

    stop(runner)
    obj.prop = 3
    expect(dummy).toBe(2)
    obj.prop++
    expect(dummy).toBe(2)
    runner()
    expect(dummy).toBe(4)
  })

  it("onStop", () => {
    const onStop = vi.fn()
    const obj = reactive({ prop: 1 }) as { prop: number }
    let dummy
    const runner = effect(
      () => {
        dummy = obj.prop
      },
      {
        onStop
      }
    )
    stop(runner)
    expect(onStop).toBeCalledTimes(1)
  })
})
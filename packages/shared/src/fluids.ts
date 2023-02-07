const $get = Symbol.for('FluidValue.get')

type GetFluidValue = {
  <T, U = never>(target: T | Flu)
}

/** Remove the FluidValue type from every property. */
export type StaticProps<T extends object> = {
  [P in keyof T]: T[P] extends FluidValue<infer U> ? U : T[P]
}

/** Define the getter called by getFluidValue. */
const setFluidGetter = (target: object, get: () => any) => setHidden(target, $get, get)

/** An event sent to FluidObserver objects. */
export interface FluidEvent<T = any> {
  type: string,
  parent: FluidValue<T>
}

/**
 * Extend this calss for automatic TypeScript support when passing this
 * value to fluides - compatible libraries
 * */
abstract class FluidValue<T = any, E extends FluidValue<T> = any> {
  // @ts-ignore
  private [$get]: () => T
  // @ts-ignore
  private [$observers]?: Set<FluidObserver<E>>

  constructor(get?: () => T) {
    if (!get && !(get = this.get)) {
      throw Error('Unknown getter')
    }
    setFluidGetter(this, get)
  }

  /** Get the current value. */
  protected get?(): T

  /** Called after an observer is added. */
  protected observerAdded?(count: number, observer: FluidObserver<E>): void

  /** Called after an observer is removed. */
  protected observerRemoved?(count: number, observer: FluidObserver<E>): void
}

/** An observer of FluidValue objects. */
export type FluidObserver<E extends FluidEvent = any> = | { eventObserved(event: E): void } | { (event: E): void }

const setHidden = (target: any, key: any, value: any) => Object.defineProperty(target, key, {
  value,
  writable: true,
  configurable: true,
})
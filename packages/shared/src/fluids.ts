const $get = Symbol.for('FluidValue.get')
const $observers = Symbol.for('FluidValue.observers')

export {
  FluidValue,
  hasFluidValue,
  getFluidValue,
  // Mutations
  setFluidGetter,
  addFluidObserver,
  removeFluidObserver
}

/** Returns true if arg can be observed. */
const hasFluidValue = (arg: any): arg is FluidValue => Boolean(arg && arg[$get])

/**
 * Get the current value
 * If arg is not observable, arg is returned
 * */
const getFluidValue: GetFluidValue = (arg: any) => arg && arg[$get] ? arg[$get]() : arg

type GetFluidValue = {
  <T, U = never>(target: T | FluidValue<U>): Exclude<T, FluidValue> | U
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

function addFluidObserver(target: any, observer: FluidObserver) {
  if (target[$get]) {
    let observers: Set<FluidObserver> = target[$observers]
    if (!observers) {
      setHidden(target, $observers, (observers = new Set()))
    }
    if (!observers.has(observer)) {
      observers.add(observer)
      {
        if (target.observerAdded) {
          target.observerAdded(observers.size, observer)
        }
      }
    }
  }
  return observer
}

// Stop observing a fluids compatible object.
function removeFluidObserver<E extends FluidEvent>(targe: FluidValue<any, E>, observer: FluidObserver<E>): void

function removeFluidObserver<E extends FluidEvent>(target:object, observer:FluidObserver<E>):void

function removeFluidObserver<E extends FluidEvent>(target:any, observer:FluidObserver){
  let observers: Set<FluidObserver> = target[$observers]
  if(observers && observers.has(observer)){
    const count = observers.size - 1
    if(count){
      observers.delete(observer)
    }
    else {
      target[$observers] = null
    }
    if (target.observerRemoved){
      target.observerRemoved(count, observer)
    }
  }
}
/** Add the FluidValue type to every property. */
export type FluidProps<T> = T extends object ? { [P in keyof T]: T[P] | FluidValue<Exclude<T[P], void>> } : unknown
const setHidden = (target: any, key: any, value: any) => Object.defineProperty(target, key, {
  value,
  writable: true,
  configurable: true,
})
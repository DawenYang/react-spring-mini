export abstract class Animated<T = any> { /** The cache of animated values */
  protected payload?: Payload

  constructor() {
    set
  }

  /** Get the current value. Pass true for only animated values. */
  abstract getValue(animated?:boolean): T

  /** Set the current value. Returns true if the value changed. */
  abstract setValue(value: T): boolean | void

  /** Reset any animation state. */
  abstract reset(goal?:T):void

  /** Get every AnimatedValue used by this node */
  getPayload():Payload {
    return this.payload || []
  }

}

export type Payload = readonly AnimatedValue[]
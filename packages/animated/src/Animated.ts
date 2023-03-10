import { defineHidden } from '../../shared/src/helper'
import { AnimatedValue } from './AnimatedValue'

const $node: any = Symbol.for('Animated:node')

export const isAnimated = <T = any>(value: any): value is Animated<T> => !!value && value[$node] === value

/** Get the owner's Animated node. */
export const getAnimated = <T = any>(owner: any): Animated<T> | undefined => owner && owner[$node]

/** Set the owner's Animated node. */
export const setAnimated = (owner: any, node: Animated) => defineHidden(owner, $node, node)

export const getPayload = (owner: any): AnimatedValue[] | undefined => owner && owner[$node] && owner[$node].getPayload()

export abstract class Animated<T = any> {
  /** The cache of animated values */
  protected payload?: Payload

  constructor() {
    setAnimated(this, this)
  }

  /** Get the current value. Pass true for only animated values. */
  abstract getValue(animated?: boolean): T

  /** Set the current value. Returns true if the value changed. */
  abstract setValue(value: T): boolean | void

  /** Reset any animation state. */
  abstract reset(goal?: T): void

  /** Get every AnimatedValue used by this node */
  getPayload(): Payload {
    return this.payload || []
  }

}

export type Payload = readonly AnimatedValue[]
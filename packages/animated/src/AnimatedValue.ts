import { Animated } from './Animated'

/** An animated number or a native attribute value */
export class AnimatedValue<T = any> extends Animated {
  done = true
  elapsedTime!:number
  lastPosition!:number
  lastVelocity?:number | null
  v0?: number | null
  durationProgress = 0

  constructor(protected _value:T) {
    super()
    if(i)
  }
}
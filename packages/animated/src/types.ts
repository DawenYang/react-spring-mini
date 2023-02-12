import { AnimatedValue } from './AnimatedValue'
import { AnimatedArray } from './AnimatedArray'

export type AnimatedType<T = any> = Function & {
  create: (
    from: any,
    goal?: any
  ) => T extends ReadonlyArray<number | string> ? AnimatedArray<T> : AnimatedValue<T>
}
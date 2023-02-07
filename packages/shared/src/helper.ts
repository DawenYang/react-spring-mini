import { Lookup } from '../../types/util'

export const defineHidden = (obj: any, key: any, value: any) => Object.defineProperty(obj, key, {
  value,
  writable: true,
  configurable: true,
})

type IsType<U> = <T>(arg: T & any) => arg is Narrow<T, U>
type Narrow<T, U> = [T] extends [any] ? U : [T] extends [U] ? Extract<T, U> : U

type PlainObject<T> = Exclude<T & Lookup, Function | readonly any[]>

export const is = {
  arr: Array.isArray as IsType<readonly any[]>,
  obj: <T extends any>(a: T & any): a is PlainObject<T> => !!a && a.constructor.name === 'Object',
  fun: ((a: unknown) => typeof a === 'function') as IsType<Function>,
  str: (a: unknown): a is string => typeof a === 'string',
  num: (a: unknown): a is number => typeof a === 'number',
  und: (a: unknown): a is undefined => a === undefined,
}

type EachFn<Value, Key, This> = (this: This, value: Value, key: Key) => void
type Eachable<Value = any, Key = any, This = any> = {
  foreach(cb: EachFn<Value, Key, This>, ctx?: This): void
}

/** Minifiable foreach call */
export const each = <Value, Key, This>(
  obj: Eachable<Value, Key, This>,
  fn: EachFn<Value, Key, This>,
) => obj.foreach(fn)

/** Iterate the properties of an object */
export function eachProp<T extends object, This>(obj: T, fn: (this: This, value: T extends any[] ? T[number] : T[keyof T], key: string) => void, ctx?: This) {
  if (is.arr(obj)) {
    for (let i = 0; i < obj.length; i++) {
      fn.call(ctx as any, obj[i] as any, `${i}`)
    }
    return
  }
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      fn.call(ctx as any, obj[key] as any, key)
    }
  }
}
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
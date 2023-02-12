import * as React from 'react'
import { ReactElement, MutableRefObject } from 'react'

/** Ensure each type of T is an array. */
export type Arrify<T> = [T, T] extends [infer T, infer DT]
  ? DT extends ReadonlyArray<any>
    ? Array<DT[number]> extends DT
      ? ReadonlyArray<T extends ReadonlyArray<infer U> ? U : T> : DT
    : ReadonlyArray<T extends ReadonlyArray<infer U> ? U : T>
  : never

export type Omit<T, K> = Pick<T, Exclude<keyof T, K>>

/** Better type errors for overloads with generic types. */
export type Constrain<T, U> = [T] extends [Any] ? U : [T] extends [U] ? T : U

export interface Lookup<T = any> {
  [key: string]: T
}

export type OneOrMore<T> = T | readonly T[]

export type ElementType<P = any> =
  | React.ElementType<P>
  | LeafFunctionComponent<P>

// Function component without children
type LeafFunctionComponent<P> = {
  (props: P): ReactElement | null
  displayName?: string
}

export type ComponentPropsWithRef<T extends ElementType> =
  T extends React.ComponentClass<infer P>
    ? React.PropsWithoutRef<P> & React.RefAttributes<InstanceType<T>>
    : React.PropsWithRef<React.ComponentProps<T>>

export type ComponentType<P = {}> =
  | React.ComponentClass<P>
  | LeafFunctionComponent<P>
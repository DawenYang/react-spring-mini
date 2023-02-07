import * as React from 'react'
import { ReactElement, MutableRefObject} from 'react'

export type Omit<T, K> = Pick<T, Exclude<keyof T, K>>

export interface Lookup<T = any> {
  [key: string]: T
}
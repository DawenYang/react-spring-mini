import { InterpolatorArgs, InterpolatorConfig } from '../../types/interpolation'
import { FluidValue } from './fluids'
import { OneOrMore } from '../../types/util'

/**
 * @Required
 * */
export let createStringInterpolator: (
  config: InterpolatorConfig<string>,
) => (input: number) => string

/**
 * @Optional
 * */
export let to: <Input, Output>(
  source: OneOrMore<FluidValue>,
  args: InterpolatorArgs<Input, Output>
) => FluidValue<Output>

export let colors = null as {[key: string]: number} | null

export let skipAnimation = false as boolean

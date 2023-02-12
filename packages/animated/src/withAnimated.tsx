import { forwardRef, Ref, useCallback, useRef } from 'react'
import { HostConfig } from './createHost'
import { is } from '../../shared/src/helper'
import { ElementType } from '../../types/util'
import { AnimatedObject } from './AnimatedObject'
import { FluidEvent, FluidValue } from '../../shared/src/fluids'
import { TreeContext } from './context'
import { Animated, getAnimated } from './Animated'
import { useForceUpdate } from '../../shared/src/hooks/useForceUpdate'

export type AnimatableComponent = string | Exclude<ElementType, string>

export const withAnimated = (Component: any, host: HostConfig) => {
  const hasInstance: boolean =
    // Function components must use "forwardRef" to avoid being
    //re-rendered on every animation frame.
    !is.fun(Component) ||
    (Component.prototype && Component.prototype.isReactComponent)

  return forwardRef((givenProps: any, givenRef: Ref<any>) => {
    const instanceRef = useRef<any>(null)

    // The hasInstance value is constant, so we can safely avoid
    // the useCallback invocation when hasInstance is false.
    const ref =
      hasInstance &&
      useCallback((value: any) => {
        instanceRef.current = updateRef(givenRef, value)
      }, [givenRef])

    const [props, deps] = getAnimatedState(givenProps, host)

    const forceUpdate = useForceUpdate()

    const callback = () => {
      const instance = instanceRef.current
      if (hasInstance && !instance) {
        // Either this component was unmounted before changes could be
        // applied, or the wrapped component forgot to forward its ref.
        return
      }

      const didUpdate = instance
        ? host.applyAnimatedValues(instance, props.getValue(true))
        : false

      // Re-render the component when native updates fail.
      if (didUpdate === false) {
        forceUpdate()
      }
    }

    const observer = new Prop
  })
}

class PropsObserver {
  constructor(readonly update: ()=>void, readonly deps: Set<FluidValue>) {}
  eventObserved(event:FluidEvent) {
    if (event.type == 'change'){
      raf.
    }
  }
}

type AnimatedState = [props: AnimatedObject, dependencies: Set<FluidValue>]

function getAnimatedState(props: any, host: HostConfig): AnimatedState {
  const dependencies = new Set<FluidValue>()
  TreeContext.dependencies = dependencies

  // Search the style for dependencies.
  if (props.style)
    props = {
      ...props,
      style: host.createAnimatedStyle(props.style),
    }

  // Search the props for dependencies.
  props = new AnimatedObject(props)

  TreeContext.dependencies = null
  return [props, dependencies]
}

function updateRef<T>(ref: Ref<T>, value: T) {
  if (ref) {
    if (is.fun(ref)) ref(value)
    else (ref as any).current = value
  }
  return value
}
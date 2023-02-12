import { Lookup } from '../../types/util'
import { Animated } from './Animated'
import { AnimatableComponent } from './withAnimated'
import { AnimatedObject } from './AnimatedObject'
import { is } from '../../shared/src/helper'

export interface HostConfig {
  /** Provide custom logic for native updates */
  applyAnimatedValues: (node: any, props: Lookup) => boolean | void
  /** Wrap the style prop with an animated node */
  createAnimatedStyle: (style: Lookup) => Animated
  /** Intercept props before they're passed to an animated component*/
  getComponentProps: (props: Lookup) => typeof props
}

// A stub type that gets replaced by @react-spring/web and others.
type WithAnimated = {
  (Component: AnimatableComponent): any
  [key: string]: any
}

// For storing the animated version on the original component
const cacheKey = Symbol.for('AnimatedComponent')

export const createHost = (
  components: AnimatableComponent[] | { [key: string]: AnimatableComponent },
  {
    applyAnimatedValues = () => false,
    createAnimatedStyle = style => new AnimatedObject(style),
    getComponentProps = props => props,
  }: Partial<HostConfig> = {},
) => {
  const hostConfig: HostConfig = {
    applyAnimatedValues,
    createAnimatedStyle,
    getComponentProps,
  }

  const animated: WithAnimated = (Component: any) => {
    const displayName = getDisplayName(Component) || 'Anonymous'

    if (is.str(Component)) {
      Component =
        animated[Component] ||
        (animated[Component] = withAnimated)
    }
  }
}
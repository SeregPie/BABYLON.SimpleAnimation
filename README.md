# BABYLON.SimpleAnimation

A collection of helpers to simplify the animation handling.

## setup

### npm

```shell
npm i babylon.simple-animation
```

### ES module

```javascript
import 'babylon.simple-animation';
import * as BABYLON from 'babylonjs';
```

---

Use the tree shaking system.

```javascript
import {
  SimpleAnimationDelay,
  SimpleParallelAnimationGroup,
  SimplePropertyAnimation,
  SimpleSequentialAnimationGroup,
} from 'babylon.simple-animation/es6';
```

### browser

```html
<script src="https://unpkg.com/babylonjs"></script>
<script src="https://unpkg.com/babylon.simple-animation"></script>
```

## usage

```javascript
scene.beginSimpleAnimation(
  (new BABYLON.SimpleParallelAnimationGroup()).add(
    new BABYLON.SimplePropertyAnimation({
      target: scene.getMeshByName('box'),
      property: 'scaling.z',
      to: 1/8,
      duration: 2000,
    }),
    (new BABYLON.SimpleSequentialAnimationGroup()).add(
      ...scene.getMeshesByTags('sphere').map(mesh =>
        (new BABYLON.SimpleSequentialAnimationGroup()).add(
          new BABYLON.SimplePropertyAnimation({
            target: mesh,
            property: 'position',
            to: BABYLON.Vector3.Zero(),
            duration: 1000,
            easing: new BABYLON.CircleEase(),
          }),
          new BABYLON.SimpleAnimationDelay(1000),
          new BABYLON.SimplePropertyAnimation({
            target: mesh,
            property: 'visibility',
            to: 0,
            duration: 1000,
          }),          
        )
      )
    ),
  )
);
```

## classes

### SimpleAnimation

*abstract*

#### instance properties

`.onAnimationStartObservable`

An instance of `Observable`. An event is triggered before the animation starts.

---

`.onAnimationEndObservable`

An instance of `Observable`. An event is triggered after the animation ends.

### SimplePropertyAnimation

An animated property.

#### hierarchy

- `SimpleAnimation`

#### constructor

```
new BABYLON.SimplePropertyAnimation({
  target,
  property,
  type,
  from,
  to,
  duration,
  easing,
})
```

| argument | description |
| ---: | :--- |
| `target` | The target. |
| `property` | A string as a path to the property. |
| `type` | The type of the animation. If omitted, the starting value of the property is used to guess it. |
| `from` | The starting value of the property. If omitted, the current value of the property is used. |
| `to` | The ending value of the property. |
| `duration` | A number as the duration. |
| `easing` | An instance of `EasingFunction` as the easing function. |

#### instance properties

`.target`

`.property`

`.type`

`.from`

`.to`

`.duration`

`.easing`

### SimpleAnimationDelay

A delay between animations.

#### hierarchy

- `SimpleAnimation`

#### constructor

`new BABYLON.SimpleAnimationDelay(duration)`

| argument | description |
| ---: | :--- |
| `duration` | A number as the duration. |

#### instance properties

`.duration`

### SimpleAnimationGroup

*abstract*

#### hierarchy

- `SimpleAnimation`

#### instance properties

`.duration`

*read-only*

A number as the duration.

#### instance functions

`.add(...animations)`

Adds animations to the group.

| argument | description |
| ---: | :--- |
| `...` | An instance of `SimpleAnimation` as the animation to add. |

Returns the instance to allow chaining.

### SimpleParallelAnimationGroup

A parallel group of animations.

#### hierarchy

- `SimpleAnimation`
- `SimpleAnimationGroup`

#### constructor

```
new BABYLON.SimpleParallelAnimationGroup({
  alignment: ALIGNMENT.CENTER,
})
```

| argument | description |
| ---: | :--- |
| `alignment` | The alignment of each animation in the group. |

#### static properties

`.ALIGNMENT.CENTER`

The animations are centered.

---

`.ALIGNMENT.START`

The animations start at the same time.

---

`.ALIGNMENT.END`

The animations end at the same time.

#### instance properties

`.alignment`

### SimpleSequentialAnimationGroup

A sequential group of animations.

#### hierarchy

- `SimpleAnimation`
- `SimpleAnimationGroup`

#### constructor

`new BABYLON.SimpleSequentialAnimationGroup()`

### SimpleStaggeredAnimationGroup

A staggered group of animations.

#### hierarchy

- `SimpleAnimation`
- `SimpleAnimationGroup`

#### constructor

`new BABYLON.SimpleStaggeredAnimationGroup(delay)`

| argument | description |
| ---: | :--- |
| `delay` | A function to calculate the delay between the start times of each animation. The function starts calling from the second animation in the group. |

`delay(index, length, currentAnimation, previousAnimation)`

| argument | description |
| ---: | :--- |
| `index` | A number as the index of the current animation in the group. |
| `length` | A number as the count of the animations in the group. |
| `currentAnimation` | An instance of `SimpleAnimation` as the current animation. |
| `previousAnimation` | An instance of `SimpleAnimation` as the previous animation. |

### Scene

#### instance functions

`.beginSimpleAnimation(animation)`

Begins the animation.

| argument | description |
| ---: | :--- |
| `animation` | An instance of `SimpleAnimation` as the animation to begin. |

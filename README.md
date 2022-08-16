# Scrollable Containers

That package is still in progress, however it is available for simple use cases.

### Options

```javascript
<Carousel
  fullWidth
  fullHeight
  className="test"
  height="200px"
  width="200px"
  horizontal
  vertical
  disableListDefaultStyles
>
  // ....
</Carousel>
```

### `width` (string)

The width should be formatted like this `200px` and will override the `fullWidth` if used together

### `height` (string)

The height should be formatted like this `200px` and will override the `fullHeight` if used together

### `fullWidth` (boolean)

The fullWidth prop will make width `100vw`

### `fullHeight` (boolean)

The fullHeight prop will make height `100vh`

### `className` (string)

The className prop will be added to the `Carousel` and can add some custom styling. NOTE: In order to override some of the default styling you will need to add `!important`

### `horizontal` (boolean)

The `horizontal` prop is by default true and that make the carousel to be `horizontal`. At the moment is available for testing purposes, and might be removed in the future since that is the default behavior.

### `vertical` (boolean)

The `vertical` prop gives you the option to have a `vertical` scrollable container, and will override `horizontal`

### `disableListDefaultStyles` (boolean)

At the moment we are using `disableListDefaultStyles` flag in order to disable the default list styles. The flag is by default true, in order to allow the use of custom styling, however if you want a simple carousel with predefined background colors, you can set `disableListDefaultStyles` to false, in order to apply the default styling. This flag will be removed in the future.

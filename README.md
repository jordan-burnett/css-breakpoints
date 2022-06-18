# CSS Breakpoints

A simple helper utility for working with breakpoints in your CSS-in-JS solution of choice.

## 🚀 Usage

Example using `styled-components`

```typescript
const bp = new Breakpoints({
    xs: 0,
    sm: 400,
    md: 800,
    lg: 1200
})

const Wrapper = styled.div`
    ${bp.only('md')} {
        /* These styles will apply for clients between 800 and 1200px wide */
        padding: 10px;
    }
`
```

## 🧪 Installation and setup

Install using npm or yarn:

```bash
# NPM
npm install css-breakpoints

# Yarn
yarn add css-breakpoints
```

Define your breakpoints using the **minimum screen size** at which you would expect each breakpoint to apply. 

 For example, if you define a small screen size as between 0-400px and a medium screen size as 400-800px define your breakpoints like so:

```typescript
import Breakpoints from 'css-breakpoints';

const bp = new Breakpoints({
    sm: 0,
    md: 400,
    lg: 800
})
```

## 📚 Available methods

For the purposes of these docs assume a setup using the following breakpoints:

```typescript
const bp = new Breakpoints({
    xs: 0,
    sm: 400,
    md: 800,
    lg: 1200
})
```

### `only`

Matches only the specified breakpoint.

**Example**

```typescript
${bp.only('xs')}{
    /* Will apply only for clients between 0-400px wide */
    background-color: green;
}
```


### `any`

Matches any of the specified breakpoints

**Example**

```typescript
${bp.any('xs', 'lg')}{
    /* Will apply for clients between 0-400px, or 800- 1200px wide */
    background-color: green;
}
```

### `above`

Matches all breakpoints that are greater than the one specified

**Example**

```typescript
${bp.above('xs')}{
    /* Will apply for clients >= 400px */
    background-color: green;
}
```

### `below`

Matches all breakpoints that are lower than the one specified

**Example**

```typescript
${bp.below('md')}{
    /* Will apply for clients < 800px */
    background-color: green;
}
```


### `between`

Matches all breakpoints between the two specified breakpoints

**Example**

```typescript
${bp.below('sm, lg')}{
    /* Will apply for clients >= 400px and < 1200px  */
    background-color: green;
}
```

## Overrides

Some methods (`above`, `below`, and `between`) allow you to pass in a specific numeric value for generating one-off media queries on the fly.

```typescript
${bp.between(100, 500)}{
     /* Will apply for clients >= 100px and < 500px  */
    background-color: green;
}
```

## Alternative units

If you prefer a unit other than `px` to define screen sizes pass it in as the second argument to the constructor:

```typescript
const bp = new Breakpoints({
    sm: 0,
    md: 400,
    lg: 800
}, 'rem')
```
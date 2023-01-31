# Kinda

For when you want TypeScript to stop yelling at you because your mock is only "kinda" like the real thing.

This takes the built-in TypeScript `Partial<T>` type to the next level by making it recursive, and also allowing it to be assignable to type `T`.

## Example

Let's say we have some interfaces:

```typescript
interface A {
  name: string;
  id: number;
  b: B;
}
interface B {
  color: string;
  isActive: boolean;
  c: C;
}
interface C {
  foo: "bar";
}
```

If you try to create a mock version of `A`, normally you would have to implement everything recursively:

```typescript
const mockA: A = {
  name: "testName",
  id: 0,
  b: {
    color: "testColor",
    isActive: false,
    c: {
      foo: "bar",
    },
  },
};
```

This is not too bad in this limited example, but imagine mocking something like a DOM element, with hundreds of properties!

Luckily TypeScript has a built-in type called `Partial<T>` which is the same as `T`, but with all the properties marked optional. This is great, except it only works on one level, so when you are building your mocks, you end up with a lot of `as` casting to and from `Partial` types to avoid compiler errors.

```typescript
let mockA: A;

beforeEach(() => {
  mockA = {
    b: {
      c: {} as Partial<C> as C
    } as Partial<B> as B
  } as Partial<A> as A;
});
```

This greatly harms the readability of your tests, and is generally pretty messy. Why can't we just tell TypeScript to not worry about the type being complete, while still getting type checking and autocompletion for the things you do add to your mocks?

This is where `Kinda<T>` comes in. Kinda tells TypeScript that everything (recursively) is optional, while also telling TypeScript that it adheres to the `T` type. This means that the previous example can now be simplified greatly:

```typescript
let mockA: A;

beforeEach(() => {
  mockA = {
    b: {
      c: {}
    }
  } as Kinda<A>;
});
```

Now you can focus on your testing and not how to make TypeScript stop yelling at your mocks.

Happy testing!

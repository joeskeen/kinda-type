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

let mockedA: A;
mockedA = {
  b: {
    c: {} as Partial<C> as C
  } as Partial<B> as B
} as Partial<A> as A;

mockedA = {
  b: {
    c: {}
  }
} as Kinda<A>;

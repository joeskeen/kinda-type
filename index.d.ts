// based on https://stackoverflow.com/a/64060332/1396477
declare type Kinda<T> = {
  [P in keyof T]?: T[P] extends Array<infer U> ? Array<Value<U>> : Value<T[P]>;
} & T;
type AllowedPrimitives =
  | boolean
  | string
  | number
  | Date /* add any types than should be considered as a primitive, say, DateTimeOffset */;
type Value<T> = T extends AllowedPrimitives ? T : Kinda<T>;

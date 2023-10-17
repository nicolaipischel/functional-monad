// Wrapper Type: Option<T>
// Wrap Function (turns T's into Options<T>'s): some<T>
// Run Function (runs transformations on Option<T>'s): map<T,U>

export type Some<T> = {_tag: 'Some', value: T};
export type None = {_tag: 'None'};
export type Option<T> = Some<T> | None;

const some = <T>(value: T): Some<T> => ({_tag: 'Some', value});

const none = <T>(): None => ({_tag: 'None'});

const map = <T, U>(option: Option<T>, f: (value: T) => U): Option<U> => option._tag === 'Some' ? some(f(option.value)) : none<U>();

const flatMap = <T, U>(option: Option<T>, f: (value: T) => Option<U>): Option<U> => option._tag === 'Some' ? f(option.value) : none<U>();

const getOrElse = <T>(option: Option<T>, onNone: T): T => option._tag === 'Some' ? option.value : onNone;

export const isSome = <T>(option: Option<T>): boolean => option._tag === 'Some';

export const isNone = <T>(option: Option<T>): boolean => option._tag === 'None';

export const andThen = <T, U>(ma: Option<T>, f: (a: T) => Option<U>): Option<U> =>  flatMap(ma, f);

// Example usage
const someValue: Option<number> = some(42);
const noneValue: Option<number> = none();

const mappedValue: Option<number> = map(someValue, x => x * 2)
console.log(getOrElse(mappedValue, 0));

const flapMappedValue: Option<number> = flatMap(someValue, x => some(x * 2));
console.log(getOrElse(flapMappedValue, 0));

console.log(getOrElse(noneValue, 0));

// Example usage with multiple chains
// const result = andThen(someValue, x => some(x * 2)).andThen

const result = andThen(someValue, (x) => {
  console.log("Step 1:", x);
  return some(x * 2);
})

andThen(result, (y) => {
  console.log("Step 2:", y);
  return some(y + 5);
});
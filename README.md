# functional-monad
This repository shows the implementation of a monad

Monads are a design pattern that allows <span style="color: #1589F0;">a user to chain operations</span> while <span style="color: red">the monad manages secret work</span> behind the scenes.

* NumberWithLogs: log concatenation
* Option: possible missing values

Components:
* Wrapper Type
```typescript
NumberWithLogs
```
* Wrap Function (return, pure, unit) => Allows entry to monad ecosystem
```typescript
function wrapWithLogs(x: number): NumberWithLogs {
  return {
    result: x,
    logs: []
  }
}
```
* Run Function (bind, flatMap, >>=) => runs transformations on monadic values
```typescript
function runWithLogs(
  input: NumberWithLogs,
  transform: (_: number) => NumberWithLogs
): NumberWithLogs {
  const newNumberWithLogs = transform(input.result);
  return {
    result: newNumberWithLogs.result,
    logs: input.logs.concat(newNumberWithLogs.logs)
  }
}
```


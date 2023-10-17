interface NumberWithLogs {
  result: number
  logs: string[]
}

function square(x: number): NumberWithLogs {
  return {
    result: x * x,
    logs: [`Squared ${x} to get ${x * x}.`]
  }
}

function addOne(x: number): NumberWithLogs {
  return {
    result: x + 1,
    logs: [`Added 1 to ${x} to get ${x + 1}.`] 
  };
}

function multiplyByThree(x: number): NumberWithLogs {
  return {
    result: x * 3,
    logs: [`Multiplied ${x} with 3 to get ${x * 3}.`]
  }
}

/**
 * Helps numbers to enter the Monad land
 * @param x 
 * @returns 
 */
function wrapWithLogs(x: number): NumberWithLogs {
  return {
    result: x,
    logs: []
  }
}

/**
 * 
 * @param input 
 * @param transform 
 * @returns 
 */
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

const a = wrapWithLogs(5);
const b = runWithLogs(a, addOne);
const c = runWithLogs(b, square);
const d = runWithLogs(c, multiplyByThree)

console.log(a);
console.log(b);
console.log(c);
console.log(d);
export const isFullBatch = (...args: any[]) => {
  const check: Function = (el: any) => el !== undefined;
  const isAllTrue = args.reduce((a, b) => check(a) && check(b));
  const isNoneTrue = !args.reduce((a, b) => check(a) || check(b));
  return isAllTrue || isNoneTrue;
};

export const allExist = (...args: any[]) => {
  return args.findIndex((el) => el === undefined) === -1;
};

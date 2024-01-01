type JSTypeMap = {
  string: string;
  boolean: boolean;
  number: number;
  object: object;
  function: Function;
  symbol: symbol;
  undefined: undefined;
  bigint: bigint;
};

type JSTypeName = keyof JSTypeMap;

type ArgsType<T extends JSTypeName[]> = {
  [I in keyof T]: JSTypeMap[T[I]];
};

// declare function addImpl(...args: [...string[], number, Function]): void;
// 前面args的数量，影响后面函数的定义
// 当函数的参数与参数之间产生了类型关联，用泛型
declare function addImpl<T extends JSTypeName[]>(
  ...args: [...T, (...args: ArgsType<T>) => any]
): void;
addImpl("string", "boolean", "number", (a, b, c) => {});

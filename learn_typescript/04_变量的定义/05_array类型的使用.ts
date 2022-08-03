// 确定一个事实: names是一个数组类型, 但是数组中存放的是什么类型的元素呢?
// 不好的习惯: 一个数组中在TypeScript开发中, 最好存放的数据类型是固定的(string)
// 类型注解: type annotation
const names1: Array<string> = [] // 不推荐(react jsx中是有冲突   <div></div>)
const names2: string[] = [] // 推荐

// 数组类型 (type---类型别名)
type IArr1 = number[];
type IArr2 = Array<string | number | Record<string, number>>; // 泛型（Record--对象类型的简化写法）
type IArr3 = [number, number, string, string];
interface IArr4 {
  [key: number]: any;
}
const arr1: IArr1 = [1,2,3,4];
const arr2: IArr2 = [1,2,'3',{ a: 1 }];
const arr3: IArr3 = [1,2,'3','4'];
const arr4: IArr4 = ['string',() => null, {}, [] ];
// 在数组中存放不同的类型是不好的习惯
// names.push("abc")
// // names.push(123)

export {}
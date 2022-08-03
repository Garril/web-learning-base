const bookList = [{
  author: 'xxx',
  type: 'history',
  range: '2001-2021',
},{
  author: 'yyy',
  type: 'story',
  theme: 'love',
}]
// 为上面书籍编写类型
interface IHistoryBook {
  author: string;
  type: string;
  range: string
}
interface IStroyBook {
  author: string;
  type: string;
  theme: string
}
type IBookList = Array<IHistoryBook | IStroyBook>;
// 会看到，上面的太繁琐了，而且type就两种取值story和history
// 改进：联合/交叉类型
type IBookList2 = Array<{
  author: string;
} & ({
  type: 'history';
  range: string;
} | {
  type: 'story';
  theme: string;
})>
export {}
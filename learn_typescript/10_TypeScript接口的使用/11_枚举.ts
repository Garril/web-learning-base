// 枚举类型的正反映射
enum EnumExample {
  add = '+',
  mult = '*',
}
EnumExample['add'] === '+';
EnumExample['+'] === 'add';

enum ECorlor { Mon, Tue, Wed, Thu, Fri, Sat, Sun };
ECorlor['Mon'] === 0;
ECorlor[0] === 'Mon';

export {}

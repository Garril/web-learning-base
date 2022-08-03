// 通过interface来定义索引类型
interface IndexLanguage {
  [index: number]: string
}

const frontLanguage: IndexLanguage = {
  // key都是number，value都是string，做一个通用类型
  // 这里默认，key都是字面量类型，value都为string
  0: "HTML",
  1: "CSS",
  2: "JavaScript",
  3: "Vue"
  /**
   * 加上interface后
   * "abc":"hhh" 报错
   */
}


interface ILanguageYear {
  [name: string]: number
}

const languageYear: ILanguageYear = {
  "C": 1972,
  "Java": 1995,
  "JavaScript": 1996,
  "TypeScript": 2014
}



export {}
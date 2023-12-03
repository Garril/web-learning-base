// PropType
import {defineComponent, PropType} from 'vue'
export interface ColumnProps{
    id: string;
    title: string;
    avatar: string;
    description: string;
}
export default defineComponent({
    name:'ColumnList',
    props:{
        list:{
            type:Array as PropType<ColumnProps[]>,
            required:true
        }
    }
})
/* 
  定义了一个属性 list，使用 vue 默认的 Array，只能确定它是一个数组类型，
  不能确定数组里面的每一项到底是什么样子的。你在 setup 中，看 props.list 就是一个any数组，
  但是如果使用PropType <ColumnProps[]> 这个时候，props.list 就变成一个 ColumnProps 的数组，
  你使用它的时候不论在 ts 中还是模版中都能获得类型的推断和自动补全等等。
*/
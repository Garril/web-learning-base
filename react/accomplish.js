/* 
  React实现的问题：
    1、jsx不符合JS标准
      转译，return中的div什么的，转React.createElement(.....);
    2、返回的jax发生改变时，如何更新dom
      v-dom与dom同步，diff，fiber
    3、state/props更新时，要重新触发render函数
*/
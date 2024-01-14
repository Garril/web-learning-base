/* 
  刚刚看过功能，
  场景：屏幕一直滚动，每次屏幕大概显示3*3个视频封面和标题
  右下角有一个刚刚看过的按钮，点了后跳转到刚刚看过的那一页的9个视频
  
  假设有1000个图片，你从第3页跳到，刚刚看过的100页，不可能全加载滚回去。

  思路：
  1、封装函数 createElements(page)，接受参数，表示要创建到多少页的3*3的元素（空元素）
    eg：当前页5，传入10，创建前10页的空元素。
    首次和点击刚刚看过按钮，这两个时机需要触发这个函数
    刚刚看过的那个视频在第几页，服务器返回（刚刚看过的第几个这边做个运算）。

  2、监听
    对1创建的空元素进行监控，是否进入用户视口、离开视口
      const ob = new IntersectionObserver((entries)=>{...});
      进入收集添加，离开删除。
    在监听的回调中，收集当前视口内的元素（在1创建时，data-index添加信息做区分）
    
  3、请求
    根据最小最大的下标，我们知道了，要请求哪一些页的数据，请求。
    （每次加载一页，都缓存下）
    
  4、拿到数据，填充
*/


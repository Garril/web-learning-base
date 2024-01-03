红色区为动画显示区，大概略微小于视口

蓝色为动画播放时的区域，红色达到蓝色底部后，才开始被滑动到上面

·![image-20240103233617291](https://forupload.oss-cn-guangzhou.aliyuncs.com/imgs/image-20240103233617291.png)

css动画本质

都是一个属性的值，随着时间的推移变化为另外一个值

想象为一个二维的坐标系（x：时间，y：某个属性的数值）给定x，获得y

这里是

随着x：滚动的推移，改变属性的值

![image-20240103233943672](https://forupload.oss-cn-guangzhou.aliyuncs.com/imgs/image-20240103233943672.png)
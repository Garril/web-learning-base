// 折线图 使用模板
const lineBaseOption = {
  // 标题
  title: {
    text: 'Stacked Line',
    textAlign: 'left', // left（默认）、center、right 或 百分比
    // show: false, // 是否展示标题
  },
  // 图例
  legend: {
    // show: false // 是否展示图例
    textAlign: 'right', // left、center、right（默认） 或 百分比
    orient: 'horizontal', // vertical竖直方向、horizontal横向（默认）
  },
  // 折线，各类别数据
  data: [
    {
      name: 'Video Ads',
      data: [150, 232, 201, 154, 190, 330, 410],
    },
    {
      name: 'Direct',
      data: [320, 332, 301, 334, 390, 330, 320],
    },
    {
      name: 'Search Engine',
      data: [820, 932, 901, 934, 1290, 1330, 1320],
    },
  ],
  // x轴数据
  xAxisData: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  // x轴、y轴单位，°C、%、kg
  axisUnit: {
    x: '%',
    y: '°C',
  },
  // 图例和折线的颜色
  // color: ['red', 'green', 'blue', 'yellow', 'cyan'],
  // 临界线
  limitLines: {
    // 临界线 样式
    style: {
      color: '#e53e31',
      type: 'solid', // 'solid'、'dashed'、'dotted'
      width: 2,
    },
    // 临界线 数据
    lines: [
      {
        value: 2000,
        label: '最大',
      },
      {
        value: 1000,
        label: '最小',
      },
    ],
  },
  // 是否填充折线区域，统计数值，显示总体变化趋势
  // isStackedArea: true
  // 坐标轴、标题、图例等的字体、颜色、是否显示处理
  // 不传有预设，可在 preConfig.stackedLineStyle 根据项目整体，修改预设
  style: {
    backgroundColor: '#082437', // echart背景颜色
    title: {
      // 标题样式
      fontSize: 18,
      color: '#3cadea',
    },
    legend: {
      // 图例样式
      fontSize: 12,
      color: '#a1b0c1',
    },
    xAxisStyle: {
      // x轴坐标样式
      show: true, // 是否显示坐标轴
      color: '#a1b0c1',
      width: 1, // 坐标轴线线宽
      type: 'solid', // 坐标轴线 solid、dashed、dotted
      showScale: true, // 是否显示刻度
      isScaleInside: false, // 是否刻度超内
      rotate: 40, // 旋转的角度从 -90 度到 90 度。
    },
    yAxisStyle: {
      // y轴坐标样式
      show: true, // 是否显示坐标轴（整个）
      showLine: true, // 是否显示坐标轴线
      color: '#a1b0c1',
      width: 1, // 坐标轴线线宽
      type: 'solid', // 坐标轴线 solid、dashed、dotted
    },
  },
  splitLine: {
    x: {
      show: false, // 主轴是否显示网格线
    },
    y: {
      show: false, // 副轴是否显示网格线
    },
  },
  splitArea: {
    x: {
      show: false, // 主轴是否显示区域底色
    },
    y: {
      show: false, // 副轴是否显示区域底色
    },
  },
};
// 内存使用率
const memoryUsage = {
  // 标题
  title: {
    text: '内存使用率',
    textAlign: 'center',
  },
  // 图例
  legend: {
    textAlign: 'right', // left、center、right（默认） 或 百分比
    orient: 'horizontal', // vertical竖直方向、horizontal横向（默认）
  },
  // 折线，各类别数据
  data: [
    {
      name: '内存(%)',
      data: [95, 95, 95, 95, 95, 95, 95],
    },
  ],
  // x轴数据
  xAxisData: [
    '15:24:33',
    '15:26:33',
    '15:28:33',
    '15:30:33',
    '15:32:33',
    '15:34:33',
    '15:36:33',
  ],
  // y轴单位，°C、%、kg
  axisUnit: {
    x: '',
    y: '%',
  },
  isStackedArea: true,
};

// 随时间变化
// 假数据，间隔为5分钟，生成。只展示最新的200条
function randomData() {
  now = new Date(now.getTime() + oneDay);
  value = value + Math.random() * 21 - 10;

  // 将时间格式化为 HH:MM
  let timeFormatted = [now.getHours(), now.getMinutes()]
    .map((num) => num.toString().padStart(2, '0'))
    .join(':');
  return {
    // toString() 或者 getTime()，均支持
    name: now.toString(),
    value: [timeFormatted, Math.round(value)],
  };
}
let timeByData = [];
let now = new Date(2024, 1, 1);
let oneDay = 300000;
let value = Math.random() * 1000;
for (let i = 0; i < 200; i++) {
  timeByData.push(randomData());
}
const timeByOption = {
  // 标题
  title: {
    text: 'Time Axis',
    textAlign: 'left',
  },
  // 图例
  legend: {
    show: false, // 是否展示图例
  },
  data: timeByData,
  isTimeBy: true,
  limitLines: {
    // 临界线 样式
    style: {
      color: '#e53e31',
      type: 'solid', // 'solid'、'dashed'、'dotted'
      width: 2,
    },
    // 临界线 数据
    lines: [
      {
        value: 1000,
        label: '最大',
      },
    ],
  },
};

// 饼图 基础使用
const pieBaseOption = {
  // 标题
  title: {
    text: 'temp title',
    subtext: 'temp subtitle',
    textAlignX: 'center', // left（默认）、center、right 或 百分比
    // textAlignY: '', // 同上，在y轴上的位置
    // show: false, // 是否展示标题
  },
  // 图例
  legend: {
    orient: 'vertical', // horizontal：水平分布、vertical：垂直分布
    right: '5%', // 或者right:0，靠右
    top: 'center',
    // show: false
  },
  data: [
    { value: 1048, name: 'Search Engine' },
    { value: 735, name: 'Direct' },
    { value: 580, name: 'Email' },
    { value: 484, name: 'Union Ads' },
    { value: 300, name: 'Video Ads' },
  ],
  dataName: '当前模块', // 悬停在模块上显示的小标签的标题
  piePos: { // 饼图位置，初始默认 left: 0
    left: '-30%',
    // top: '0',
    // bottom: '0',
    // right: '0',
  },
  radius: '50%', // 实心圆半径，等同于: ['0%','50%'];
  // radius: ['25%', '50%'], // 空心圆，0~25%半径部分为空白，25%~50%为圆
  center: ['50%', '60%'], // 设置中心（圆心）坐标, 参数 [x,y];
  style: {
    // backgroundColor: '#082437', // echart背景颜色
    // title: {
    //   // 标题样式
    //   fontSize: 20,
    //   color: '#3cadea',
    //   overflow: "break"
    // },
    // subtext: {
    //   // 标题样式
    //   fontSize: 14,
    //   color: '#a1b0c1',
    // },
    // legend: {
    //   // 图例样式
    //   fontSize: 12,
    //   color: '#a1b0c1',
    // },
    // module: { // 模块样式
    //   borderRadius: 10,
    //   borderColor: '#082437', // 间距颜色
    //   borderWidth: 2, // 边框宽度
    //   hasBorder: false, // 是否模块间要有边框
    // },
  },
  // 对模块进行标注的 标签
  label: {
    show: true,
    position: 'outer', // inside、outer、center
    // overflow: 'break', // 配置换行,需要和width搭配使用
    // width: '100',
    hover: { // 鼠标悬停在饼图模块上，对应标签的样式
      show: true,
      fontSize: 20,
      fontWeight: 'bold',
      overflow: 'break',
      width: 100
    }
  }
};

// 空心饼图
const hollowPieBaseOption = {
  // 标题
  title: {
    text: 'temp title',
    subtext: '',
    textAlignX: 'center', // left（默认）、center、right 或 百分比
    // textAlignY: '', // 同上，在y轴上的位置
    // show: false, // 是否展示标题
  },
  // 图例
  legend: {
    orient: 'vertical', // horizontal：水平分布、vertical：垂直分布
    top: 'center',
    left: '5%'
    // show: false
  },
  data: [
    { value: 1048, name: 'Search Engine' },
    { value: 735, name: 'Direct' },
    { value: 580, name: 'Email' },
    { value: 484, name: 'Union Ads' },
    { value: 300, name: 'Video Ads' },
  ],
  piePos: { // 饼图位置，初始默认 left: 0
    right: '-20%',
    // top: '0',
    // bottom: '0',
    // right: '0',
  },
  dataName: '当前模块', // 悬停在模块上显示的小标签的标题
  radius: ['25%', '50%'], // 空心圆，0~25%半径部分为空白，25%~50%为圆
  style: {
    module: {
      hasBorder: true,
      borderRadius: 5,
      borderColor: '#082437',
      borderWidth: 2,
    }
  }
};


const barBaseOption = {
  mode: 'single', // 模式，单组数据为single、多组为multi(默认)
  title: {
    text: 'defalut bar', // 标题
    textAlign: 'center',
  },
  data: [
    { value: 1048, name: 'Search Engine' },
    { value: 735, name: 'Direct' },
    { value: 580, name: 'Email' },
    { value: 484, name: 'Union Ads' },
    { value: 300, name: 'Video Ads' },
  ],
};

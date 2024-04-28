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
      data: [150, 232, 201, 154, 190, 330, 410]
    },
    {
      name: 'Direct',
      data: [320, 332, 301, 334, 390, 330, 320]
    },
    {
      name: 'Search Engine',
      data: [820, 932, 901, 934, 1290, 1330, 1320]
    }
  ],
  // x轴数据
  xAxisData: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  // x轴、y轴单位，°C、%、kg
  axisUnit: {
    x: '%',
    y: '°C'
  },
  // 图例和折线的颜色
  // color: ['red', 'green', 'blue', 'yellow', 'cyan'],
  // 临界线
  limitLines: {
    // 临界线 样式
    style: {
      color: '#e53e31',
      type: 'solid', // 'solid'、'dashed'、'dotted'
      width: 2
    },
    // 临界线 数据
    lines: [{
      value: 2000,
      label: '最大',
    },
    {
      value: 1000,
      label: '最小',
    }]
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
    }
  },
  splitLine: {
    x: {
      show: false, // 主轴是否显示网格线
    },
    y: {
      show: false, // 副轴是否显示网格线
    }
  },
  splitArea: {
    x: {
      show: false, // 主轴是否显示区域底色
    },
    y: {
      show: false, // 副轴是否显示区域底色
    }
  }
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
      data: [95, 95, 95, 95, 95, 95, 95]
    }
  ],
  // x轴数据
  xAxisData: ['15:24:33', '15:26:33', '15:28:33', '15:30:33', '15:32:33', '15:34:33', '15:36:33'],
  // y轴单位，°C、%、kg
  axisUnit: {
    x: '',
    y: '%'
  },
  isStackedArea: true
}


function randomData() {
  now = new Date(now.getTime() + oneDay);
  value = value + Math.random() * 21 - 10;

  // 将时间格式化为 HH:MM
  let timeFormatted = [now.getHours(), now.getMinutes()]
    .map(num => num.toString().padStart(2, '0')).join(':');
  return {
    // name: Date类型 toString / getTime均可
    name: now.toString(),
    value: [
      timeFormatted,
      Math.round(value)
    ]
  };
}
let data = [];
let now = new Date(2024, 1, 1);
let oneDay = 300000;
let value = Math.random() * 1000;
for (var i = 0; i < 200; i++) {
  data.push(randomData());
}
// 随时间变化
const timeByOption = {
  // 标题
  title: {
    text: 'Time Axis',
    textAlign: 'left'
  },
  // 图例
  legend: {
    show: false // 是否展示图例
  },
  data: data,
  isTimeBy: true
};

function updateTimeBy(myChart) {
  setInterval(function () {
    data.shift();
    data.push(randomData());
    myChart.setOption({
      xAxis: {
        data: data.map(item => item.value[0]), // 更新x轴坐标值
      },
      series: [
        {
          data: data
        }
      ]
    });
  }, 5000);
}





const pieData = {

};

const barData = {

}


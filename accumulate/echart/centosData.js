
// CentOS 7主机监控信息示例数据
const centosMonitorData = {
  cpuUsedRate: {}, // CPU利用率
  memoryUsedRate: {}, // 物理内存利用率
  memoryUsedVal: {}, // 物理内存使用量
  diskUsedRate: {}, // 磁盘使用率
  diskLeave: {}, // 磁盘剩余空间
  activeProcesses: {}, // 活动进程数目
  sysdata: {}, // 系统整体情况
};

// Centos - CPU利用率 ( 折线图 )
centosMonitorData.cpuUsedRate = Object.assign({}, rateBaseOption, {
  // 标题 和 标题位置
  title: {
    text: 'CPU利用率',
    textAlign: 'center'
  },
  xAxisData: minArr,
});
// 折线图的分类 和 数据
centosMonitorData.cpuUsedRate.data = [
  {
    name: '利用率(%)',
    data: generateStableCPUUsageArray(200) // 生成CPU利用率数据
    /*  生成的 数据结构：
      对象数组，每个对象的属性name为字符串，表示分类（数据线的名称），
      每个对象的属性data为保存数字类型数组，长度为200
    */
  }
];
// 临界线 数据 和 样式
centosMonitorData.cpuUsedRate.limitLines = {
  style: { // 样式
    color: '#e53e31',
    type: 'solid', // 'solid'、'dashed'、'dotted'
    width: 1.5,
  },
  lines: [ // 临界线 数据 --- 配置 阈值为 90
    {
      value: 90,
      label: '阈值',
    },
  ]
}



// Centos -  物理内存利用率 (rateBaseOption是预设的基础配置对象，其属性会被后续设置的覆盖)
centosMonitorData.memoryUsedRate = Object.assign({}, rateBaseOption, {
  title: { // 标题信息
    text: '物理内存利用率',
    textAlign: 'center'
  },
  xAxisData: minArr, // x轴数据，数据结构：字符串数组，表示时间
  // 第一项为"11:13:44"，从 "11:13:44"开始，间隔为1分钟，则后续为："11:14:44"、"11:15:44"、....
});
centosMonitorData.memoryUsedRate.data = [
  {
    name: '内存(%)',
    data: generateStableMemoryUsageArray(200), // 物理内存利用率的y轴数据
  }
]
centosMonitorData.memoryUsedRate.style = {
  xAxisStyle: {
    show: true, // 是否显示坐标轴
    color: '#a1b0c1',
    width: 1, // 坐标轴线线宽
  },
  yAxisStyle: {
    // 副轴坐标样式
    show: true, // 是否显示坐标轴（整个）
    showLine: false, // 是否显示坐标轴线
  },
  areaColor: '#af844f', // 区域颜色
}
centosMonitorData.memoryUsedRate.splitLine = {
  x: {  show: true, // 主轴是否显示网格线
    lineStyle: {  color: ['#46525f']  } },
  y: {  show: true, // 副轴是否显示网格线
    lineStyle: {  color: ['#46525f']  } },
}
// 临界线 样式
centosMonitorData.memoryUsedRate.limitLines = {
  style: {
    color: '#e53e31',
    type: 'solid', // 'solid'、'dashed'、'dotted'
    width: 1.5,
  },
  // 临界线 数据
  lines: [
    { value: 80,  label: '阈值',  },
  ]
}



// Centos - 物理内存使用量 (总32GB) 
const centosMemoryUsageData = [
  { category: '已用内存', percentage: 70, value: 22.4 },  // 已用内存占比70%，实际数据量22.4GB
  { category: '空闲内存', percentage: 15, value: 4.8 },  // 空闲内存占比15%，实际数据量4.8GB
  { category: '缓冲区内存', percentage: 8, value: 2.56 },  // 缓冲区内存占比8%，实际数据量2.56GB
  { category: '应用程序内存', percentage: 5, value: 1.6 },  // 应用程序内存占比5%，实际数据量1.6GB
  { category: '系统内存', percentage: 2, value: 0.64 }  // 系统内存占比2%，实际数据量0.64GB
];
// hollowPieBaseOption是预设的空心饼图配置对象，其属性会被后续设置的覆盖
centosMonitorData.memoryUsedVal = Object.assign({}, hollowPieBaseOption, {
  title: { // 标题
    text: '物理内存使用量',
    subtext: '',
    textAlignX: 'center'
  },
  data: centosMemoryUsageData.map(item => { // 饼图的分类和数据，数据格式如下，对象数组
    return { // 属性含name和value，data是number类型
      name: item.category,
      value: item.value
    }
  }),
  dataName: getFormatTime(), // 悬浮时显示的数据窗口的标题，设置为格式时间比如："06-01 14:38"
  piePos: { // 饼图在画布上的位置
    right: '-20%',
    top: '5%',
  },
  tooltip: { // 悬浮时显示的数据窗口的内容，这里为自定义内容，显示数据的同时，显示百分比
    trigger: 'item',
    formatter: function (params) {
      return '<span style="font-weight: bold; color: #333;">' + params.seriesName + '</span><br/>' +
        params.marker + params.data.name + ': ' + params.data.value + 'GB (' + params.percent + '%)';
    }
  }
});
delete centosMonitorData.memoryUsedVal.legend.left;
centosMonitorData.memoryUsedVal.legend.right = '5%';
centosMonitorData.memoryUsedVal.piePos.left = '0';
centosMonitorData.memoryUsedVal.piePos.right = '20%';


// Centos - 磁盘使用率
// lineBaseOption是预设的折线图配置对象，其属性会被后续设置的覆盖
centosMonitorData.diskUsedRate = Object.assign({}, lineBaseOption, {
  title: { // 标题信息
    text: '磁盘使用率',
    textAlign: 'center'
  },
  xAxisData: minArr,  // x轴数据，数据结构：字符串数组，表示时间
  // 第一项为"11:13:44"，从 "11:13:44"开始，间隔为1分钟，则后续为："11:14:44"、"11:15:44"、....
  axisUnit: { // x轴和y轴显示是否携带单位。这里y轴带百分号
    x: "",
    y: "%"
  },
  data: [ // 折线的分类和数据，这里两类："/" 和 "/boot"，数据都是长度为200的数字类型数组。
    {
      name: '/',
      data: Array(200).fill(66)
    },
    {
      name: '/boot',
      data: Array(200).fill(20)
    }
  ]
});
centosMonitorData.diskUsedRate.limitLines = {
  style: {  // 临界线 样式
    color: '#e53e31',
    type: 'solid', // 'solid'、'dashed'、'dotted'
    width: 1.5,
  },
  lines: [ // 临界线 数据，在阈值90的地方显示临界线
    {
      value: 90,
      label: '阈值',
    },
  ]
}
centosMonitorData.diskUsedRate.splitLine = {
  x: {
    show: true, // 主轴是否显示网格线
    lineStyle: {
      color: ['#46525f'] // 线的颜色
    }
  },
  y: {
    show: true, // 副轴是否显示网格线
    lineStyle: {
      color: ['#46525f'] // 线的颜色
    }
  },
}
centosMonitorData.diskUsedRate.style.xAxisStyle.rotate = 0
centosMonitorData.diskUsedRate.legend = {
  orient: 'vertical',
  right: '5%',
  top: '2%'
};
centosMonitorData.diskUsedRate.title.top = '3%';





// Centos - 磁盘剩余空间
const centosDiskSpaceUsageData = [ // 假数据
  { category: '已使用空间', percentage: 75, value: 750 },  // 已使用空间占比75%，实际数据量750GB
  { category: '系统文件', percentage: 20, value: 200 },  // 系统文件占比20%，实际数据量200GB
  { category: '用户数据', percentage: 45, value: 450 },  // 用户数据占比45%，实际数据量450GB
  { category: '备份文件', percentage: 5, value: 50 },  // 备份文件占比5%，实际数据量50GB
  { category: '其他', percentage: 10, value: 100 },  // 其他占比10%，实际数据量100GB
  { category: '空闲空间', percentage: 25, value: 250 }  // 空闲空间占比25%，实际数据量250GB
];
centosMonitorData.diskLeave = Object.assign({}, pieBaseOption, { // pieBaseOption为实心饼图基本配置对象
  title: { // 标题
    text: '磁盘剩余空间',
    subtext: '',
    textAlignX: 'center',
    top: '10%'
  },
  data: centosDiskSpaceUsageData.map(item => { // 配置数据，数据格式：对象数组，name和value两属性
    // name为分类，value为对应的值
    return {
      name: item.category,
      value: item.value
    }
  }),
  // 自定义悬浮时显示的数据，显示分类，数据，以及所占的百分比。
  tooltip: {
    trigger: 'item',
    formatter: function (params) {
      return '<span style="font-weight: bold; color: #333;">' + params.seriesName + '</span><br/>' +
        params.marker + params.data.name + ': ' + params.data.value + 'GB (' + params.percent + '%)';
    }
  },
  piePos: { // 饼图的位置
    left: '-20%'
  }
})
centosMonitorData.diskLeave.legend.top = '40%'


// Centos - 活动进程数目
const activeProcessData = generateSmoothedActiveProcessData(200); // 生成活动进程数的假数据。
centosMonitorData.activeProcesses = Object.assign({}, lineBaseOption, { // lineBaseOption折线图基础配置对象
  title: { // 标题
    text: '活动进程数目',
    textAlign: 'center'
  },
  xAxisData: minArr, // x轴数据，数据结构：字符串数组，表示时间
  // 第一项为"11:13:44"，从 "11:13:44"开始，间隔为1分钟，则后续为："11:14:44"、"11:15:44"、....
  axisUnit: { // x轴y轴带什么单位
    x: "",
    y: ""
  },
  data: [ // 折线图数据，对象数组
    {
      name: '进程数目',
      data: activeProcessData.map(item => {
        return item['count']
      })
    }
  ],
  area: {
    min: 40,
    max: 160
  }
});
// 临界线 样式
centosMonitorData.activeProcesses.limitLines = {
  style: { // 样式
    color: '#e53e31',
    type: 'solid', // 'solid'、'dashed'、'dotted'
    width: 1.5,
  },
  // 临界线 数据，两条，一条为 max，值为130，另一条为 min，值为80
  lines: [  { value: 130, label: 'max', },
            { value: 80,  label: 'min', },
  ]
}
centosMonitorData.activeProcesses.splitLine = {
  x: {
    show: true, // 主轴是否显示网格线
    lineStyle: {  color: ['#46525f']  }
  },
  y: {
    show: true, // 副轴是否显示网格线
    lineStyle: {  color: ['#46525f']  }
  },
}
centosMonitorData.activeProcesses.style.xAxisStyle.rotate = 0
// 图例样式
centosMonitorData.activeProcesses.legend = {
  orient: 'vertical',
  right: '5%',
  top: '2%'
};
centosMonitorData.activeProcesses.title.top = '3%';



// centos系统整体 -- 模拟数据
centosMonitorData.sysdata = {
  systemTime: '2024-05-19 11:16:31',
  uptime: '23 天 4 小时 32 分钟',
  memoryTotal: 16, // in MB
  memoryUsed: 4,   // in MB
  diskTotal: 1024,    // in GB
  diskUsed: 250          // in GB
};
// centos - 内存数据（实心饼图）
const centosMonitorMemory = Object.assign({}, pieBaseOption, {
  title: { // 标题
    text: '内存使用情况',
    subtext: '',
    textAlignX: 'center',
    show: false
  },
  data: [{ // 
    name: '已使用',
    value: centosMonitorData.sysdata.memoryUsed
  }, {
    value: centosMonitorData.sysdata.memoryTotal - centosMonitorData.sysdata.memoryUsed,
    name: '未使用'
  }],
  // 和其他一样，悬停时在分类和数据的基础上，加显示百分比
  tooltip: {
    trigger: 'item',
    formatter: function (params) {
      return '<span style="font-weight: bold; color: #333;">' + params.seriesName + '</span><br/>' +
        params.marker + params.data.name + ': ' + params.data.value + 'GB (' + params.percent + '%)';
    }
  },
  // 饼图位置
  piePos: {
    top: '-30%',
    left: '0',
    right: "0"
  }
})
// 隐藏图例
centosMonitorMemory.legend.show = false
// 自定义没悬停时，静态时，数据的展示
centosMonitorMemory.label = {
  show: true,
  position: 'outer', // inside、outer、center
  overflow: 'break', // 配置换行,需要和width搭配使用
  width: '80',
  formatter: '{b} : {c} ({d}%)'
}

// centos - 磁盘数据（实心饼图）,与内存数据放一起
const centosMonitorDisk = Object.assign({}, pieBaseOption, {
  title: { // 标题
    text: '磁盘使用情况', subtext: '', textAlignX: 'center',  show: false
  },
  data: [{
    name: '已使用',
    value: centosMonitorData.sysdata.diskUsed,
    itemStyle: {
      color: '#fac858'
    }
  }, {
    value: centosMonitorData.sysdata.diskTotal - centosMonitorData.sysdata.diskUsed,
    name: '未使用',
    itemStyle: {
      color: '#91cc75'
    }
  }],
  tooltip: {
    trigger: 'item',
    formatter: function (params) {
      return '<span style="font-weight: bold; color: #333;">' + params.seriesName + '</span><br/>' +
        params.marker + params.data.name + ': ' + params.data.value + 'GB (' + params.percent + '%)';
    }
  },
  piePos: {
    top: '-30%',
    left: '0',
    right: "0",
  }
})
centosMonitorDisk.legend.show = false
centosMonitorDisk.label = {
  show: true,
  position: 'outer', // inside、outer、center
  overflow: 'break', // 配置换行,需要和width搭配使用
  width: '100',
  formatter: '{b} : {c} ({d}%)'
}

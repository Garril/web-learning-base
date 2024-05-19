
// CentOS 7主机监控信息示例数据
const centosMonitorData = {
  cpuUsedRate: {},
  memoryUsedRate: {},
  memoryUsedVal: {},
  diskUsedRate: {},
  diskLeave: {},
  activeProcesses: {},
  sysdata: {}
};

// CPU利用率
centosMonitorData.cpuUsedRate = Object.assign({}, memoryUsage, {
  title: {
    text: 'CPU利用率',
    textAlign: 'center'
  },
  xAxisData: minArr,
});
centosMonitorData.cpuUsedRate.data = [
  {
    name: '利用率(%)',
    data: generateStableCPUUsageArray(200)
  }
];
centosMonitorData.cpuUsedRate.limitLines = {
  // 临界线 样式
  style: {
    color: '#e53e31',
    type: 'solid', // 'solid'、'dashed'、'dotted'
    width: 1.5,
  },
  // 临界线 数据
  lines: [
    {
      value: 90,
      label: '阈值',
    },
  ]
}



// 物理内存利用率
centosMonitorData.memoryUsedRate = Object.assign({}, memoryUsage, {
  title: {
    text: '物理内存利用率',
    textAlign: 'center'
  },
  xAxisData: minArr,
});

centosMonitorData.memoryUsedRate.data = [
  {
    name: '内存(%)',
    data: generateStableMemoryUsageArray(200)
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
  areaColor: '#af844f'
}
centosMonitorData.memoryUsedRate.splitLine = {
  x: {
    show: true, // 主轴是否显示网格线
    lineStyle: {
      color: ['#46525f']
    }
  },
  y: {
    show: true, // 副轴是否显示网格线
    lineStyle: {
      color: ['#46525f']
    }
  },
}
centosMonitorData.memoryUsedRate.limitLines = {
  // 临界线 样式
  style: {
    color: '#e53e31',
    type: 'solid', // 'solid'、'dashed'、'dotted'
    width: 1.5,
  },
  // 临界线 数据
  lines: [
    {
      value: 80,
      label: '阈值',
    },
  ]
}



// 物理内存使用量 (总32GB)
const centosMemoryUsageData = [
  { category: '已用内存', percentage: 70, value: 22.4 },  // 已用内存占比70%，实际数据量22.4GB
  { category: '空闲内存', percentage: 15, value: 4.8 },  // 空闲内存占比15%，实际数据量4.8GB
  { category: '缓冲区内存', percentage: 8, value: 2.56 },  // 缓冲区内存占比8%，实际数据量2.56GB
  { category: '应用程序内存', percentage: 5, value: 1.6 },  // 应用程序内存占比5%，实际数据量1.6GB
  { category: '系统内存', percentage: 2, value: 0.64 }  // 系统内存占比2%，实际数据量0.64GB
];
centosMonitorData.memoryUsedVal = Object.assign({}, hollowPieBaseOption, {
  title: {
    text: '物理内存使用量',
    subtext: '',
    textAlignX: 'center'
  },
  data: centosMemoryUsageData.map(item => {
    return {
      name: item.category,
      value: item.value
    }
  }),
  dataName: getFormatTime(),
  piePos: {
    right: '-20%',
    top: '5%',
  },
  tooltip: {
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


// 磁盘使用率
centosMonitorData.diskUsedRate = Object.assign({}, lineBaseOption, {
  title: {
    text: '磁盘使用率',
    textAlign: 'center'
  },
  xAxisData: minArr,
  axisUnit: {
    x: "",
    y: "%"
  },
  data: [
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
  // 临界线 样式
  style: {
    color: '#e53e31',
    type: 'solid', // 'solid'、'dashed'、'dotted'
    width: 1.5,
  },
  // 临界线 数据
  lines: [
    {
      value: 90,
      label: '阈值',
    },
  ]
}
centosMonitorData.diskUsedRate.style.xAxisStyle.rotate = 0
centosMonitorData.diskUsedRate.splitLine = {
  x: {
    show: true, // 主轴是否显示网格线
    lineStyle: {
      color: ['#46525f']
    }
  },
  y: {
    show: true, // 副轴是否显示网格线
    lineStyle: {
      color: ['#46525f']
    }
  },
}
centosMonitorData.diskUsedRate.legend = {
  orient: 'vertical',
  right: '5%',
  top: '2%'
};
centosMonitorData.diskUsedRate.title.top = '3%';




// 磁盘剩余空间
const centosDiskSpaceUsageData = [
  { category: '已使用空间', percentage: 75, value: 750 },  // 已使用空间占比75%，实际数据量750GB
  { category: '系统文件', percentage: 20, value: 200 },  // 系统文件占比20%，实际数据量200GB
  { category: '用户数据', percentage: 45, value: 450 },  // 用户数据占比45%，实际数据量450GB
  { category: '备份文件', percentage: 5, value: 50 },  // 备份文件占比5%，实际数据量50GB
  { category: '其他', percentage: 10, value: 100 },  // 其他占比10%，实际数据量100GB
  { category: '空闲空间', percentage: 25, value: 250 }  // 空闲空间占比25%，实际数据量250GB
];

centosMonitorData.diskLeave = Object.assign({}, pieBaseOption, {
  title: {
    text: '磁盘剩余空间',
    subtext: '',
    textAlignX: 'center',
    top: '10%'
  },
  data: centosDiskSpaceUsageData.map(item => {
    return {
      name: item.category,
      value: item.value
    }
  }),
  tooltip: {
    trigger: 'item',
    formatter: function (params) {
      return '<span style="font-weight: bold; color: #333;">' + params.seriesName + '</span><br/>' +
        params.marker + params.data.name + ': ' + params.data.value + 'GB (' + params.percent + '%)';
    }
  },
  piePos: {
    left: '-20%'
  }
})
centosMonitorData.diskLeave.legend.top = '40%'


// 活动进程数目
const activeProcessData = generateSmoothedActiveProcessData(200);
centosMonitorData.activeProcesses = Object.assign({}, lineBaseOption, {
  title: {
    text: '活动进程数目',
    textAlign: 'center'
  },
  xAxisData: minArr,
  axisUnit: {
    x: "",
    y: ""
  },
  data: [
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

centosMonitorData.activeProcesses.limitLines = {
  // 临界线 样式
  style: {
    color: '#e53e31',
    type: 'solid', // 'solid'、'dashed'、'dotted'
    width: 1.5,
  },
  // 临界线 数据
  lines: [
    {
      value: 130,
      label: 'max',
    },
    {
      value: 80,
      label: 'min',
    },
  ]
}
centosMonitorData.activeProcesses.style.xAxisStyle.rotate = 0
centosMonitorData.activeProcesses.splitLine = {
  x: {
    show: true, // 主轴是否显示网格线
    lineStyle: {
      color: ['#46525f']
    }
  },
  y: {
    show: true, // 副轴是否显示网格线
    lineStyle: {
      color: ['#46525f']
    }
  },
}
centosMonitorData.activeProcesses.legend = {
  orient: 'vertical',
  right: '5%',
  top: '2%'
};
centosMonitorData.activeProcesses.title.top = '3%';



// centos系统整体
centosMonitorData.sysdata = {
  systemTime: '2024-05-19 11:16:31',
  uptime: '23 天 4 小时 32 分钟',
  memoryTotal: 16, // in MB
  memoryUsed: 4,   // in MB
  diskTotal: 1024,    // in GB
  diskUsed: 250          // in GB
};

// 内存数据
const centosMonitorMemory = Object.assign({}, pieBaseOption, {
  title: {
    text: '内存使用情况',
    subtext: '',
    textAlignX: 'center',
    show: false
  },
  data: [{
    name: '已使用',
    value: centosMonitorData.sysdata.memoryUsed
  }, {
    value: centosMonitorData.sysdata.memoryTotal - centosMonitorData.sysdata.memoryUsed,
    name: '未使用'
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
    right: "0"
  }
})
centosMonitorMemory.legend.show = false
centosMonitorMemory.label = {
  show: true,
  position: 'outer', // inside、outer、center
  overflow: 'break', // 配置换行,需要和width搭配使用
  width: '80',
  formatter: '{b} : {c} ({d}%)'
}
/* centosMonitorMemory.label.formatter = '{b} : {c} ({d}%)'  // 自定义formatter，显示名称、数值和占比 */


// 磁盘数据
const centosMonitorDisk = Object.assign({}, pieBaseOption, {
  title: {
    text: '磁盘使用情况',
    subtext: '',
    textAlignX: 'center',
    show: false
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

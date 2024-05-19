// Windows Server主机监控信息示例数据
const windowsMonitorData = {
  cpuUsedRate: {}, // 复用
  memoryUsedRate: {}, // 复用
  memoryUsedVal: {},
  diskUsedRate: {},
  diskLeave: {},
  processorProcesses: {},
  cpuHZ: {},
  dealProcesses: {},
  networkBandWidth: {},
};

// 物理内存使用情况
const windowsServerMemoryUsageData = [
  { category: '已用内存', percentage: 75, value: 24 },  // 已用内存占比75%，实际数据量24GB
  { category: '可用内存', percentage: 25, value: 8 },  // 可用内存占比25%，实际数据量8GB
  { category: '系统缓存', percentage: 10, value: 3.2 },  // 系统缓存占比10%，实际数据量3.2GB
  { category: '应用程序内存', percentage: 8, value: 2.56 },  // 应用程序内存占比8%，实际数据量2.56GB
  { category: '系统内存', percentage: 7, value: 2.24 }  // 系统内存占比7%，实际数据量2.24GB
];
windowsMonitorData.memoryUsedVal = Object.assign({}, hollowPieBaseOption, {
  title: {
    text: '物理内存使用量',
    subtext: '',
    textAlignX: 'center'
  },
  data: windowsServerMemoryUsageData.map(item => {
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
delete windowsMonitorData.memoryUsedVal.legend.left;
windowsMonitorData.memoryUsedVal.legend.right = '5%';
windowsMonitorData.memoryUsedVal.piePos.left = '0';
windowsMonitorData.memoryUsedVal.piePos.right = '20%';





// 磁盘使用率
const windowsDiskUtilizationData = [
  { drive: 'C:', utilization: 80 },  // C盘利用率 80%
  { drive: 'D:', utilization: 60 },  // D盘利用率 60%
  { drive: 'E:', utilization: 40 },  // E盘利用率 40%
  { drive: 'F:', utilization: 75 }   // F盘利用率 75%
];
windowsMonitorData.diskUsedRate = Object.assign({}, lineBaseOption, {
  title: {
    text: '磁盘使用率',
    left: '7%'
  },
  xAxisData: minArr,
  axisUnit: {
    x: "",
    y: "%"
  },
  data: windowsDiskUtilizationData.map(item => {
    return {
      name: item.drive + '盘',
      data: Array(200).fill(item.utilization)
    }
  })
});

windowsMonitorData.diskUsedRate.limitLines = {
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
windowsMonitorData.diskUsedRate.style.xAxisStyle.rotate = 0
windowsMonitorData.diskUsedRate.splitLine = {
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
windowsMonitorData.diskUsedRate.legend = {
  right: '5%',
  top: '2%'
};
windowsMonitorData.diskUsedRate.title.top = '3%';


// 磁盘剩余空间
const windowsServerDiskSpaceUsageData = [
  { category: '已使用空间', percentage: 70, value: 700 },  // 已使用空间占比70%，实际数据量700GB
  { category: '系统文件', percentage: 25, value: 250 },  // 系统文件占比25%，实际数据量250GB
  { category: '用户数据', percentage: 40, value: 400 },  // 用户数据占比40%，实际数据量400GB
  { category: '备份文件', percentage: 8, value: 80 },  // 备份文件占比8%，实际数据量80GB
  { category: '其他', percentage: 12, value: 120 },  // 其他占比12%，实际数据量120GB
  { category: '空闲空间', percentage: 30, value: 300 }  // 空闲空间占比30%，实际数据量300GB
];


windowsMonitorData.diskLeave = Object.assign({}, pieBaseOption, {
  title: {
    text: '磁盘剩余空间',
    subtext: '',
    textAlignX: 'center',
    top: '10%'
  },
  data: windowsServerDiskSpaceUsageData.map(item => {
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
windowsMonitorData.diskLeave.legend.top = '40%'




// 总进程数目
// 生成200条 Windows Server 进程数目数据
const windowsProcessData = generateWindowsProcessData(200);
windowsMonitorData.processorProcesses = Object.assign({}, lineBaseOption, {
  title: {
    text: '总进程数目',
    left: '7%'
  },
  data: windowsProcessData,
  xAxisData: minArr,
  axisUnit: {
    x: "",
    y: ""
  },
  area: {
    max: 300
  }
});

windowsMonitorData.processorProcesses.limitLines = {
  // 临界线 样式
  style: {
    color: '#e53e31',
    type: 'solid', // 'solid'、'dashed'、'dotted'
    width: 1.5,
  },
  // 临界线 数据
  lines: [
    {
      value: 250,
      label: '阈值',
    },
  ]
}
windowsMonitorData.processorProcesses.style.xAxisStyle.rotate = 0
windowsMonitorData.processorProcesses.splitLine = {
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
windowsMonitorData.processorProcesses.legend = {
  right: '5%',
  top: '2%'
};
windowsMonitorData.processorProcesses.title.top = '3%';


// CPU频率
// 生成各种 CPU 频率数据
const cpuRateData = generateCPURateData(20);
windowsMonitorData.cpuHZ = Object.assign({}, lineBaseOption, {
  title: {
    text: 'CPU频率',
    left: '7%'
  },
  data: cpuRateData,
  xAxisData: minArr.slice(180),
  axisUnit: {
    x: "",
    y: ""
  },
  area: {
    min: 500
  }
});

windowsMonitorData.cpuHZ.limitLines = {
  // 临界线 样式
  style: {
    color: '#e53e31',
    type: 'solid', // 'solid'、'dashed'、'dotted'
    width: 1.5,
  },
  // 临界线 数据
  // lines: [
  //   {
  //     value: 250,
  //     label: '阈值',
  //   },
  // ]
}
windowsMonitorData.cpuHZ.style.xAxisStyle.rotate = 0
windowsMonitorData.cpuHZ.splitLine = {
  x: {
    show: false, // 主轴是否显示网格线
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
windowsMonitorData.cpuHZ.legend = {
  right: '5%',
  top: '2%'
};
windowsMonitorData.cpuHZ.title.top = '3%';


// 处理器进程数
const dealProcessesArr = generateSmoothProcessorProcessData(200);
windowsMonitorData.dealProcesses = Object.assign({}, lineBaseOption, {
  title: {
    text: '处理器进程数',
    left: '7%'
  },
  data: dealProcessesArr,
  xAxisData: minArr,
  axisUnit: {
    x: "",
    y: ""
  },
  area: {
    max: 300
  }
});

windowsMonitorData.dealProcesses.limitLines = {
  // 临界线 样式
  style: {
    color: '#e53e31',
    type: 'solid', // 'solid'、'dashed'、'dotted'
    width: 1.5,
  },
  // 临界线 数据
  lines: [
    {
      value: 250,
      label: '阈值',
    },
  ]
}
windowsMonitorData.dealProcesses.style.xAxisStyle.rotate = 0
windowsMonitorData.dealProcesses.splitLine = {
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
windowsMonitorData.dealProcesses.legend = {
  right: '5%',
  top: '2%'
};
windowsMonitorData.dealProcesses.title.top = '3%';


// 网络带宽
const netWorkArr = generateNetworkBandwidthData(200);
windowsMonitorData.networkBandWidth = Object.assign({}, memoryUsage, {
  title: {
    text: '网络带宽',
    textAlign: 'center'
  },
  xAxisData: minArr,
  axisUnit: {
    x: "",
    y: " Mbps"
  },
  area: {
    max: 100
  }
});
windowsMonitorData.networkBandWidth.data = [
  {
    name: 'Mbps',
    data: netWorkArr.data
  }
];
windowsMonitorData.networkBandWidth.limitLines = {
  // 临界线 样式
  style: {
    color: '#e53e31',
    type: 'solid', // 'solid'、'dashed'、'dotted'
    width: 1.5,
  },
  // 临界线 数据
  lines: [
    {
      value: 20,
      label: '最小',
    },
  ]
}



// 系统信息
const preAlertData = {
  systemTime: '2024-05-19 11:16:31',
  uptime: '23 天 4 小时 32 分钟',
  osVersion: 'Windows Server 2019', // 操作系统版本
  osBits: '64-bit', // 操作系统位数
  activeProcesses: 125, // 活动进程数
  cpuTotalUsage: 75, // 总 CPU 使用率
  cpuCoreUsage: [   // 各 CPU 核心使用率
    { coreId: 0, usage: 70 },
    { coreId: 1, usage: 80 },
    { coreId: 2, usage: 65 },
    { coreId: 3, usage: 75 }
  ],
  memoryTotal: 32, // 总运行内存GB
  memoryUsed: 16,   // 已用运行内存GB
  diskTotal: 2048,    // 总存储内存GB
  diskUsed: 1024,  // 已用存储内存GB
  networkInboundTraffic: 1024, // 总网络流入单位: Mbps
  networkOutboundTraffic: 512  // 总网络流出单位: Mbps
};


// 预设样式
const preConfig = {
  // 折线图
  stackedLineStyle: {
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
    },
    yAxisStyle: {
      // y轴坐标样式
      show: true, // 是否显示坐标轴（整个）
      showLine: false, // 是否显示坐标轴线
      color: '#a1b0c1',
      width: 1, // 坐标轴线线宽
      type: 'solid', // 坐标轴线 solid、dashed、dotted
    }
  },
  // 饼图
  pieStyle: {
    backgroundColor: '#082437', // echart背景颜色
    title: {
      // 标题样式
      fontSize: 20,
      color: '#3cadea',
      overflow: "break"
    },
    subtext: {
      // 标题样式
      fontSize: 14,
      color: '#a1b0c1',
    },
    legend: {
      // 图例样式
      fontSize: 12,
      color: '#a1b0c1',
    },
    module: {
      borderRadius: 10,
      borderColor: '#082437',
      borderWidth: 2,
      hasBorder: false,
    },
  },
  // 柱状图
  barStyle: {
    backgroundColor: '#082437', // echart背景颜色
    title: {
      // 标题样式
      fontSize: 20,
      color: '#3cadea',
      overflow: "break"
    },
    barWidth: '50%',
    hover: 'line',
    legend: {
      // 图例样式
      fontSize: 12,
      color: '#a1b0c1',
    },
    showBackground: false,
    backgroundStyle: {
      color: 'rgba(180, 180, 180, 0.2)'
    },
    xAxisStyle: {
      // x轴坐标样式
      show: true, // 是否显示坐标轴
      color: '#a1b0c1',
      width: 1, // 坐标轴线线宽
      type: 'solid', // 坐标轴线 solid、dashed、dotted
      showScale: true, // 是否显示刻度
      isScaleInside: false, // 是否刻度超内
    },
    yAxisStyle: {
      // y轴坐标样式
      show: true, // 是否显示坐标轴（整个）
      showLine: false, // 是否显示坐标轴线
      color: '#a1b0c1',
      width: 1, // 坐标轴线线宽
      type: 'solid', // 坐标轴线 solid、dashed、dotted
    }
  }
};
/* 
  辅助函数（纯Object.assign无法满足要求，实现：保持预设样式的值，同时适应传入样式）
  参数1: 预设对象
  参数2: 定制内容对象
 */
function specAssign(obj1, obj2) {
  const deepMerge = (target, source) => {
    for (let key in source) {
      if (source[key] instanceof Object && key in target && target[key] instanceof Object) {
        deepMerge(target[key], source[key]);
      } else {
        target[key] = source[key];
      }
    }
  };
  let res = JSON.parse(JSON.stringify(obj1));
  deepMerge(res, obj2);
  return res;
}


// 生成 折线图 options
function getStackedLineOption({
  title = {},
  legend = {},
  limitLines = {},
  splitLine = {
    x: {
      show: false,
      lineStyle: {
        color: ['#7e8fa1']
      }
    }, y: {
      show: true,
      lineStyle: {
        color: ['#7e8fa1']
      }
    }
  },
  splitArea = { x: { show: false }, y: { show: false } },
  axisUnit = { x: '', y: '' },
  data = [],
  xAxisData = [],
  color = [],
  download = false,
  isStackedArea = false,
  isTimeBy = false,
  style = {}
}, instance = null) {
  const _style = specAssign(preConfig.stackedLineStyle, style);
  const legendArr = data.map((item) => item['name']) || [];

  const option = {
    backgroundColor: _style.backgroundColor,
    title: {
      text: 'default title',
      show: true,
      textStyle: _style.title,
    },
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: legendArr,
      show: true,
      textStyle: _style.legend,
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    toolbox: {},
    xAxis: {
      type: 'category',
      boundaryGap: false, // false：从x轴0起。true：x轴居中位置。
      data: xAxisData,
      show: _style.xAxisStyle.show,
      axisLine: {
        lineStyle: _style.xAxisStyle,
      },
      axisTick: {
        show: _style.xAxisStyle.showScale,
        inside: _style.xAxisStyle.isScaleInside,
      },
      splitLine: splitLine.x,
      splitArea: splitArea.x,
      axisLabel: {
        formatter: '{value}' + axisUnit.x,
        rotate: _style.xAxisStyle.rotate
      }
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value}' + axisUnit.y
      },
      show: _style.yAxisStyle.show,
      axisLine: {
        lineStyle: _style.yAxisStyle,
        show: _style.yAxisStyle.showLine,
      },
      splitLine: splitLine.y,
      splitArea: splitArea.y,
    },
    series: []
  };
  // 更新函数
  let updateFn = (data, xAxisData) => {
    const newArr = data.map((item) => {
      return formateData(item, isStackedArea)
    });
    instance.setOption({
      xAxis: {
        data: xAxisData, // 更新x轴坐标值
      },
      series: newArr
    });
  };
  // 格式化请求结果数据的每一项
  function formateData(item, isStackedArea) {
    const formatObj = {
      ...item,
      type: 'line',
      stack: 'Total',
    };
    if (isStackedArea) {
      formatObj.areaStyle = {};
      formatObj.emphasis = {
        focus: 'series',
      };
    };
    return formatObj;
  }
  // 是否随时间变化
  if (!isTimeBy) {
    option.series = data.map((item) => {
      return formateData(item, isStackedArea)
    })
  } else {
    option.series.push({
      name: 'MyData',
      type: 'line',
      showSymbol: false,
      data: data
    })
    option.xAxis = Object.assign(option.xAxis, {
      'type': 'category',
      'data': data.map(item => item.value[0])
    })

    option.yAxis = Object.assign(option.yAxis, {
      'boundaryGap': [0, '100%'],
      'type': 'value'
    })

    option.xAxis.splitLine.show = false;
    option.yAxis.splitLine.show = true;

    option.tooltip = {
      trigger: 'axis',
      formatter: function (params) {
        params = params[0];
        let paramsName = parseInt(params.name);
        if (Number.isNaN(paramsName)) {
          // date类型是一个格式化好的日期字符串
          _date = new Date(params.name);
        } else {
          // date类型是一个数字串过来
          _date = new Date(paramsName);
        }

        var formattedDate = _date.toLocaleString();  // 获取带有日期的时间格式
        return (
          formattedDate +
          ' : ' +
          params.value[1]
        );
      },
      axisPointer: {
        animation: false
      }
    }

    updateFn = (timeByData) => {
      instance.setOption({
        xAxis: {
          data: timeByData.map(inner => inner.value[0]), // 更新x轴坐标值
        },
        series: [
          {
            data: timeByData
          }
        ]
      });
    };
  }
  // 是否需要支持保存为图片的功能
  if (download) {
    option.toolbox = {
      feature: {
        saveAsImage: {},
      },
    };
  }
  // 颜色
  color.length > 0 && (option.color = color);
  // 标题
  if (title) {
    option.title = { ...option.title, ...title };
    // 标题位置
    title.textAlign && (option.title.left = title.textAlign);
  }
  // 图例
  if (legend) {
    option.legend = { ...option.legend, ...legend };
    // 图例位置
    legend.textAlign && (option.legend.left = legend.textAlign);
  }
  // 最大 / 最小 线
  if (limitLines.lines && limitLines.lines.length > 0) {
    option.series = option.series.map((item) => {
      return {
        ...item,
        markLine: {
          silent: false, // 是否响应鼠标
          data: limitLines.lines.map((line) => ({
            type: 'line',
            yAxis: line.value,
            label: { show: true, formatter: '{b}' },
            name: line.label || 'default name',
          })),
          lineStyle: limitLines.style,
        },
      };
    });
  }

  // 图例、标题都隐藏，图表位置上调
  if (!option.title.show && !option.legend.show) {
    option.grid.top = '10%';
  }
  // 是否填充折线区域，统计数值，显示总体变化趋势
  if (isStackedArea) {
    option.tooltip.axisPointer = {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985',
      },
    };
  }

  return { option: option, fn: updateFn };
}


// 生成 饼图 options
function getPieOption({
  title = {},
  legend = {},
  piePos = {},
  style = {},
  dataName = 'default name',
  radius = '50%',
  data = [],
  center = ['50%', '50%'],
  label = { hover: {} },
}, instance) {
  const _style = specAssign(preConfig.pieStyle, style);
  // 更新函数
  const updateFn = (data) => {
    const preOption = instance.getOption();
    preOption.series[0].data = data;
    instance.setOption(preOption);
  };
  const option = {
    backgroundColor: _style.backgroundColor,
    title: {
      text: 'default title',
      subtext: 'default subtitle',
      textStyle: _style.title,
      subtextStyle: _style.subtext
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical', // horizontal：水平分布、vertical：垂直分布
      left: '0',
      show: true,
      textStyle: _style.legend
    },
    series: [
      {
        name: dataName,
        type: 'pie',
        radius: radius,
        data: data,
        emphasis: { // 悬停在板块
          // 板块的样式
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          },
          // 标注标签的样式
          label: label.hover
        },
        center: center,
        label: label,
        avoidLabelOverlap: true,
        ...piePos,
      }
    ],
  };
  // 空心饼图
  if (Array.isArray(radius) && radius[0] != radius[1]) {
    // 清除阴影
    option.series[0].emphasis = {};
  }
  // 模块边框
  if (_style.module.hasBorder) {
    option.series[0].itemStyle = _style.module;
  }
  // 标题
  if (title) {
    option.title = { ...option.title, ...title };
    // 标题位置
    title.textAlignX && (option.title.left = title.textAlignX);
    title.textAlignY && (option.title.top = title.textAlignY);
  }
  // 图例
  if (legend) {
    legend.left && (delete option.legend.right);
    legend.right && (delete option.legend.left);
    option.legend = { ...option.legend, ...legend };
  }
  // 需要强制所有标签放在中心位置,关闭 防止标签重叠策略
  if (label.position && label.position == 'center') {
    option.series[0].avoidLabelOverlap = false;
  }


  return { option: option, fn: updateFn };
}

// 生成 柱状图 options
function getBarOption({
  title = {},
  legend = {},
  data = [],
  xAxisData = [],
  style = {},
  axisUnit = { x: '', y: '' },
  limitLines = {},
  splitLine = {
    x: {
      show: false,
      lineStyle: {
        color: ['#7e8fa1']
      }
    }, y: {
      show: true,
      lineStyle: {
        color: ['#7e8fa1']
      }
    }
  },
  isCross = false,
  markPoint = {
    showMax: false,
    showMin: false,
  }
}, instance) {
  const _style = specAssign(preConfig.barStyle, style);
  const legendArr = data.map((item) => item['name']) || [];

  const option = {
    backgroundColor: _style.backgroundColor,
    title: {
      text: 'default title',
      show: true,
      textStyle: _style.title,
    },
    legend: {
      data: legendArr,
      show: true,
      textStyle: _style.legend,
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: _style.hover
      }
    },
    xAxis: {
      type: 'category',
      data: xAxisData,
      show: _style.xAxisStyle.show,
      axisLine: {
        lineStyle: _style.xAxisStyle,
      },
      axisTick: {
        show: _style.xAxisStyle.showScale,
        inside: _style.xAxisStyle.isScaleInside,
      },
      axisLabel: {
        formatter: '{value}' + axisUnit.x,
        rotate: _style.xAxisStyle.rotate
      },
      splitLine: splitLine.x,
    },
    yAxis: {
      type: 'value',
      show: _style.yAxisStyle.show,
      axisLine: {
        lineStyle: _style.yAxisStyle,
        show: _style.yAxisStyle.showLine,
      },
      axisLabel: {
        formatter: '{value}' + axisUnit.y
      },
      splitLine: splitLine.y,
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    series: data.map(item => {
      return {
        ...item,
        type: 'bar',
        showBackground: _style.showBackground,
        backgroundStyle: _style.backgroundStyle,
        barWidth: _style.barWidth
      }
    })
  };
  // 标题
  if (title) {
    option.title = { ...option.title, ...title };
    // 标题位置
    title.textAlign && (option.title.left = title.textAlign);
  }
  // 图例
  if (legend) {
    option.legend = { ...option.legend, ...legend };
    // 图例位置
    legend.textAlign && (option.legend.left = legend.textAlign);
  }
  // 最大 / 最小 线
  if (limitLines.lines && limitLines.lines.length > 0) {
    option.series = option.series.map((item) => {
      const _markPoint = { data: [] };
      if (markPoint.showMax) {
        _markPoint.data.push({ type: 'max', name: 'Max' });
      }
      if (markPoint.showMin) {
        _markPoint.data.push({ type: 'min', name: 'Min' });
      }
      if (isCross) {
        _markPoint.symbolRotate = '-90';
        !_markPoint.label && (_markPoint.label = {})
        _markPoint.label.position = 'insideRight'
      }
      return {
        ...item,
        markLine: {
          silent: false, // 是否响应鼠标
          data: limitLines.lines.map((line) => ({
            type: 'line',
            yAxis: line.value,
            label: { show: true, formatter: '{b}' },
            name: line.label || 'default name',
          })),
          lineStyle: limitLines.style,
        },
        markPoint: _markPoint
      };
    });
  }

  if (isCross) {
    const bakXaxis = JSON.parse(JSON.stringify(option.xAxis));
    option.xAxis = JSON.parse(JSON.stringify(option.yAxis));
    option.yAxis = bakXaxis;
  }
  // 更新函数
  const updateFn = (data, xAxisData) => {

    const preOption = instance.getOption();
    const exampleObj = preOption.series[0];
    const newArr = data.map(item => ({
      ...exampleObj,
      ...item
    }))
    const newOption = { series: newArr }
    if (preOption.xAxis[0].type == 'category') {
      newOption.xAxis = {
        data: xAxisData,
      }
    } else if (preOption.xAxis[0].type == 'value') {
      newOption.yAxis = {
        data: xAxisData,
      }
    }
    instance.setOption(newOption);
  };
  return { option: option, fn: updateFn };
}
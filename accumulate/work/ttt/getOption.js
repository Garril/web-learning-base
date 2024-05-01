// 预设样式
const preConfig = {
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
  }
};
// 生成 折线图 options
function getStackedLineOption({
  title = {},
  legend = {},
  limitLines = {},
  splitLine = { x: { show: false }, y: { show: true } },
  splitArea = { x: { show: false }, y: { show: false } },
  axisUnit = { x: '', y: '' },
  data = [],
  xAxisData = [],
  color = [],
  download = false,
  isStackedArea = false,
  isTimeBy = false,
  style = preConfig.stackedLineStyle
}, instance = null) {
  const legendArr = data.map((item) => item['name']) || [];

  const option = {
    backgroundColor: style.backgroundColor,
    title: {
      text: 'default title',
      show: true,
      textStyle: style.title,
    },
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: legendArr,
      show: true,
      textStyle: style.legend,
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
      show: style.xAxisStyle.show,
      axisLine: {
        lineStyle: style.xAxisStyle,
      },
      axisTick: {
        show: style.xAxisStyle.showScale,
        inside: style.xAxisStyle.isScaleInside,
      },
      splitLine: splitLine.x,
      splitArea: splitArea.x,
      axisLabel: {
        formatter: '{value}' + axisUnit.x,
        rotate: style.xAxisStyle.rotate
      }
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value}' + axisUnit.y
      },
      show: style.yAxisStyle.show,
      axisLine: {
        lineStyle: style.yAxisStyle,
        show: style.yAxisStyle.showLine,
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


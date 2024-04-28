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
  style = preConfig.stackedLineStyle,
}) {
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
  // 是否随时间变化
  if (!isTimeBy) {
    option.series = data.map((item) => {
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
    })
  } else {
    option.series.push({
      name: 'MyData',
      type: 'line',
      showSymbol: false,
      data: data
    })
    option.xAxis.type = 'time';
    option.xAxis.splitLine.show = false;
    option.yAxis.boundaryGap = [0, '100%'];
    option.yAxis.splitLine.show = true;
    // formatter: function(value, index) {
    //   const date1 = new Date(value);
    //   const str = date1.toTimeString().substr(0,8);
    //   return str;
    // },
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

  return option;
}


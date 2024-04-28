// V8/Components/echart/echart.js

const app = getApp()
const Iui = require("../../utils/Iui");
import {
  V8Module
} from "../../../V8ModuleCfg";
import {
  closePage
} from "../../utils/Iui";
var echarts;
if (V8Module.Echart) {
  echarts = require('../../../userV8/module/echarts/echarts');
}

Component({
  options: {
    addGlobalClass: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    attrParam: {
      type: Object,
      value: {}
    },
    //如果内嵌在列表中，这个表示其所在的数据行号
    rowIndex: {
      type: Number,
      value: -1
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    ec: {
      onInit: null
    },
    chart: null,
    inited: false,
    eName: '',
    cName: '',
    eType: '',
    style: {},
    hidden: false, //配合hideEle
    hideEle: '', //是否隐藏
    rowIndex: -1, //如果内嵌在列表中，这个表示其所在的数据行号
    defaultValue: '',
    colnms: [], //查询的列名
    queryUri: '', //查询号
    queryData: [], //查询号的数据
    xAxisArr: [], // 第二列
    showLabel: true, // 是否显示标签 ---> 不含标签;
  },
  // 页面被展示
  pageLifetimes: {
    show: function () {},
    // 页面被隐藏
    hide: function () {
      //console.log('echart hide -> ');
    },
    // 页面尺寸变化
    resize: function (size) {
      //console.log('echart resize -> ');
    }
  },
  lifetimes: {
    // 在组件初始化时
    attached: function () {
      if (!this.data.inited) {
        this.setData(this.data.attrParam);
        this.setData(this.data.rowIndex);
      }
      if (!echarts) {
        console.log('错误：echarts.js没引用~~~~~')
      } else {
        console.log('echart init -> ', this.data.eName, this.data.attrParam);
      }
      this.page = Iui.getCurrPage();
    },
    // 在组件被销毁时
    detached: function () {
      // console.log('echart destroy -> ');
    },
  },
  ready: function () {
    // console.log(echarts)
    this._create();
    this.data.inited = true;
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 初始化组件
    _create: function () {
      var that = this;
      that.setData({
        ec: {
          onInit: that.initChart
        }
      });
      if (this.data.hideEle.length > 0) {
        this.hideEle();
      }
    },
    hideEle: function () {
      Iui.hideEle(this, this.data.hideEle);
    },
    /**
     * 初始化ec-canvas
     * @param {} canvas
     * @param {*} width
     * @param {*} height
     * @param {*} dpr
     */
    initChart: function (canvas, width, height, dpr) {
      var widget = Iui.getIuiWidgetById(Iui.getOneWidget(), canvas.canvasId.replace('canvas-', ''));
      if (widget.data.parent && widget.data.parent != '') {
        var pWidget = Iui.getIuiWidgetById(Iui.getOneWidget(), widget.data.parent);
        if ('tmpChartIndex' in pWidget.data) {
          pWidget.data.tmpChartIndex++;
        } else {
          pWidget.data.tmpChartIndex = 0;
        }
        Iui.setParamInPage(pWidget, {
          'V8RowIndex_sql_equal': pWidget.data.tmpChartIndex
        });
        widget = Iui.getIuiWidgetById(Iui.getOneWidget(), canvas.canvasId.replace('canvas-', ''));
      }
      var chart;
      var count = setInterval(function () {
        chart = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: dpr // new
        });
        console.log('init == ', chart, width, height, dpr, canvas, echarts)
        if (chart) {
          canvas.setChart(chart);
          widget.chart = chart;
          widget.refreshMySelf({});
          clearInterval(count);
          return;
        }
      }, 200);
      return chart;
    },
    /**
     * 获取公共属性
     */
    getCommonProp: function () {
      var prop = {},
        that = this;
      if (this.data.legend) {
        // 图例
        prop['legend'] = this.data.legend;
        var legendData = [];
        for (var i = 0; i < this.data.queryData.length; i++) {
          legendData.push(this.data.queryData[i][this.data.colnms[1]])
        }
        prop['legend']['data'] = legendData;
        // web 端的 formatter 是用 eval 实现的, 小程序不能用, 换一种写法
        // 图例:[formatter=表达式:{列名}xxx{列名}];
        if (this.data.legend.formatter && typeof this.data.legend.formatter != 'function'&& this.data.legend.formatter.includes('表达式:')) {
          var formatter = this.data.legend.formatter.replace('表达式:', '');
          prop.legend.formatter = function (name) {
            var colnms = Object.keys(that.data.queryData[0]);
            var curData = that.data.queryData.filter(function (item) {
              return item[colnms[1]] == name
            });
            var f = formatter;
            var ifDeath = 0;
            while (f.includes('{') && f.includes('}')) {
              if (ifDeath++ > 10) {
                break;
              }
              var colnm = Iui.getValbyRangeStr(f, '{', '}');
              if (colnms.indexOf(colnm) == -1) {
                console.log('图例没有找到列 ' + colnm + ' !');
                break;
              }
              f = f.replace('{' + colnm + '}', curData[0][colnm]);
            }
            return f;
          }
        }
      }
      // 图表标题
      if (this.data.title) {
        for(const key in this.data.title) {
          let val = this.data.title[key];
          if(typeof val == 'string' && val.indexOf(".当前行_") > -1) {
            val = Iui.dealWithParentParam(this, val);
            this.data.title[key] = val;
          }
        }
        prop['title'] = this.data.title;
      }
      return prop;
    },
    /*
      处理标签样式
    */
    dealWithLabelStyle: function (prop) {
      if (this.data.itemStyle && this.data.itemStyle.normal) {
        const label = this.data.itemStyle.normal.label || {};
        const labelLine = this.data.itemStyle.normal.labelLine || {};
        prop.series[0]['label'] = {
          ...label.textStyle,
          ...label
        };
        prop.series[0]['labelLine'] = prop.series[0]['labelLine'] ? Object.assign(prop.series[0]['labelLine'], {
          show: labelLine.show
        }) : {
          show: labelLine.show
        };
        return prop;
      }
      return prop;
    },
    /*
      多线、多柱的数据格式化获取
    */
    getMultiPicFormatData: function (qData, colnms) {
      let prop = {
        series: []
      }
      // 数组: 需要显示的线的name
      const lineType = colnms.slice(2);
      // 数组: 主轴(一般为x轴)的数据
      const displayClass = [];
      // map: 为了只遍历一遍请求下来的数据
      const map = new Map();
      const type = this.data.type;
      lineType.forEach(function (name) {
        const obj = {
          name: name,
          type: type,
          data: []
        };
        map.set(name, obj);
      })
      // 遍历请求到的数据,生成格式化数据,丢到map
      qData.forEach(function (data) {
        displayClass.push(data[colnms[1]]);
        lineType.forEach(function (name, index) {
          map.get(name).data.push(data[name])
        })
      })
      // 将数据丢入prop
      for (const [key, value] of map) {
        prop.series.push(value);
      }
      return {
        displayClass,
        prop
      }
    },
    /**
     * 柱状图属性
     * （未完成）
     */
    getBarProp: function (qData, colnms) {
      if (this.data.type != 'bar') return {};
      // 格式化数据，写入prop
      let {
        displayClass,
        prop
      } = this.getMultiPicFormatData(qData, colnms);
      const initProp = {
        xAxis: {
          type: 'category',
          data: displayClass
        },
        yAxis: {
          type: 'value'
        }
      }
      // 规范化请求的数据到prop
      Object.assign(prop, initProp);
      // 其他属性
      // 标签样式
      prop = this.dealWithLabelStyle(prop);
      // 图例颜色
      if (this.data.chartColor) {
        const colorArr = this.data.chartColor.split(',');
        prop.series.forEach(function (item, index) {
          const curStyle = item.itemStyle || {};
          curStyle['color'] = colorArr[index];
          item.itemStyle = curStyle;
        })
      }
      // 堆积
      if (this.data.stack && this.data.stack.length != 0) {
        // 将 key:列名 -> value:堆积名称 保存到map中
        const dzMap = new Map();
        this.data.stack.forEach(function (node) {
          // 获取堆积名称
          const stackName = Object.keys(node)[0];
          // 遍历堆积对应的列名
          node[stackName].forEach(function (columnName) {
            dzMap.set(columnName, stackName);
          })
        })
        // 给prop设置
        prop.series.forEach(function (item) {
          const stackName = dzMap.get(item.name);
          if (stackName) {
            item['stack'] = stackName;
          }
        })
      }
      return prop;
    },
    /**
     * 折线图属性
     * （未完成）
     */
    getLineProp: function (qData, colnms) {
      if (this.data.type != 'line') return {};
      // 格式化数据，写入prop
      let {
        displayClass,
        prop
      } = this.getMultiPicFormatData(qData, colnms);
      // 设置x轴的值(x轴、y轴主轴设置处)
      const initProp = {
        xAxis: {
          type: 'category',
          data: displayClass
        },
        yAxis: {
          type: 'value'
        }
      }
      // 规范化请求的数据到prop
      Object.assign(prop, initProp);
      // 处理其他属性
      // 标签样式
      prop = this.dealWithLabelStyle(prop);
      // 图例颜色
      if (this.data.chartColor) {
        const colorArr = this.data.chartColor.split(',');
        prop.series.forEach(function (item, index) {
          const curStyle = item.itemStyle || {};
          curStyle['color'] = colorArr[index];
          item.itemStyle = curStyle;
        })
      }
      return prop;
    },
    /**
     * 饼图属性
     */
    getPieProp: function (qData, colnms) {
      if (this.data.type != 'pie') return {};
      let prop = {
        // 这里的name为：pie图各块hover时显示的值上面的标题
        series: [{
          name: '值',
          type: this.data.type
        }]
      }
      // pie图的展示数据
      const pieData = [];
      // 数组： echart显示的、作为分类类比的值，通常为请求数据的第二列
      const displayClass = [];
      for (var i = 0; i < qData.length; i++) {
        displayClass.push(qData[i][colnms[1]]);
        pieData.push({
          key: qData[i][colnms[0]],
          name: qData[i][colnms[1]],
          value: qData[i][colnms[2]],
        })
      }
      prop.series[0]['data'] = pieData;
      // 配置其他属性
      // 圆中心坐标
      if (this.data.pieCenter) {
        prop.series[0]['center'] = this.data.pieCenter
      }
      if (this.data.pieRadius) {
        prop.series[0]['radius'] = this.data.pieRadius
      }
      // 开始角度
      if (this.data.startAngle) {
        prop.series[0]['startAngle'] = this.data.startAngle
      }
      // 顺/逆时针
      if (this.data.showDirection) {
        prop.series[0]['clockwise'] = !!parseInt(this.data.clockWise);
      }
      // 标签线
      if (this.data.labelLine) {
        prop.series[0]['labelLine'] = {
          ...this.data.labelLine.normal,
          show: this.data.labelLine.show
        }
      }
      // 标签样式
      prop = this.dealWithLabelStyle(prop);
      // -- 宽度太小文字可能不显示，label的width和overflow估计可以做。目前没解析
      // 图例颜色
      if (this.data.chartColor) {
        const colorArr = this.data.chartColor.split(',');
        prop.series[0].data.forEach(function (item, index) {
          const curStyle = item.itemStyle || {};
          curStyle['color'] = colorArr[index];
          item.itemStyle = curStyle;
        })
      }
      // 不含标签
      if (!this.data.showLabel) {
        const labelObj = prop.series[0]['label'] || {};
        labelObj.show = false;
        prop.series[0]['label'] = labelObj;
      }
      return prop;
    },
    /**
     * 获取echart图最终的option
     */
    getOption: function () {
      // 对象: 通用配置项初始化
      var option = this.getCommonProp();
      // 数组: 请求数据
      var qData = this.data.queryData;
      // 数组: 请求数据中，所有的列名
      var colnms = this.data.colnms;
      // 根据this.data.type进行option的细化
      option = Iui.extend(option, this.getPieProp(qData, colnms));
      option = Iui.extend(option, this.getBarProp(qData, colnms));
      option = Iui.extend(option, this.getLineProp(qData, colnms));
      console.log('echart option： ' + this.data.eName, option);
      // option.tooltip =  {
      //   trigger: 'item'
      // };
      // this.chart.dispatchAction({
      //   type: 'highlight',
      //   seriesIndex: 0,
      //   dataIndex: 1
      // });
      return option;
    },
    /**
     * 自身刷新，一般都是被别的控件调用
     */
    refreshMySelf: function (param, callback) {
      var that = this;
      if (this.data.queryUri.startsWith('@')) {
        var dataJ = {
          mask: false,
          queryId: this.data.queryUri.replace('@', '')
        };
        dataJ = Iui.extend(dataJ, param);
        Iui.commonQuery(this, dataJ, function (res, isSucc) {
          if (!isSucc || res.data.length == 0)
            return;
          //设置列名
          let colnms = that.data.colnms;
          const curSet = new Set(colnms);
          for (var key in res.data[0]) {
            curSet.add(key);
          }
          colnms = Array.from(curSet);
          that.setData({
            colnms: colnms,
            queryData: res.data
          })
          that.chart && that.chart.setOption(that.getOption());
          if (callback) {
            callback();
          }
        });
      }
    },
    // 点击事件
    onClick: function () {
      //登录验证
      if (!Iui.wxLogin(this)) {
        return;
      }
    }
  }
})
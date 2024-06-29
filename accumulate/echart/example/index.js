window.onload = function () {
  const chartDom1 = document.getElementById('main1');
  const myChart1 = echarts.init(chartDom1);
  let res;
  res = getStackedLineOption(lineBaseOption, myChart1);
  let { option: option1, fn: fn1 } = res;
  option1 && myChart1.setOption(option1);

  const chartDom2 = document.getElementById('main2');
  const myChart2 = echarts.init(chartDom2);
  res = getStackedLineOption(memoryUsage, myChart2);
  let { option: option2, fn: fn2 } = res;
  option2 && myChart2.setOption(option2);


  // 假设这里的折线图，用的数据就是 
  const chartDom3 = document.getElementById('main3');
  const myChart3 = echarts.init(chartDom3);
  res = getStackedLineOption(timeByOption, myChart3);
  let { option: option3, fn: fn3 } = res;
  option3 && myChart3.setOption(option3);

  // 假设 5s 重新请求，刷新一次
  setInterval(function () {
    timeByData.shift(); // 删除数组首项（最早的数据）
    timeByData.push(randomData()); // 加入新数据到数组中
    fn3(timeByData); // 更新
  }, 5000);

  const chartDom4 = document.getElementById('main4');
  const myChart4 = echarts.init(chartDom4);
  res = getPieOption(pieBaseOption, myChart4);
  let { option: option4, fn: fn4 } = res;
  option4 && myChart4.setOption(option4);
  const newdata4 = [
    { value: 111, name: 'test1' },
    { value: 222, name: 'test2' },
    { value: 333, name: 'test3' },
    { value: 444, name: 'test4' },
    { value: 555, name: 'test5' },
  ];
  fn4(newdata4);


  const chartDom5 = document.getElementById('main5');
  const myChart5 = echarts.init(chartDom5);
  res = getPieOption(hollowPieBaseOption, myChart5);
  let { option: option5, fn: fn5 } = res;
  option5 && myChart5.setOption(option5);

  const chartDom6 = document.getElementById('main6');
  const myChart6 = echarts.init(chartDom6);
  res = getBarOption(barBaseOption, myChart6);
  let { option: option6, fn: fn6 } = res;
  option6 && myChart6.setOption(option6);


  const chartDom7 = document.getElementById('main7');
  const myChart7 = echarts.init(chartDom7);
  res = getBarOption(barCrossOption, myChart7);
  let { option: option7, fn: fn7 } = res;
  option7 && myChart7.setOption(option7);

  setTimeout(function () {
    const xAxisData = ['t0', 't1', 't2', 't3', 't4'];
    const data = [
      {
        name: 'test1',
        data: [150, 232, 201, 154, 190],
      },
      {
        name: 'test2',
        data: [320, 332, 301, 334, 390],
      }
    ];
    fn7(data, xAxisData);
  }, 2000);

}
window.onload = function () {
  const chartDom1 = document.getElementById('main1');
  const myChart1 = echarts.init(chartDom1);
  let res;
  res = getStackedLineOption(centosMonitorData.cpuUsedRate, myChart1);
  let { option: option1, fn: fn1 } = res;
  option1 && myChart1.setOption(option1);

  const chartDom2 = document.getElementById('main2');
  const myChart2 = echarts.init(chartDom2);
  res = getStackedLineOption(centosMonitorData.memoryUsedRate, myChart2);
  let { option: option2, fn: fn2 } = res;
  option2 && myChart2.setOption(option2);


  const chartDom3 = document.getElementById('main3');
  const myChart3 = echarts.init(chartDom3);
  res = getPieOption(centosMonitorData.memoryUsedVal, myChart3);
  let { option: option3, fn: fn3 } = res;
  option3 && myChart3.setOption(option3);

  // // 假设 5s 重新请求，刷新一次
  // setInterval(function () {
  //   // mockData为当前饼图展示的数据。是对象数组，每一项含有属性name和value
  //   mockData.shift(); // 删除数组首项（最早的数据）
  //   mockData.push(randomData()); // 加入新数据到数组中
  //   fn3(mockData); // 更新饼图的数据
  // }, 5000);



  const chartDom4 = document.getElementById('main4');
  const myChart4 = echarts.init(chartDom4);
  res = getStackedLineOption(centosMonitorData.diskUsedRate, myChart4);
  let { option: option4, fn: fn4 } = res;
  option4 && myChart4.setOption(option4);

    // 假设 5s 重新请求，刷新一次
    setInterval(function () {
      // xMockData是当前折线图的x轴的数据，是时间，格式类似于："18:30:22"
      // yMockData为当前折线图的y轴展示的数据。是保存数字的数组
      xMockData.shift();yMockData.shift(); // 删除数组首项（最早的数据）
      xMockData.push(randomDataX());
      yMockData.push(randomDataY()); // 加入新数据到数组中
      fn4(xMockData,yMockData); // 更新折线图的数据
    }, 5000);


  const chartDom5 = document.getElementById('main5');
  const myChart5 = echarts.init(chartDom5);
  res = getPieOption(centosMonitorData.diskLeave, myChart5);
  let { option: option5, fn: fn5 } = res;
  option5 && myChart5.setOption(option5);



  const chartDom6 = document.getElementById('main6');
  const myChart6 = echarts.init(chartDom6);
  res = getStackedLineOption(centosMonitorData.activeProcesses, myChart6);
  let { option: option6, fn: fn6 } = res;
  option6 && myChart6.setOption(option6);


  const chartDom7 = document.getElementById('main7');
  const myChart7 = echarts.init(chartDom7);
  res = getPieOption(windowsMonitorData.memoryUsedVal, myChart7);
  let { option: option7, fn: fn7 } = res;
  option7 && myChart7.setOption(option7);


  const chartDom8 = document.getElementById('main8');
  const myChart8 = echarts.init(chartDom8);
  res = getStackedLineOption(windowsMonitorData.diskUsedRate, myChart8);
  let { option: option8, fn: fn8 } = res;
  option8 && myChart8.setOption(option8);



  const chartDom9 = document.getElementById('main9');
  const myChart9 = echarts.init(chartDom9);
  res = getPieOption(windowsMonitorData.diskLeave, myChart9);
  let { option: option9, fn: fn9 } = res;
  option9 && myChart9.setOption(option9);

  const chartDom10 = document.getElementById('main10');
  const myChart10 = echarts.init(chartDom10);
  res = getStackedLineOption(windowsMonitorData.processorProcesses, myChart10);
  let { option: option10, fn: fn10 } = res;
  option10 && myChart10.setOption(option10);



  const chartDom11 = document.getElementById('main11');
  const myChart11 = echarts.init(chartDom11);
  res = getStackedLineOption(windowsMonitorData.cpuHZ, myChart11);
  let { option: option11, fn: fn11 } = res;
  option11 && myChart11.setOption(option11);


  const chartDom12 = document.getElementById('main12');
  const myChart12 = echarts.init(chartDom12);
  res = getStackedLineOption(windowsMonitorData.dealProcesses, myChart12);
  let { option: option12, fn: fn12 } = res;
  option12 && myChart12.setOption(option12);


  const chartDom13 = document.getElementById('main13');
  const myChart13 = echarts.init(chartDom13);
  res = getStackedLineOption(windowsMonitorData.networkBandWidth, myChart13);
  let { option: option13, fn: fn13 } = res;
  option13 && myChart13.setOption(option13);


  const chartDom14 = document.getElementById('main14');
  const myChart14 = echarts.init(chartDom14);
  res = getPieOption(centosMonitorMemory, myChart14);
  let { option: option14, fn: fn14 } = res;
  option14 && myChart14.setOption(option14);

  const chartDom15 = document.getElementById('main15');
  const myChart15 = echarts.init(chartDom15);
  res = getPieOption(centosMonitorDisk, myChart15);
  let { option: option15, fn: fn15 } = res;
  option15 && myChart15.setOption(option15);

}
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


  const chartDom3 = document.getElementById('main3');
  const myChart3 = echarts.init(chartDom3);
  res = (getStackedLineOption(timeByOption, myChart3));
  let { option: option3, fn: fn3 } = res;
  option3 && myChart3.setOption(option3);

  // 假设 5s 重新请求，刷新一次
  setInterval(function () {
    timeByData.shift();
    timeByData.push(randomData());
    fn3(timeByData);
  }, 5000);
}
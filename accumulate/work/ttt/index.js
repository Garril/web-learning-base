window.onload = function () {
  const chartDom1 = document.getElementById('main1');
  const myChart1 = echarts.init(chartDom1);
  let option;
  option = getStackedLineOption(lineBaseOption);
  option && myChart1.setOption(option);

  const chartDom2 = document.getElementById('main2');
  const myChart2 = echarts.init(chartDom2);
  option = getStackedLineOption(memoryUsage);
  option && myChart2.setOption(option);


  const chartDom3 = document.getElementById('main3');
  const myChart3 = echarts.init(chartDom3);
  option = getStackedLineOption(timeByOption);
  option && myChart3.setOption(option);

  // setInterval(function () {
  //   const option = myChart1.getOption();
  //   option.series = option.series.map(function (item) {
  //   })
  // }, 2000);
}
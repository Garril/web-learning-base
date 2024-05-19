// 生成时间
function createTimeArr(second = 60) {
  // 生成数组
  const timeArray = [];
  const now = new Date();

  // 获取当前时间的小时和分钟
  let currentHour = now.getHours();
  let currentMinute = now.getMinutes();
  let currentSecond = now.getSeconds();

  // 循环生成时间
  for (let i = 0; i < 200; i++) {
    let time = new Date(now.getTime() - i * second * 1000);
    let newHour = time.getHours();
    let newMinute = time.getMinutes();
    let newSecond = time.getSeconds();
    const formattedTime = `${String(newHour).padStart(2, '0')}:${String(
      newMinute,
    ).padStart(2, '0')}:${String(newSecond).padStart(2, '0')}`;
    timeArray.unshift(formattedTime);
  }

  return timeArray;
}

function getFormatTime(date = new Date()) {
  var month = (date.getMonth() + 1).toString().padStart(2, '0'); // 获取月份并补零
  var day = date.getDate().toString().padStart(2, '0'); // 获取日期并补零
  var hours = date.getHours().toString().padStart(2, '0'); // 获取小时并补零
  var minutes = date.getMinutes().toString().padStart(2, '0'); // 获取分钟并补零
  return month + '-' + day + ' ' + hours + ':' + minutes; // 返回格式化后的日期时间字符串
}

// 生成CPU利用率
function generateStableCPUUsageArray(length = 200) {
  const cpuUsageArray = [];
  let previousUsage = 50; // 初始CPU利用率设为50%

  for (let i = 0; i < length; i++) {
    // 在前一时间点的基础上进行微小波动
    const minChange = -5; // 最小负向变化
    const maxChange = 5; // 最大正向变化
    const randomChange = Math.random() * (maxChange - minChange) + minChange;
    let currentUsage = previousUsage + randomChange;

    // 限制 CPU 利用率在 0% 到 100% 之间
    if (currentUsage < 0) {
      currentUsage = 0;
    } else if (currentUsage > 100) {
      currentUsage = 100;
    }

    cpuUsageArray.push(Math.round(currentUsage)); // 四舍五入取整

    previousUsage = currentUsage; // 更新前一时间点的 CPU 利用率
  }

  return cpuUsageArray;
}

// 生成物理内存使用率
function generateStableMemoryUsageArray(length) {
  const memoryUsageArray = [];
  let previousUsage = 70; // 初始内存利用率设为60%

  for (let i = 0; i < length; i++) {
    // 在前一时间点的基础上进行微小波动
    const minChange = -1; // 最小负向变化
    const maxChange = 1; // 最大正向变化
    const randomChange = Math.random() * (maxChange - minChange) + minChange;
    let currentUsage = previousUsage + randomChange;

    // 限制内存利用率在 0% 到 100% 之间
    if (currentUsage < 0) {
      currentUsage = 0;
    } else if (currentUsage > 100) {
      currentUsage = 100;
    }

    memoryUsageArray.push(Math.round(currentUsage)); // 四舍五入取整

    previousUsage = currentUsage; // 更新前一时间点的内存利用率
  }

  return memoryUsageArray;
}

const minArr = createTimeArr(60);
const fiveMinArr = createTimeArr(60 * 50);
console.log(minArr);
console.log(fiveMinArr);

// 生成活动进程数目
function generateSmoothedActiveProcessData(count) {
  const activeProcessData = [];
  let totalProcessCount = 0;

  for (let i = 0; i < count; i++) {
    // 模拟活动进程数量在50到150之间波动
    const processCount = Math.floor(Math.random() * 101) + 50;

    // 使用移动平均值来减少波动
    totalProcessCount += processCount;
    const smoothedCount = Math.round(totalProcessCount / (i + 1));

    // 生成时间戳，这里简化为从1到200的整数，代表每5分钟一次的采集
    const timestamp = i + 1;

    activeProcessData.push({ timestamp, count: smoothedCount });
  }

  return activeProcessData;
}

// window 服务器进程数
function generateWindowsProcessData(count) {
  const windowsProcessData = {
    activeProcesses: [],
    idleProcesses: [],
    systemProcesses: [],
    totalProcesses: []
  };
  let activeProcesses = 150;
  let idleProcesses = 40;
  let systemProcesses = 10;

  for (let i = 0; i < count; i++) {
    activeProcesses += Math.floor(Math.random() * 5) - 2;
    idleProcesses += Math.floor(Math.random() * 5) - 2;
    systemProcesses += Math.floor(Math.random() * 5) - 2;

    activeProcesses = Math.max(0, activeProcesses);
    idleProcesses = Math.max(0, idleProcesses);
    systemProcesses = Math.max(0, systemProcesses);

    const totalProcesses = activeProcesses + idleProcesses + systemProcesses;

    windowsProcessData.activeProcesses.push(activeProcesses);
    windowsProcessData.idleProcesses.push(idleProcesses);
    windowsProcessData.systemProcesses.push(systemProcesses);
    windowsProcessData.totalProcesses.push(totalProcesses);
  }

  // 活动进程、空闲进程、系统进程、总和
  return [
    { name: '活动进程', data: windowsProcessData.activeProcesses },
    { name: '空闲进程', data: windowsProcessData.idleProcesses },
    { name: '系统进程', data: windowsProcessData.systemProcesses },
    { name: '总进程数量', data: windowsProcessData.totalProcesses }
  ];
}

// 生成CPU频率数据
function generateCPURateData(count) {
  const cpuRateData = {
    '2.0GHz': [],
    '2.5GHz': [],
    '3.0GHz': [],
    '3.5GHz': []
  };

  // 初始化每种频率的初始值
  let initialRates = {
    '2.0GHz': 2000,
    '2.5GHz': 2500,
    '3.0GHz': 3000,
    '3.5GHz': 3500
  };

  // 模拟每种频率在不同时间的变化
  for (let i = 0; i < count; i++) {
    for (let rate in initialRates) {
      // 在实际情况下，可根据需要自行调整随机性变化范围
      let randomChange = (Math.floor(Math.random() * 21) - 10) / 10; // 随机变化范围在 -1 到 1 之间，可根据实际情况调整
      initialRates[rate] = Math.max(1000, Math.min(4000, initialRates[rate] + randomChange * 1000)); // 数据在 1.0GHz 到 4.0GHz 之间
      cpuRateData[rate].push(initialRates[rate]);
    }
  }

  return Object.keys(cpuRateData).map(item => {
    return {
      name: item,
      data: cpuRateData[item]
    };
  });
}

// 生成处理器进程数
function generateSmoothProcessorProcessData(count) {
  const processorProcessData = {
    userProcesses: [],
    systemProcesses: [],
    serviceProcesses: [],
    totalProcesses: []
  };

  let userProcesses = Math.floor(Math.random() * 50) + 100; // 设置初始用户进程数在 100 到 150 之间
  let systemProcesses = Math.floor(Math.random() * 10) + 20; // 设置初始系统进程数在 20 到 30 之间
  let serviceProcesses = Math.floor(Math.random() * 10) + 10; // 设置初始服务进程数在 10 到 20 之间

  for (let i = 0; i < count; i++) {
    // 在前一次的基础上微调，使数据更平稳
    userProcesses += Math.floor(Math.random() * 3) - 1; // 用户进程数每次变化在 -1 到 2 之间
    systemProcesses += Math.floor(Math.random() * 2) - 1; // 系统进程数每次变化在 -1 到 1 之间
    serviceProcesses += Math.floor(Math.random() * 2); // 服务进程数每次变化在 0 到 1 之间

    // 确保数据不会小于零
    userProcesses = Math.max(50, userProcesses);
    systemProcesses = Math.max(10, systemProcesses);
    serviceProcesses = Math.max(5, serviceProcesses);

    const totalProcesses = userProcesses + systemProcesses + serviceProcesses;

    processorProcessData.userProcesses.push(userProcesses);
    processorProcessData.systemProcesses.push(systemProcesses);
    processorProcessData.serviceProcesses.push(serviceProcesses);
    processorProcessData.totalProcesses.push(totalProcesses);
  }

  return [
    { name: '用户进程', data: processorProcessData.userProcesses },
    { name: '系统进程', data: processorProcessData.systemProcesses },
    { name: '服务进程', data: processorProcessData.serviceProcesses },
    { name: '总进程数量', data: processorProcessData.totalProcesses }
  ];
}


// 网络带宽
function generateNetworkBandwidthData(count) {
  const networkBandwidthData = [];

  for (let i = 0; i < count; i++) {
    // 模拟正常的4G网络下的网络带宽使用情况
    // 这里的数据可以根据真实的网络带宽情况进行调整
    const bandwidth = Math.floor(Math.random() * 80); // 网络带宽在 20 Mbps 到 100 Mbps 之间

    networkBandwidthData.push(bandwidth);
  }

  return { name: '网络带宽', data: networkBandwidthData };
}

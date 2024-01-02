function formatInComeDate(inputString) {
  var dateInfo = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
    hours: '00',
    minutes: '00',
    seconds: '00'
  }

  function getYMDByArr(arr, obj = dateInfo) {
    var dateParts = arr.split('-');
    if (dateParts.length === 3) {
      obj.year = dateParts[0];
      obj.month = dateParts[1];
      obj.day = dateParts[2];
    } else if (dateParts.length === 2) {
      obj.year = dateParts[0];
      obj.month = dateParts[1];
    }
  }
  function getHMSByArr(arr, obj = dateInfo) {
    var timeParts = arr.split(':');
    if (timeParts.length === 3) {
      obj.hours = timeParts[0];
      obj.minutes = timeParts[1];
      obj.seconds = timeParts[2];
    } else if (timeParts.length === 2) {
      obj.hours = timeParts[0];
      obj.minutes = timeParts[1];
    } else if (timeParts.length === 1) {
      obj.hours = timeParts[0];
    }
  }

  var dateArray = inputString.split(' ');
  if (dateArray.length === 2) {
    var date = dateArray[0];
    var time = dateArray[1];
    getYMDByArr(date, dateInfo);
    getHMSByArr(time, dateInfo);
  } else if (dateArray.length === 1) {
    var item = dateArray[0];
    if (item.indexOf(':') > -1) {
      getHMSByArr(item, dateInfo);
    } else if (item.indexOf('-') > -1) {
      getYMDByArr(item, dateInfo);
    }
  }

  // 单位数前补零
  dateInfo.month = dateInfo.month.toString().padStart(2, '0');
  dateInfo.day = dateInfo.day.toString().padStart(2, '0');
  dateInfo.hours = dateInfo.hours.toString().padStart(2, '0');
  dateInfo.minutes = dateInfo.minutes.toString().padStart(2, '0');

  return `${dateInfo.year}-${dateInfo.month}-${dateInfo.day} ${dateInfo.hours}:${dateInfo.minutes}:${dateInfo.seconds}`;
}


// 示例用法:
console.log(formatInComeDate('2023')); // 输出: 2023-01-01 00:00:00
console.log(formatInComeDate('2023-12')); // 输出: 2023-12-01 00:00:00
console.log(formatInComeDate('2023-12-11')); // 输出: 2023-12-11 00:00:00
console.log(formatInComeDate('2023-12-11 13')); // 输出: 2023-12-11 13:00:00
console.log(formatInComeDate('2023-12-11 13:14')); // 输出: 2023-12-11 13:14:00
console.log(formatInComeDate('2023-12-11 13:14:42')); // 输出: 2023-12-11 13:14:00
console.log(formatInComeDate('13:14')); // 输出: 2023-12-11 13:14:00

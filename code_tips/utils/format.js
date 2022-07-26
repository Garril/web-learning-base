// 格式化收藏、播放数量
export function getCount(count) {
  if(count < 0 || typeof count !== 'number') return;
  if(count < 10000) {
    return count;
  } else if(Math.floor(count / 10000) < 10000) { // 1万 - 1亿
    return Math.floor(count / 1000) / 10 + "万"; // 小数点取整操作
  } else {
    return Math.floor(count / 10000000) / 10 + "亿";
  }
}

// 格式化图片路径
export function getSizeImage(imgUrl, size) {
  return `${imgUrl}?param=${size}x${size}`
}


//  格式化播放时间
export function formatDate(time, fmt) {
  let date = new Date(time);

  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};



export function padLeftZero(str) {
  return ('00' + str).substr(str.length);
};

export function formatMonthDay(time) {
  return formatDate(time, "MM月dd日");
}

export function formatMinuteSecond(time) {
  return formatDate(time, "mm:ss");
} 

// 先前使用的 格式化播放时间 方法
export function formatDuration(duration) {
  duration = duration / 1000 // 毫秒先转化为秒
  // floor不是全局，Math是全局，Math内有floor
  var minute = Math.floor(duration / 60)
  var second = Math.floor(duration) % 60
  return LeftAddZero(minute) + ":" + LeftAddZero(second)
}
// 播放时间，个位数的话左边补零
function LeftAddZero(time) {
  time = time + ""
  return ("00" + time).slice(time.length)
} 
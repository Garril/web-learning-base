/**
 * 将一个时间字符串解析为数字（秒）
 * @param {String} timeStr 时间字符串
 * @returns
 */
function parseTime(timeStr) {
  var parts = timeStr.split(':');
  return +parts[0] * 60 + +parts[1];
}
/**
 * 解析歌词字符串
 * 得到一个歌词对象的数组
 * [{time:开始时间, words: 歌词内容},{...}]
 */
function parseLrc() {
  const lines = lyric.split('\n');
  // lines:Array<string> ==> [ '[00:26.40]从来不曾怀疑过 我见过', '...' ]
  const result = [];
  for (let i = 0; i < lines.length; i++) {
    const curLyric = lines[i];
    const parts = curLyric.split(']');
    var timeStr = parts[0].substring(1); // 00:26.40
    var obj = {
      time: parseTime(timeStr),
      words: parts[1],
    };
    result.push(obj);
  }
  return result;
}

export function parseLyric(lyricString) {
  const parseRegex = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/;
  const lineArr = lyricString.split("\n")
  const lyrics = [] // 结果---对象数组

  for(let line of lineArr) {
    if(line) { // 该行内容非空
      const result = parseRegex.exec(line)
      if(!result) continue;
      const min = result[1] * 60 * 1000
      const sec = result[2] * 1000
      const ms = (result[3].length === 3) ? (result[3] * 1) : ( result[3] * 10 ) // 注意都要乘法。隐式转换格式
      const addTime = min + sec + ms
      const content = line.replace(parseRegex, "").trim();
      const resObj = {
        time: addTime,
        content
      }
      lyrics.push(resObj)
    }
  }
  return lyrics
}
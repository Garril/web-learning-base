const fs = require('fs');
const csv = require('fast-csv');
const jsonminify = require('jsonminify');

let csvMap = new Map();
fs.createReadStream('./addr.csv')
  .pipe(csv.parse({ headers: true }))
  .on('data', (row) => {
    const rowId = row['编号'];
    csvMap.set(rowId, row);
  })
  .on('end', () => {
    // console.log(csvMap);
    start(csvMap);
  });
// 读取JSON文件
function start(csvMap) {
  fs.readFile('./area_all.json', 'utf8', (err, data) => {
    if (err) {
      console.error('读取文件时出错:', err);
      return;
    }
    // 将JSON数据解析为JavaScript对象
    const jsonData = JSON.parse(data);

    let res = [];
    function changeChild(arr) {
      return arr.map((item) => {
        const addrno = item['addrno'];
        const curInfo = addrno.length == 9 ? csvMap.get(addrno) : csvMap.get(addrno + '000');

        if (curInfo) {
          item['postcode'] = curInfo['邮编'] || '';
        } else {
          item['postcode'] = '';
        }
        if (item.children && item.children.length > 0) {
          item.children = changeChild(item.children);
        }
        return item;
      })
    }
    res = jsonData.map((item, index) => {
      if (item.children && item.children.length > 0) {
        item.children = changeChild(item.children);
      }
      return item;
    })

    let jsonStr = JSON.stringify(res, null, 2); // 第二个参数用于格式化输出，可选
    fs.writeFile('./output.json', jsonStr, 'utf8', (err) => {
      if (err) {
        console.error('写入文件时出错:', err);
      }
    });
    jsonStr = jsonStr.replace(/\s/g, '');
    // const resStr = jsonminify(jsonStr);
    // 将JSON字符串写入文件
    fs.writeFile('./ouput_sm.json', jsonStr, 'utf8', (err) => {
      if (err) {
        console.error('写入文件时出错:', err);
      }
    });
  });
}

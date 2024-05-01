const exceljs = require('exceljs');
const oracledb = require('oracledb');
const dbInfo = require('./constanct.js');

// 读取Excel数据
async function readExcelData() {
  const workbook = new exceljs.Workbook();
  await workbook.xlsx.readFile('./data_person.xlsx');

  const worksheet = workbook.worksheets[0];

  // 从Excel表中读取数据
  worksheet.eachRow({ includeEmpty: true }, function (row, rowNumber) {
    // 处理每一行的数据，并将其插入到Oracle数据库表中
    insertIntoOracle(row.values);
  });
}

let connection;
const myMap = new Map();
myMap.set('公司本部', '0');
myMap.set('技术支持', '003');
myMap.set('应用一部', '004');
myMap.set('应用二部', '005');
myMap.set('应用三部', '006');
myMap.set('大数据实验室', '007');
myMap.set('应用四部', '008');
myMap.set('核心开发', '009');

myMap.set('入职试用', '100');
myMap.set('应用五部', '011');
myMap.set('产品规划部', '012');
myMap.set('和益健康技术团队', '201');
myMap.set('其他', '301');
myMap.set('客服中心', '015');
myMap.set('技术推广', '010');


myMap.set('大客户部', '013');
myMap.set('应用六部', '014');
myMap.set('企管部', '001');
myMap.set('总经办', '002');
myMap.set('和益健康运营团队', '202');
myMap.set('客服部', '203');

// 连接到Oracle数据库并插入数据
async function insertIntoOracle(data) {
  try {
    const infoObj = {
      dpt: data[2] || '',
      name: data[3] || '',
      level: data[4] || '',
      comptel: data[5] || '',
      mobile: data[6] || '',
      shortnum: data[7] || '',
      email: data[8] || '',
      remark: data[9] || ''
    }
    infoObj.email = (typeof infoObj.email == 'object' && infoObj.email.text) ? infoObj.email.text : infoObj.email;
    infoObj.dpt = myMap.get(infoObj.dpt);
    /* {
        user: 'xxx',
        password: 'xxxx',
        connectString: 'xx.xx.xx.xx:yyy/mmmm'
      } */
    // connection = await oracledb.getConnection(dbInfo);

    // 根据data编写插入数据的SQL语句
    /* update KQ_TBS_CONTACTS 
      set FLEVEL = '${infoObj.level}',FCOMPANYTEL = '${infoObj.comptel}',FMOBILE = '${infoObj.mobile}',FSHORTNUM='${infoObj.shortnum}',FEMAIL = '${infoObj.email}',FREMARK = '${infoObj.remark}',FDPTNO='${infoObj.dpt}'
      where FEMPID = (select fempid from IPEMPS where FEMPNM = '${infoObj.name}' and hii.KQ_JUDGE_USER_FIFVALID(FEMPID) = 'TRUE'); */
    const sql = `
    insert into KQ_TBS_CONTACTS(fempid, fdptno, flevel, fcompanytel, fmobile, fshortnum, femail, fremark)
      (select fempid,'${infoObj.dpt}','${infoObj.level}', '${infoObj.comptel}', '${infoObj.mobile}', '${infoObj.shortnum}','${infoObj.email}','${infoObj.remark}'
        from IPEMPS
        where FEMPNM = '${infoObj.name}' 
        and hii.KQ_JUDGE_USER_FIFVALID(FEMPID) = 'TRUE');
    `;
    if (infoObj.dpt) {
      console.log(sql);
    }

    // const result = await connection.execute(sql, [], { autoCommit: true });

    // console.log("Number of rows updated:", result.rowsAffected);
  } catch (error) {
    console.error('Error inserting data:', error);
  } finally {
    // 关闭数据库连接
    // await connection.close();
  }
}

// 调用函数来读取Excel数据并插入到Oracle表中
readExcelData();

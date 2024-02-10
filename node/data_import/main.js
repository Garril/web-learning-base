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
// 连接到Oracle数据库并插入数据
async function insertIntoOracle(data) {
  try {
    const infoObj = {
      name: data[3] || '',
      level: data[4] || '',
      comptel: data[5] || '',
      mobile: data[6] || '',
      shortnum: data[7] || '',
      email: data[8] || '',
      remark: data[9] || ''
    }
    infoObj.email = (typeof infoObj.email == 'object' && infoObj.email.text) ? infoObj.email.text : infoObj.email;

    /* {
        user: 'xxx',
        password: 'xxxx',
        connectString: 'xx.xx.xx.xx:yyy/mmmm'
      } */
    connection = await oracledb.getConnection(dbInfo);
    // console.log(dbInfo);

    // 根据data编写插入数据的SQL语句
    const sql = `
    update KQ_TBS_CONTACTS 
      set FLEVEL = '${infoObj.level}',FCOMPANYTEL = '${infoObj.comptel}',FMOBILE = '${infoObj.mobile}',FSHORTNUM='${infoObj.shortnum}',FEMAIL = '${infoObj.email}',FREMARK = '${infoObj.remark}'
      where FEMPID = (select fempid from IPEMPS where FEMPNM = '${infoObj.name}' and hii.KQ_JUDGE_USER_FIFVALID(FEMPID) = 'TRUE');
    `;
    console.log(sql)
    // const result = await connection.execute(sql, [], { autoCommit: true });

    // console.log("Number of rows updated:", result.rowsAffected);
  } catch (error) {
    console.error('Error inserting data:', error);
  } finally {
    // 关闭数据库连接
    await connection.close();
  }
}

// 调用函数来读取Excel数据并插入到Oracle表中
readExcelData();

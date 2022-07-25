// 打开数据(和数据库建立连接)
// 第二个参数是版本号，如果why数据库不存在就创建，存在就打开
const dbRequest = indexedDB.open("why", 3) 
dbRequest.onerror = function(err) {
  console.log("打开数据库失败~") 
}
let db = null
dbRequest.onsuccess = function(event) {
  db = event.target.result // 成功连接后拿到的数据库对象
}
// 第一次打开/或者版本发生升级
dbRequest.onupgradeneeded = function(event) {
  const db = event.target.result

  console.log(db)

  // 创建一些存储对象 --- 数据库表
  db.createObjectStore("users", { keyPath: "id" }) // keyPath（主键）
}

class User {
  constructor(id, name, age) {
    this.id = id
    this.name = name
    this.age = age
  }
}

const users = [
  new User(100, "why", 18),
  new User(101, "kobe", 40),
  new User(102, "james", 30),
]

// 获取btns, 监听点击
const btns = document.querySelectorAll("button")
for (let i = 0; i < btns.length; i++) {
  btns[i].onclick = function() {
    const transaction = db.transaction("users", "readwrite")// 操作users表，读写模式
    console.log(transaction) // 打印 “事务”
    const store = transaction.objectStore("users") // 从事务里面拿表users的操作对象
    // 为什么还要到事务拿？
    // 因为： db.transaction(["users","operator"], "readwrite")，一个事务可能涉及多张表

    switch(i) {
      case 0:
        console.log("点击了新增")
        for (const user of users) {
          const request = store.add(user)
          request.onsuccess = function() { // 监听每一次的插入
            console.log(`${user.name}插入成功`)
          }
        }
        transaction.oncomplete = function() { // 监听全部添加完成
          console.log("添加操作全部完成")
        }
        break
      case 1:
        console.log("点击了查询")

        // 1.查询方式一(知道主键, 根据主键查询)，----查询（异步）get返回request，结果到request.onsuccess拿
        // const request = store.get(102)
        // request.onsuccess = function(event) {
        //   console.log(event.target.result)
        // }

        // 2.查询方式二:（多个查询）
        const request = store.openCursor() // 打开一个游标（可以理解为指针，从表第一行往下）
        request.onsuccess = function(event) {
          const cursor = event.target.result // 拿到游标 
          if (cursor) {
            if (cursor.key === 101) {
              console.log(cursor.key, cursor.value)
            } else {
              cursor.continue()
            }
          } else {  // 游标为空表示，遍历完表了
            console.log("查询完成")
          }
        }
        break
      case 2:
        console.log("点击了删除")
        const deleteRequest = store.openCursor() // case没有块级作用域，上面定义了request不能重名
        deleteRequest.onsuccess = function(event) {
          const cursor = event.target.result
          if (cursor) {
            if (cursor.key === 101) {
              cursor.delete()
            } else {
              cursor.continue()
            }
          } else {
            console.log("删除完成")
          }
        }
        break
      case 3:
        console.log("点击了修改")
        const updateRequest = store.openCursor()
        updateRequest.onsuccess = function(event) {
          const cursor = event.target.result
          if (cursor) {
            if (cursor.key === 101) {
              const value = cursor.value;
              value.name = "curry"
              cursor.update(value)
            } else {
              cursor.continue()
            }
          } else {
            console.log("修改完成")
          }
        }
        break
    }
  }
}

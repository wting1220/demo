const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 }, () => {
    console.log('socket start')
})

let clients = []
wss.on('connection', (client) => {
    // 监听
    clients.push(client)
    client.send('welcome')  // 数据传输必须是 字符串
    client.on('message', (msg) => {
        console.log('来自前端的数据' + msg)
        if (msg.indexOf('aaa') !== -1) {
            sendAll()
        }
    })
    client.on('close', (msg) => {
        console.log('前后端断开连接' + msg)
    })
})
  function sendAll() {
      for (let index = 0; index < clients.length; index++) {
          clients[index].send('cvbnmgcgvh')
      }
  }
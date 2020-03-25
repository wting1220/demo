const express = require('express')
const app = express()
const userRouter = require('./router/userRouter')

app.listen(3000, () => {
    console.log('server start')
})

app.use('/user', userRouter)

// app.get('/user/add', (req, res) => {
//     res.send('add success')
// })
// app.get('/user/del', (req, res) => {
//     res.send('delete success')
// })
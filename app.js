const express = require('express');
const app = express();
const dbconnection = require('./dbconnecction')
const userApi = require('./modules/user/user.api')
const msgApi = require('./modules/message/message.api')
const path = require('path')

let AppError = require('./utils/AppError')
let cors = require('cors')
dbconnection()
app.use(express.static(path.join(__dirname, './uploads')));
app.use(cors({
    origin: 'http://localhost:4200'
}))
app.use(express.json())
app.use('/user', userApi)
app.use('/message', msgApi)



app.all('*', (req, res, next) => {
    throw new AppError(404, 'page not found')
})
app.use((err, req, res, next) => {
    const { status = 500 } = err
    let { message } = err
    res.status(status).json({ message })
})


const server=app.listen(3000, () => {
    console.log('Server run !!!')
})
const io = require('./socket').init(server)

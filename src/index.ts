import * as express from  'express'
const  app = express()

const router = require('./routes/index.router')

app.use('/', router)
const port = process.env.PORT || 5500
app.listen(port, ()=>console.log('api running on 5500'))

module.exports = app
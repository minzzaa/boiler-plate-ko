const express = require('express')  // express 모드를 가져오고 
const app = express()   // express 를 만들고
const port = 5000

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://minz:112323@minz.bd3bq.mongodb.net/?retryWrites=true&w=majority', {
    // useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('mongoDB connected...'))
  .catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
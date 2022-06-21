const express = require('express')  // express 모드를 가져오고 
const app = express()   // express 를 만들고
const port = 5000
const bodyParser = require('body-parser');

const config = require('./config/key');

const { User } = require("./models/User");

//application/x-www-form-urlencoded 로 된 데이터를 분석해서 가져올 수 있게 해줌
app.use(bodyParser.urlencoded({extended: true}));

// application/json 타입으로 된걸 분석해서 가져올수 잇게끔 넣어줌.
app.use(bodyParser.json())

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
    // useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('mongoDB connected...'))
  .catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('새해복')
})

app.post('/register', (req,res) => {
  // 회원 가입 할때 필요한 정보들을 client에서 가져오면
  // 그것들을 데이터 베이스에 넣어준다.
  const user = new User(req.body);  // id, body 정보가 들어있음.

  // 몽고db 메소드
  user.save((err, doc) => {
    if (err) return res.json({ success: false, err }) // 실패시 err json 형식으로 전달
    return res.status(200).json({
      success:true
    })
  });


})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
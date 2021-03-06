const express = require('express')  // express 모드를 가져오고 
const app = express()   // express 를 만들고

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const config = require('./config/key');

const { User } = require("./models/User");

const { auth } = require('./middleware/auth');

const port = 5000
//application/x-www-form-urlencoded 로 된 데이터를 분석해서 가져올 수 있게 해줌
app.use(bodyParser.urlencoded({ extended: true }));

// application/json 타입으로 된걸 분석해서 가져올수 잇게끔 넣어줌.
app.use(bodyParser.json())

app.use(cookieParser());


const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
  // useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('mongoDB connected...'))
  .catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('새해복')
})


app.get('/api/hello', (req,res) => {
  res.send("안녕하세요");
})

app.post('/api/users/register', (req, res) => {
  // 회원 가입 할때 필요한 정보들을 client에서 가져오면
  // 그것들을 데이터 베이스에 넣어준다.
  const user = new User(req.body);  // id, body 정보가 들어있음.

  // save는 몽고db 메소드
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err }) // 실패시 err json 형식으로 전달
    return res.status(200).json({
      success: true
    })
  })
})

app.post('/api/users/login', (req, res) => {
  // 요청된 이메일을 데이터베이스에 있는지 찾는다.
  // findOne 몽고디비 메소드
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다."
      })
    }

    // 요청된 이메일이 데이터 베이스에 있다면 비밀번호가 맞는 비밀번호인지 확인한다.
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 틀렸습니다."
        })
    })

    // 비밀번호까지 맞다면 토큰 생성.
    user.generateToken((err, user) => {
      if (err) return res.status(400).send(err);

      // 토큰을 저장한다. (쿠키나,, )
      res.cookie("x_auth", user.token).status(200).json({ loginSuccess: true, userId: user._id })
    })
  })
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// auth 미들웨어.
app.get('/api/users/auth', auth, (req, res) => {

  // 여기까지 미들웨어를 통과해 왔다는 얘기는 Authentication이 True 라는 말.
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image
  })
})

app.get('/api/users/logout', auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({
      success: true
    })
  })
})
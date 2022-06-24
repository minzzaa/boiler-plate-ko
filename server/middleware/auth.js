// 인증 처리를 하는 곳
const { User } = require('../models/User');

let auth = (req, res, next) => {
    // 인증 처리 

    // 클라이언트에서 쿠키를 가져옴
    let token = req.cookies.x_auth;

    // 토큰을 복호화 한 후 유저를 찾음
    User.findByToken(token, (err, user) => {
        if (err) throw err;
        if (!user) return res.json({ isAuth: false, error: true })

        req.token = token;
        req.user = user;
        next(); // 여기는 미들웨어니까 next 로 갈 수 있게 넣어줌.
    })
    // 유저가 있으면 인증 OK

    // 유저가 없으면 인증 MO
}

module.exports = { auth }; // 다른데서도 쓸 수 있게.
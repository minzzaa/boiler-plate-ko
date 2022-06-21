const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const saltRounds = 10;

const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }

})

// 몽고에서 가져온 메소드
// 저장하기 전에 function 을 실행
userSchema.pre('save', function (next) {
    var user = this;

    if (user.isModified('password')) {
        // 비밀번호를 암호화 시킴
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) return next(err);

            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err);
                user.password = hash
                next()
            });
        })
    } else {
        next()
    }
})

userSchema.methods.comparePassword = function (plainPassword, cb) {
    // plainPassword : 1234567 , 암호화된 비밀번호 : 어쩌구
    bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
        if (err) return cb(err)
        cb(null, isMatch)
    })

}

userSchema.methods.generateToken = function (cb) {
    var user = this;

    //jsonwebtoken을 이용하여 token 생성
    var token = jwt.sign(user._id.toHexString(), 'secretToken')

    user.token = token

    user.save(function (err, user) {
        if (err) return cb(err)
        cb(null, user)
    })
}

userSchema.statics.findByToken = function (token, cb) {
    var user = this;

    // 복호화 하는 과정.
    // 토큰 decode 

    jwt.verify(token, 'secretToken', function (err, decoded) {
        // 유저 아이디를 이용해서 유저를 찾은 다음에 
        // 클라이언트에서 가져온 token 과 DB 에 보관된 토큰이 일치하는지 확인.
        user.findOne({ "_id": decoded, "token": token }, function (err, user) {
            if (err) return cb(err);
            cb(null, user)
        })
    })
}

const User = mongoose.model('User', userSchema) // 스키마를 모델로 감싸주는중

module.exports = { User } // 다른 곳에서도 쓰기 위해 export 함
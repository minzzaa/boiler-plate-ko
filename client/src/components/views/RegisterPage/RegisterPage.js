import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../../_actions/user_action';

function RegisterPage() {

  const [Email, setEmail] = useState('')
  const [Password, setPassword] = useState('')
  const [Name, setName] = useState('')
  const [ConfirmPassword, setConfirmPassword] = useState('')

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onEmailHandler = (e) => {
    setEmail(e.currentTarget.value)
  }

  const onPasswordHandler = (e) => {
    setPassword(e.currentTarget.value)
  }

  const onNameHandler = (e) => {
    setName(e.currentTarget.value)
  }

  const onConfirmPasswordHandler = (e) => {
    setConfirmPassword(e.currentTarget.value)
  }

  const onSubmitHandler = (e) => {
    e.preventDefault(); // 이게 없으면 아무것도 입력 안하고 버튼 눌러도 refresh 됨

    console.log('Email', Email)
    console.log('Password', Password)

    if (Password !== ConfirmPassword) {
      return alert('비밀번호와 비밀번호 확인은 같아야 합니다')
    }

    let body = {
      email: Email,
      password: Password,
      name: Name
    }

    dispatch(registerUser(body)).then(response => {
      if(response.payload.success){
        navigate('/login')
      } else {
        alert('회원가입에 실패했다.');
      }
    })

  }

  return (


    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh' }}>
      <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={onSubmitHandler}>
        <label>Email</label>
        <input type='email' value={Email} onChange={onEmailHandler} />

        <label>Name</label>
        <input type='text' value={Name} onChange={onNameHandler} />

        <label>Password</label>
        <input type='password' value={Password} onChange={onPasswordHandler} />

        <label>Confirm Password</label>
        <input type='password' value={ConfirmPassword} onChange={onConfirmPasswordHandler} />
        <br />
        <button type='submit'>
          회원가입
        </button>
      </form>
    </div>
  )
}

export default RegisterPage
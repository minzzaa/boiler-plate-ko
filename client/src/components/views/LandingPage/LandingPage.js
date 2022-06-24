import React, { useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  // 랜딩페이지에 들어오자마자 get response를 서버에 보내고, 서버에 보낸것을 콘솔창에 보일 수 있도록 하는 것 
  const navigate = useNavigate();
  useEffect(() => {
    axios.get('/api/hello')
      .then(response => console.log(response.data))
  }, [])
  
  const onClickHandler = () => {
    axios.get(`/api/users/logout`)
      .then(response => {
        if(response.data.success){
          navigate('/login');
        } else {
          alert('로그아웃 하는데 실패하였습니다.');
        }
      })
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh' }}>
      <h2>
        시작 페이지
      </h2>
      <button onClick={onClickHandler}>
        로그아웃
      </button>
    </div>
  )
}

export default LandingPage
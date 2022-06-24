import React, { useEffect } from 'react'
import axios from 'axios';

function LandingPage() {
  // 랜딩페이지에 들어오자마자 get response를 서버에 보내고, 서버에 보낸것을 콘솔창에 보일 수 있도록 하는 것 
  useEffect(() => {
    axios.get('/api/hello')
      .then(response => console.log(response.data))
  }, [])

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh' }}>
      <h2>
        시작 페이지
      </h2>
    </div>
  )
}

export default LandingPage
import React from 'react'
import FlightData from './components/Flight/FlightData'

function App() {
  return (
    <div className="container">
      <div className="hello-world">
        <h1>🌍 Hello World!</h1>
        <p>helloworld-0731 서비스에 오신 것을 환영합니다!</p>
        <p>완전 자동화된 다중 서비스 배포 시스템이 작동 중입니다.</p>
      </div>
      
      <div className="header">
        <h1>🛫 helloworld-0731 Flight Data App</h1>
        <p>Supabase에서 최신 항공료 데이터를 실시간으로 확인하세요</p>
      </div>
      <FlightData />
    </div>
  )
}

export default App

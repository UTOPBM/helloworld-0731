import React, { useState, useEffect } from 'react'

export default function FlightData() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [connectionStatus, setConnectionStatus] = useState(null)

  const fetchFlightData = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch('/api/flights/latest')
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const result = await response.json()
      setData(result)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const testConnection = async () => {
    try {
      const response = await fetch('/api/flights/test-connection')
      const result = await response.json()
      setConnectionStatus(result)
    } catch (err) {
      setConnectionStatus({ status: 'failed', error: err.message })
    }
  }

  useEffect(() => {
    fetchFlightData()
    
    // 30초마다 자동 새로고침
    const interval = setInterval(fetchFlightData, 30000)
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="card">
        <div className="loading">
          <div>✈️ 항공료 데이터를 불러오는 중...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="card">
        <div className="error">
          <h3>❌ 오류 발생</h3>
          <p>{error}</p>
          <button className="button" onClick={fetchFlightData}>
            다시 시도
          </button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2>🛫 최신 항공료 데이터</h2>
          <div>
            <button className="button" onClick={fetchFlightData}>
              새로고침
            </button>
            <button className="button" onClick={testConnection}>
              연결 테스트
            </button>
          </div>
        </div>

        {data?.data ? (
          <div>
            <div className="success">
              ✅ {data.message}
            </div>
            
            <div className="flight-info">
              <div className="info-item">
                <div className="info-label">항공편</div>
                <div className="info-value">
                  {data.data.departure_city || '출발지 미상'} → {data.data.arrival_city || '도착지 미상'}
                </div>
              </div>
              
              {data.data.price && (
                <div className="info-item">
                  <div className="info-label">가격</div>
                  <div className="info-value price">
                    ₩ {data.data.price.toLocaleString()}
                  </div>
                </div>
              )}
              
              {data.data.airline && (
                <div className="info-item">
                  <div className="info-label">항공사</div>
                  <div className="info-value">{data.data.airline}</div>
                </div>
              )}
              
              {data.data.departure_date && (
                <div className="info-item">
                  <div className="info-label">출발일</div>
                  <div className="info-value">
                    {new Date(data.data.departure_date).toLocaleDateString('ko-KR')}
                  </div>
                </div>
              )}
              
              <div className="info-item">
                <div className="info-label">데이터 ID</div>
                <div className="info-value">{data.data.id}</div>
              </div>
              
              {data.data.created_at && (
                <div className="info-item">
                  <div className="info-label">생성일시</div>
                  <div className="info-value">
                    {new Date(data.data.created_at).toLocaleString('ko-KR')}
                  </div>
                </div>
              )}
            </div>

            <details style={{ marginTop: '1rem' }}>
              <summary style={{ cursor: 'pointer', padding: '0.5rem', background: '#f8f9fa', borderRadius: '4px' }}>
                📋 전체 데이터 보기 (개발용)
              </summary>
              <div className="json-view">
                {JSON.stringify(data.data, null, 2)}
              </div>
            </details>
          </div>
        ) : (
          <div className="error">
            ℹ️ {data?.message || 'flight_prices 테이블에 데이터가 없습니다.'}
          </div>
        )}

        <div style={{ fontSize: '12px', color: '#666', textAlign: 'center', marginTop: '1rem' }}>
          마지막 업데이트: {data?.timestamp ? new Date(data.timestamp).toLocaleString('ko-KR') : '알 수 없음'}
          <br />
          💡 데이터는 30초마다 자동으로 새로고침됩니다.
        </div>
      </div>

      {connectionStatus && (
        <div className="card">
          <h3>🔗 연결 상태</h3>
          <div className={connectionStatus.status === 'connected' ? 'success' : 'error'}>
            상태: {connectionStatus.status === 'connected' ? '✅ 연결됨' : '❌ 연결 실패'}
          </div>
          <div className="json-view">
            {JSON.stringify(connectionStatus, null, 2)}
          </div>
        </div>
      )}
    </div>
  )
}

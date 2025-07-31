from fastapi import APIRouter, HTTPException
from typing import Any, Optional
import httpx
import os
from datetime import datetime

router = APIRouter()

# Supabase 설정
SUPABASE_URL = "https://tbanolxpzfejogxxgdxh.supabase.co"
SUPABASE_KEY = os.getenv("SUPABASE_ACCESS_TOKEN", "sbp_5ef0a9a2ac3e8d7dd58f49de59c20a0915992132")

@router.get("/flights/latest")
async def get_latest_flight_price():
    """
    Supabase data2image 프로젝트의 flight_prices 테이블에서 
    가장 최신에 삽입된 데이터 1개를 조회합니다.
    """
    try:
        headers = {
            "apikey": SUPABASE_KEY,
            "Authorization": f"Bearer {SUPABASE_KEY}",
            "Content-Type": "application/json"
        }
        
        # flight_prices 테이블에서 최신 데이터 1개 조회
        url = f"{SUPABASE_URL}/rest/v1/flight_prices"
        params = {
            "select": "*",
            "order": "created_at.desc,id.desc",
            "limit": "1"
        }
        
        async with httpx.AsyncClient() as client:
            response = await client.get(url, headers=headers, params=params)
            
        if response.status_code != 200:
            raise HTTPException(
                status_code=response.status_code, 
                detail=f"Supabase 요청 실패: {response.text}"
            )
        
        data = response.json()
        
        if not data:
            return {
                "message": "flight_prices 테이블에 데이터가 없습니다.",
                "data": None,
                "timestamp": datetime.now().isoformat()
            }
        
        latest_flight = data[0]
        
        return {
            "message": "최신 항공료 데이터를 성공적으로 조회했습니다.",
            "data": latest_flight,
            "timestamp": datetime.now().isoformat()
        }
        
    except httpx.RequestError as e:
        raise HTTPException(
            status_code=500, 
            detail=f"네트워크 오류: {str(e)}"
        )
    except Exception as e:
        raise HTTPException(
            status_code=500, 
            detail=f"서버 오류: {str(e)}"
        )

@router.get("/flights/test-connection")
async def test_supabase_connection():
    """
    Supabase 연결을 테스트합니다.
    """
    try:
        headers = {
            "apikey": SUPABASE_KEY,
            "Authorization": f"Bearer {SUPABASE_KEY}",
            "Content-Type": "application/json"
        }
        
        url = f"{SUPABASE_URL}/rest/v1/flight_prices"
        params = {
            "select": "count",
            "limit": "1"
        }
        
        async with httpx.AsyncClient(timeout=10.0) as client:
            response = await client.get(url, headers=headers, params=params)
            
        return {
            "status": "connected" if response.status_code == 200 else "failed",
            "status_code": response.status_code,
            "supabase_url": SUPABASE_URL,
            "timestamp": datetime.now().isoformat()
        }
        
    except Exception as e:
        return {
            "status": "failed",
            "error": str(e),
            "timestamp": datetime.now().isoformat()
        }

from fastapi import APIRouter
from datetime import datetime

router = APIRouter()

@router.get("/health")
async def health_check():
    """
    helloworld-0731 서비스 헬스체크 엔드포인트
    """
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "service": "helloworld-0731 - Hello World App",
        "message": "🌍 Hello World! 서비스가 정상 작동 중입니다."
    }

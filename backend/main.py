from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.flights import router as flights_router
from routes.health import router as health_router
import os
from dotenv import load_dotenv

# 환경변수 로드
load_dotenv()

app = FastAPI(
    title="helloworld-0731 - Hello World App",
    description="🌍 Hello World를 표시하는 helloworld-0731 애플리케이션",
    version="1.0.0"
)

# CORS 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 개발 환경에서는 모든 origin 허용
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 라우터 등록
app.include_router(health_router, prefix="/api", tags=["health"])
app.include_router(flights_router, prefix="/api", tags=["flights"])

@app.get("/")
async def root():
    return {"message": "🌍 Hello World! helloworld-0731 서비스가 정상 실행 중입니다!"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

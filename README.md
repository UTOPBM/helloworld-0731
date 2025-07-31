# 🚀 helloworld-0731 - Hello World App

Ubuntu 최적화된 FastAPI 백엔드와 React 프론트엔드로 구성된 Hello World 애플리케이션입니다.

## ✨ 특징

- 🌍 **Hello World**: 대형 Hello World 메시지 표시
- 🐍 **FastAPI**: Ubuntu 최적화된 깔끔한 FastAPI 구조
- ⚛️ **React**: Hello World 중심의 아름다운 UI
- 🌐 **Multi-Service**: Nginx 리버스 프록시 기반 다중 서비스 지원
- 🔄 **Zero-Downtime**: 무중단 개별 서비스 배포
- 🔥 **Hot Reloading**: 개발 시 실시간 코드 반영
- 🐳 **Ubuntu 최적화**: Docker Compose V2 사용
- 🚀 **자동 배포**: GitHub Actions로 Ubuntu VM에 자동 배포
- 🔗 **Supabase 연동**: MCP를 통한 데이터베이스 접근
- 💚 **헬스체크**: 서비스 상태 모니터링

## 🏗️ 프로젝트 구조

```
helloworld-0731/
├── backend/                 # FastAPI 백엔드
│   ├── main.py             # Hello World 메시지 포함 메인 앱
│   ├── routes/             # API 라우터
│   └── Dockerfile          # Ubuntu 최적화 컨테이너
├── frontend/               # React 프론트엔드
│   ├── src/App.jsx         # Hello World UI 컴포넌트
│   └── Dockerfile          # 최적화된 프론트엔드 컨테이너
├── docker-compose.yml      # Ubuntu Docker Compose V2
├── docker-compose.dev.yml  # Hot Reloading 개발 환경
└── .github/workflows/      # Ubuntu 최적화 자동 배포
```

## 🚀 로컬 실행

### 🔥 방법 1: Hot Reloading 개발 환경 (권장)
```bash
# 개발용 - 파일 변경 시 자동 재시작
docker compose -f docker-compose.dev.yml up --build

# Hello World 메시지 수정 → 자동으로 반영 ✨
```

### 🐳 방법 2: 프로덕션 환경
```bash
# 프로덕션용 - 최적화된 빌드
docker compose up --build
```

## 🌐 접속 URL

### 로컬 개발 환경
- **Hello World**: http://localhost/helloworld-0731/
- **API**: http://localhost/api/helloworld-0731/
- **API Docs**: http://localhost/api/helloworld-0731/docs

### 프로덕션 환경
- **Hello World**: http://34.71.236.217/helloworld-0731/
- **API**: http://34.71.236.217/api/helloworld-0731/
- **Service Dashboard**: http://34.71.236.217/

## 🚀 배포

main 브랜치에 push하면 Ubuntu VM에 무중단 자동 배포됩니다.

```bash
git add .
git commit -m "feat: update hello world message"
git push origin main
```

---

**🌍 Hello World, Ubuntu Style!**

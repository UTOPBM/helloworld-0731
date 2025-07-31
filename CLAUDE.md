# 🤖 Claude Code 협업 가이드 - 0731 버전

## 📋 프로젝트 정보

- **타입**: helloworld-0731 Hello World App
- **구조**: Ubuntu 최적화 Multi-Service 시스템
- **배포**: 무중단 자동 배포 (Zero-Downtime)
- **개발환경**: Hot Reloading 지원
- **특징**: 대형 Hello World 메시지 표시

## 🚀 로컬 개발

```bash
# 🔥 Hot Reloading 개발 환경 (권장)
docker compose -f docker-compose.dev.yml up --build

# 🐳 프로덕션 환경 테스트
docker compose up --build

# 💻 개별 실행
cd backend && python main.py    # 백엔드
cd frontend && npm run dev      # 프론트엔드
```

## 🌍 Hello World 커스터마이징

```text
✅ "Hello World 메시지를 '안녕하세요!'로 변경해줘"
✅ "배경색을 파란색으로 바꿔줘"
✅ "새로운 Hello World 스타일을 추가해줘"
✅ "다국어 Hello World 메시지를 만들어줘"
```

## ⚡ 자주 사용하는 명령어

```bash
# Ubuntu Docker Compose V2 사용
docker compose -f docker-compose.dev.yml up --build    # Hot Reloading 개발
docker compose up --build                               # 프로덕션 빌드
docker compose logs -f backend                          # 백엔드 로그
docker compose logs -f frontend                         # 프론트엔드 로그

# 배포
git add . && git commit -m "feat: update hello world" && git push
```

## 🌐 배포 정보

- **Service Dashboard**: http://34.71.236.217/
- **Your Hello World**: http://34.71.236.217/helloworld-0731/
- **Your API**: http://34.71.236.217/api/helloworld-0731/
- **API Docs**: http://34.71.236.217/api/helloworld-0731/docs

**무중단 배포**: 기존 서비스에 영향 없이 새 Hello World 서비스 추가/업데이트

---

**🌍 Hello World Development Made Simple!**

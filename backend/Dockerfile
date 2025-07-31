# Multi-stage build for FastAPI
FROM python:3.11-alpine AS builder

# 빌드 도구 설치
RUN apk add --no-cache gcc musl-dev

WORKDIR /app

# 의존성 설치
COPY requirements.txt .
RUN pip install --user --no-cache-dir -r requirements.txt

# 실행 스테이지
FROM python:3.11-alpine AS production

# 빌드된 패키지 복사
COPY --from=builder /root/.local /root/.local
ENV PATH=/root/.local/bin:$PATH

# 비-root 사용자 생성
RUN adduser -D -s /bin/sh appuser

WORKDIR /app

# 애플리케이션 코드 복사
COPY --chown=appuser:appuser . .

# 비-root 사용자로 전환
USER appuser

# 헬스체크
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD python -c "import requests; requests.get('http://localhost:8000/api/health')" || exit 1

EXPOSE 8000

CMD ["python", "main.py"]

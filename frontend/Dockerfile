# Multi-stage build for React
FROM node:18-alpine AS builder

WORKDIR /app

# 패키지 파일들 복사
COPY package*.json ./

# 의존성 설치
RUN npm ci --silent

# 소스코드 복사
COPY . .

# 빌드
RUN npm run build

# 실행 스테이지 - nginx
FROM nginx:alpine AS production

# 빌드된 파일 복사
COPY --from=builder /app/dist /usr/share/nginx/html

# nginx 설정
COPY nginx.conf /etc/nginx/nginx.conf

# 비-root 사용자 설정
RUN adduser -D -s /bin/false -G nginx nginxuser && \
    chown -R nginxuser:nginx /usr/share/nginx/html && \
    chown -R nginxuser:nginx /var/cache/nginx && \
    chown -R nginxuser:nginx /var/log/nginx && \
    chown -R nginxuser:nginx /etc/nginx/conf.d && \
    touch /var/run/nginx.pid && \
    chown -R nginxuser:nginx /var/run/nginx.pid

USER nginxuser

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

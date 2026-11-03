FROM node:24-bookworm-slim
WORKDIR /app
RUN apt-get update && apt-get install -y --no-install-recommends curl ca-certificates && curl -fsSL https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64 -o /usr/local/bin/cloudflared && chmod +x /usr/local/bin/cloudflared && rm -rf /var/lib/apt/lists/*
COPY . .
RUN chmod +x scripts/start-with-tunnel.sh
ENV PORT=2000
EXPOSE 2000
CMD ["./scripts/start-with-tunnel.sh"]

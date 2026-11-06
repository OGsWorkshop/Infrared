FROM oven/bun:1.1.38-slim
WORKDIR /app

RUN apt-get update \
 && apt-get install -y --no-install-recommends curl ca-certificates git \
 && curl -fsSL https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64 -o /usr/local/bin/cloudflared \
 && chmod +x /usr/local/bin/cloudflared \
 && rm -rf /var/lib/apt/lists/*

# Self-contained site: the backend serves the frontend (public/) plus the /api
# routes, chat websocket and SQLite storage.
RUN git clone --depth 1 https://github.com/x8rr/cherri-v2-leak.git /app/backend
WORKDIR /app/backend
RUN bun install

COPY scripts/start-backend.sh /app/start-backend.sh
RUN chmod +x /app/start-backend.sh

ENV PORT=2000
EXPOSE 2000
CMD ["/app/start-backend.sh"]

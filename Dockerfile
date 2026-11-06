FROM oven/bun:1
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

# Ads off: the site injects a third-party ad script by default. Flip the default
# to "no" and neutralize the ad tag URL so no ad/reseller bidder chain loads.
RUN sed -i 's/"cherri_enableAds") || "yes"/"cherri_enableAds") || "no"/g' public/index.html \
 && sed -i 's#https://woofbeginner.com/51/25/ea/5125ea799eaf5473f38787565afde88f.js#data:text/javascript,#g' public/index.html

COPY scripts/start-backend.sh /app/start-backend.sh
RUN chmod +x /app/start-backend.sh

ENV PORT=2000
EXPOSE 2000
CMD ["/app/start-backend.sh"]

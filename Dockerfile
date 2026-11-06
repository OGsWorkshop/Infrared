FROM node:24-bookworm-slim
WORKDIR /app

RUN apt-get update \
 && apt-get install -y --no-install-recommends curl ca-certificates git unzip \
 && curl -fsSL https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64 -o /usr/local/bin/cloudflared \
 && chmod +x /usr/local/bin/cloudflared \
 && curl -fsSL https://bun.sh/install | bash \
 && ln -sf /root/.bun/bin/bun /usr/local/bin/bun \
 && rm -rf /var/lib/apt/lists/*

# Self-contained site: the backend serves the frontend (public/) plus the /api
# routes, chat websocket and SQLite storage.
RUN git clone --depth 1 https://github.com/x8rr/cherri-v2-leak.git /app/backend
WORKDIR /app/backend
RUN bun install

# Ads off by default + neutralize the ad tag URL; point the browser proxy at a
# working WISP (the same-origin /socket/ server isn't served in production).
RUN sed -i 's/"cherri_enableAds") || "yes"/"cherri_enableAds") || "no"/g' public/index.html \
 && sed -i 's#https://woofbeginner.com/51/25/ea/5125ea799eaf5473f38787565afde88f.js#data:text/javascript,#g' public/index.html \
 && node -e "const fs=require('fs');const p='public/assets/js/cherri.browse.js';let s=fs.readFileSync(p,'utf8');s=s.replace('const wispUrl = defaultWispUrl;','const wispUrl = \"wss://anura.pro/\";');fs.writeFileSync(p,s);console.log('wisp patched:',s.includes('wss://anura.pro/'))" \
 && sed -i 's#/assets/js/cherri.browse.js"#/assets/js/cherri.browse.js?v=2"#g' public/pages/browse.html public/pages/minibrowse.html

COPY scripts/start-backend.sh /app/start-backend.sh
RUN chmod +x /app/start-backend.sh

ENV PORT=2000
EXPOSE 2000
CMD ["/app/start-backend.sh"]

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
 && cp public/assets/css/colors/crimson.css public/assets/css/colors/default.css \
 && find public -type f \( -name '*.html' -o -name '*.js' \) -exec sed -i -e 's/cherri_theme") ?? "default"/cherri_theme") ?? "crimson"/g' -e 's/cherri_theme") || "default"/cherri_theme") || "crimson"/g' -e 's/cherri_theme")??"default"/cherri_theme")??"crimson"/g' {} + \
 && sed -i 's#href="/assets/css/colors/default.css"#href="/assets/css/colors/crimson.css"#' public/onboarding/index.html \
 && node -e "const fs=require('fs');const p='public/assets/js/cherri.browse.js';let s=fs.readFileSync(p,'utf8');s=s.replace('const wispUrl = defaultWispUrl;','const wispUrl = \"wss://anura.pro/\";');fs.writeFileSync(p,s);console.log('wisp patched:',s.includes('wss://anura.pro/'))" \
 && sed -i 's#/assets/js/cherri.browse.js"#/assets/js/cherri.browse.js?v=2"#g' public/pages/browse.html public/pages/minibrowse.html

# Rebrand visible "Cherri" -> "Infrared" (static capital-Cherri in HTML, plus a
# runtime text/attribute replacer for dynamic + lowercase brand text).
COPY overlays/infrared-brand.js /app/backend/public/infrared-brand.js
COPY overlays/inject-brand.cjs /app/inject-brand.cjs
RUN node /app/inject-brand.cjs /app/backend/public
COPY overlays/edit-credits.cjs /app/edit-credits.cjs
RUN node /app/edit-credits.cjs /app/backend/public/pages/settings.html

# Remove the "Join the Minecraft Server" button + modal from home/chatrooms,
# and point the Discord invite at the requested server.
COPY overlays/remove-mc.cjs /app/remove-mc.cjs
RUN node /app/remove-mc.cjs /app/backend/public/pages/home.html \
 && node /app/remove-mc.cjs /app/backend/public/pages/chatrooms.html \
 && find public -name '*.html' -exec sed -i 's#https://discord.gg/hUYzETaQ9U#https://discord.gg/XNMTdDvjKJ#g' {} +

# Make Movies work (TMDB has no CORS, so proxy it server-side) and make AI work
# (proxy to cherrion.top, rewriting the model to the one it accepts).
COPY overlays/patch-backend.cjs /app/patch-backend.cjs
RUN node /app/patch-backend.cjs /app/backend

COPY scripts/start-backend.sh /app/start-backend.sh
RUN chmod +x /app/start-backend.sh

ENV PORT=2000
EXPOSE 2000
CMD ["/app/start-backend.sh"]

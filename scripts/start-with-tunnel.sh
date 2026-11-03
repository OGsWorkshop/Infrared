#!/bin/sh
set -eu

if [ -n "${CLOUDFLARE_TUNNEL_TOKEN:-}" ]; then
  echo "Starting remotely managed Cloudflare Tunnel..."
  cloudflared tunnel --no-autoupdate --loglevel info run --token "$CLOUDFLARE_TUNNEL_TOKEN" &
elif [ -n "${CLOUDFLARE_TUNNEL_ID:-}" ] && [ -n "${CLOUDFLARE_TUNNEL_CREDENTIALS:-}" ]; then
  credentials_file=/tmp/infrared-tunnel-credentials.json
  config_file=/tmp/infrared-tunnel-config.yml
  printf '%s' "$CLOUDFLARE_TUNNEL_CREDENTIALS" > "$credentials_file"
  cat > "$config_file" <<EOF
tunnel: ${CLOUDFLARE_TUNNEL_ID}
credentials-file: ${credentials_file}
ingress:
  - hostname: ${CLOUDFLARE_TUNNEL_HOSTNAME:-infrared.earth}
    service: ${CLOUDFLARE_TUNNEL_ORIGIN:-http://127.0.0.1:2000}
  - service: http_status:404
EOF
  echo "Starting locally managed Cloudflare Tunnel ${CLOUDFLARE_TUNNEL_ID}..."
  cloudflared tunnel --no-autoupdate --loglevel info --config "$config_file" run &
else
  echo "Configure CLOUDFLARE_TUNNEL_TOKEN or CLOUDFLARE_TUNNEL_ID plus CLOUDFLARE_TUNNEL_CREDENTIALS" >&2
  exit 1
fi
tunnel_pid=$!

sleep 3
if ! kill -0 "$tunnel_pid" 2>/dev/null; then
  echo "Cloudflare Tunnel exited during startup" >&2
  exit 1
fi

pnpm start &
app_pid=$!

cleanup() {
  kill "$tunnel_pid" "$app_pid" 2>/dev/null || true
}
trap cleanup INT TERM EXIT

wait "$app_pid"

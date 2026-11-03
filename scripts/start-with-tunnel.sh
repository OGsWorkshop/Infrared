#!/bin/sh
set -eu

if [ -z "${CLOUDFLARE_TUNNEL_TOKEN:-}" ]; then
  echo "CLOUDFLARE_TUNNEL_TOKEN is required" >&2
  exit 1
fi

cloudflared tunnel --no-autoupdate --loglevel info run --token "$CLOUDFLARE_TUNNEL_TOKEN" &
tunnel_pid=$!
node server.js &
app_pid=$!
sleep 3
if ! kill -0 "$tunnel_pid" 2>/dev/null; then
  echo "Cloudflare Tunnel exited during startup" >&2
  exit 1
fi
trap 'kill "$tunnel_pid" "$app_pid" 2>/dev/null || true' INT TERM EXIT
wait "$app_pid"

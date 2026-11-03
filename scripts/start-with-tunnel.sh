#!/bin/sh
set -eu

if [ -z "${CLOUDFLARE_TUNNEL_TOKEN:-}" ]; then
  echo "CLOUDFLARE_TUNNEL_TOKEN is required" >&2
  exit 1
fi

cloudflared tunnel --no-autoupdate run --token "$CLOUDFLARE_TUNNEL_TOKEN" &
tunnel_pid=$!

pnpm start &
app_pid=$!

cleanup() {
  kill "$tunnel_pid" "$app_pid" 2>/dev/null || true
}
trap cleanup INT TERM EXIT

wait "$app_pid"

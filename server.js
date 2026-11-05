import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const port = Number(process.env.PORT || 2000);
const types = { ".html":"text/html; charset=utf-8", ".css":"text/css; charset=utf-8", ".js":"application/javascript; charset=utf-8", ".json":"application/json", ".svg":"image/svg+xml", ".png":"image/png", ".jpg":"image/jpeg", ".jpeg":"image/jpeg", ".webp":"image/webp", ".ico":"image/x-icon", ".woff":"font/woff", ".woff2":"font/woff2", ".ttf":"font/ttf", ".wasm":"application/wasm", ".mp3":"audio/mpeg", ".ogg":"audio/ogg", ".mp4":"video/mp4", ".webm":"video/webm", ".txt":"text/plain; charset=utf-8" };

http.createServer((req, res) => {
  const requested = decodeURIComponent((req.url || "/").split("?")[0]);
  if (requested === "/api/geo") return json(res, { country: null, region: null, city: null, timezone: null });
  if (requested === "/api/device/hello") return json(res, { ok: true, device: null });
  if (requested === "/api/presence/heartbeat") return json(res, { ok: true });
  if (requested === "/api/presence/count") return json(res, { count: 0 });
  if (requested === "/start.html") {
    res.writeHead(302, { Location: "/" });
    return res.end();
  }
  const file = path.resolve(root, requested === "/" ? "index.html" : requested.slice(1));
  if (!file.startsWith(root + path.sep)) { res.writeHead(403); return res.end("Forbidden"); }
  fs.stat(file, (error, stats) => {
    if (error || !stats.isFile()) { res.writeHead(404); return res.end("Not found"); }
    const headers = { "Content-Type": types[path.extname(file).toLowerCase()] || "application/octet-stream" };
    if (requested === "/") headers["Cache-Control"] = "no-store, no-cache, must-revalidate";
    res.writeHead(200, headers);
    fs.createReadStream(file).pipe(res);
  });
}).listen(port, "0.0.0.0", () => console.log(`Infrared listening on ${port}`));

function json(res, value) {
  res.writeHead(200, { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" });
  res.end(JSON.stringify(value));
}

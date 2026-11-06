import http from "node:http";
import https from "node:https";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const port = Number(process.env.PORT || 2000);
const types = { ".html":"text/html; charset=utf-8", ".css":"text/css; charset=utf-8", ".js":"application/javascript; charset=utf-8", ".json":"application/json", ".svg":"image/svg+xml", ".png":"image/png", ".jpg":"image/jpeg", ".jpeg":"image/jpeg", ".webp":"image/webp", ".ico":"image/x-icon", ".woff":"font/woff", ".woff2":"font/woff2", ".ttf":"font/ttf", ".wasm":"application/wasm", ".mp3":"audio/mpeg", ".ogg":"audio/ogg", ".mp4":"video/mp4", ".webm":"video/webm", ".txt":"text/plain; charset=utf-8" };

const UPSTREAM = "cherrion.top";
const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36";

// Endpoints the app needs that we answer locally so the shell boots even if the
// upstream is unreachable.
const stubs = {
  "/api/geo": { country: null, region: null, city: null, timezone: null },
  "/api/device/hello": { ok: true, device: null },
  "/api/presence/heartbeat": { ok: true },
  "/api/presence/count": { count: 0 }
};

function proxy(req, res) {
  const headers = { ...req.headers, host: UPSTREAM, referer: `https://${UPSTREAM}/`, origin: `https://${UPSTREAM}`, "user-agent": req.headers["user-agent"] || UA };
  delete headers["content-length"];
  const preq = https.request({ host: UPSTREAM, port: 443, method: req.method, path: req.url, headers }, (pres) => {
    const out = { ...pres.headers };
    delete out["content-length"];
    res.writeHead(pres.statusCode || 502, out);
    pres.pipe(res);
  });
  preq.on("error", () => {
    if (!res.headersSent) {
      const stub = stubs[req.url.split("?")[0]];
      if (stub) return json(res, stub);
      res.writeHead(502, { "Content-Type": "application/json; charset=utf-8" });
    }
    res.end('{"error":"upstream unavailable"}');
  });
  req.pipe(preq);
}

http.createServer((req, res) => {
  const requested = decodeURIComponent((req.url || "/").split("?")[0]);
  if (stubs[requested]) return json(res, stubs[requested]);
  if (requested === "/start.html") {
    res.writeHead(302, { Location: "/" });
    return res.end();
  }
  if (/^\/(api|socket|stream)(\/|$|\?)/.test(req.url || "") || requested === "/stream") return proxy(req, res);
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

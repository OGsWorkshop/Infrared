const fs = require("fs");
const path = require("path");
const root = process.argv[2] || ".";

// 1) Add /api/tmdb and /api/ai proxies to the Bun backend entry.
const appPath = path.join(root, "src/server/app.ts");
let app = fs.readFileSync(appPath, "utf8");
if (!app.includes("__proxyTmdb")) {
  const anchor = 'if (url.pathname === "/ws/chat") {';
  if (!app.includes(anchor)) throw new Error("anchor not found in app.ts");
  app = app.replace(
    anchor,
    'if (url.pathname.startsWith("/api/tmdb/")) return __proxyTmdb(url);\n' +
      '\t\tif (url.pathname.startsWith("/api/ai/")) return __proxyAi(request, url);\n' +
      '\t\t' + anchor,
  );
  app += `

async function __proxyTmdb(url: URL): Promise<Response> {
	const target = "https://api.themoviedb.org/3" + url.pathname.slice("/api/tmdb".length) + url.search;
	const r = await fetch(target, { headers: { accept: "application/json" } });
	return new Response(r.body, {
		status: r.status,
		headers: { "content-type": "application/json; charset=utf-8", "access-control-allow-origin": "*" },
	});
}

async function __proxyAi(request: Request, url: URL): Promise<Response> {
	let body: string | undefined;
	if (request.method !== "GET" && request.method !== "HEAD") {
		const raw = await request.text();
		try {
			const parsed = JSON.parse(raw);
			if (parsed && typeof parsed === "object" && "model" in parsed) parsed.model = "dynamic/primary";
			body = JSON.stringify(parsed);
		} catch {
			body = raw;
		}
	}
	const r = await fetch("https://cherrion.top" + url.pathname + url.search, {
		method: request.method,
		headers: { "content-type": "application/json", origin: "https://cherrion.top", referer: "https://cherrion.top/" },
		body,
	});
	return new Response(r.body, {
		status: r.status,
		headers: {
			"content-type": r.headers.get("content-type") || "application/json",
			"access-control-allow-origin": "*",
		},
	});
}
`;
  fs.writeFileSync(appPath, app);
  console.log("app.ts patched");
}

// 2) Point the frontend at the same-origin TMDB proxy.
for (const page of ["watch.html", "movie.html"]) {
  const p = path.join(root, "public/pages", page);
  let s = fs.readFileSync(p, "utf8");
  const before = s;
  s = s.replace(/https:\/\/api\.themoviedb\.org\/3/g, "/api/tmdb");
  s = s.replace(/https:\/\/api\.tmdb\.org\/3/g, "/api/tmdb");
  if (s !== before) {
    fs.writeFileSync(p, s);
    console.log("repointed TMDB in " + page);
  }
}

const fs = require("fs");
const path = require("path");
const root = process.argv[2] || "public";
const tag = '<script src="/infrared-brand.js"></script>';
let count = 0;

function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) {
      walk(p);
      continue;
    }
    if (!p.endsWith(".html")) continue;
    let s = fs.readFileSync(p, "utf8");
    s = s.replace(/Cherri/g, "Infrared").replace(/CHERRI/g, "INFRARED");
    if (!s.includes("/infrared-brand.js")) {
      if (s.includes("</body>")) s = s.replace("</body>", tag + "\n</body>");
      else s += "\n" + tag + "\n";
    }
    fs.writeFileSync(p, s);
    count++;
  }
}

walk(root);
console.log("brand injected into " + count + " html files");

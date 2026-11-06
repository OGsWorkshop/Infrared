const fs = require("fs");
const p = process.argv[2];
let s = fs.readFileSync(p, "utf8");
s = s.replace(/>x8rr</g, ">Red60<");
s = s.replace(
  /[ \t]*<div class="flex-row" style="align-items: center; position: relative;">\s*<strong[^>]*>ap5z<\/strong>[\s\S]*?<\/div>\s*/g,
  "",
);
fs.writeFileSync(p, s);
console.log("credits edited; x8rr left:", s.includes("x8rr"), "ap5z left:", s.includes("ap5z"));

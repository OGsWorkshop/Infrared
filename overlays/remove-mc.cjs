const fs = require("fs");
const p = process.argv[2];
let s = fs.readFileSync(p, "utf8");

// Remove the "Join the Minecraft Server" button.
s = s.replace(
  /[ \t]*<button onclick="document\.getElementById\('modal-mc'\)[\s\S]*?<\/button>\s*/g,
  "",
);

// Remove the modal-backdrop block that owns id="modal-mc" (tag-counted).
function removeModal(src) {
  const marker = '<div class="modal-backdrop" id="modal-mc">';
  const start = src.indexOf(marker);
  if (start < 0) return src;
  const re = /<\/?div\b[^>]*>/g;
  re.lastIndex = start;
  let depth = 0;
  let m;
  while ((m = re.exec(src))) {
    if (m[0].startsWith("</div")) depth -= 1;
    else depth += 1;
    if (depth === 0) {
      let end = re.lastIndex;
      while (src[end] === "\n" || src[end] === "\r" || src[end] === " " || src[end] === "\t") end += 1;
      return src.slice(0, start) + src.slice(end);
    }
  }
  return src;
}
s = removeModal(s);

fs.writeFileSync(p, s);
console.log("mc removed from " + p + "; modal-mc left:", s.includes("modal-mc"));

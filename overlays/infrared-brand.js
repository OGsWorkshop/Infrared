(() => {
  const BRAND = "Infrared";
  const fix = (s) => s.replace(/cherri/gi, BRAND);
  const has = (s) => /cherri/i.test(s);
  const skip = new Set(["SCRIPT", "STYLE", "NOSCRIPT", "TEXTAREA"]);

  function fixText(root) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    for (const node of nodes) {
      const parent = node.parentElement;
      if (parent && skip.has(parent.tagName)) continue;
      const v = node.nodeValue;
      if (v && has(v)) node.nodeValue = fix(v);
    }
  }

  function fixAttrs(root) {
    if (!root.querySelectorAll) return;
    for (const el of root.querySelectorAll("*")) {
      if (skip.has(el.tagName)) continue;
      for (const attr of Array.from(el.attributes || [])) {
        if (has(attr.value)) el.setAttribute(attr.name, fix(attr.value));
      }
    }
  }

  function run() {
    try {
      if (has(document.title)) document.title = fix(document.title);
      fixText(document.documentElement);
      fixAttrs(document.documentElement);
    } catch (e) {}
  }

  run();
  new MutationObserver(() => run()).observe(document.documentElement, {
    childList: true,
    subtree: true,
    characterData: true,
    attributes: true,
  });
  document.addEventListener("DOMContentLoaded", run, { once: true });
  window.addEventListener("load", run, { once: true });
})();

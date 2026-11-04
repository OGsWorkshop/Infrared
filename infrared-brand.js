(() => {
  document.title = "Infrared";
  const replaceBranding = () => {
    if (!(document.body instanceof Node)) return;
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    for (const node of nodes) {
      if (/cherri/i.test(node.nodeValue || "")) {
        node.nodeValue = node.nodeValue.replace(/cherri/gi, "Infrared");
      }
    }
  };
  const start = () => {
    replaceBranding();
    new MutationObserver(replaceBranding).observe(document.body, { childList: true, subtree: true });
  };
  if (document.body) start();
  else document.addEventListener("DOMContentLoaded", start, { once: true });
})();

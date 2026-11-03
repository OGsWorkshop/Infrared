(() => {
  document.title = "Infrared";
  const replaceBranding = () => {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    for (const node of nodes) {
      if (/cherri/i.test(node.nodeValue || "")) {
        node.nodeValue = node.nodeValue.replace(/cherri/gi, "Infrared");
      }
    }
  };
  replaceBranding();
  new MutationObserver(replaceBranding).observe(document.body, { childList: true, subtree: true });
})();

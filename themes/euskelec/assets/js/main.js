// Video lists ({{< videos >}}): nothing is loaded from YouTube until a tile is clicked, then the tile
// becomes a youtube-nocookie player. Ctrl/Cmd/middle click keeps the normal link to YouTube.
// This is the only JavaScript on the site (the mobile menu is a <details>).
document.addEventListener("click", (e) => {
  const tile = e.target.closest("a[data-yt]");
  if (!tile || e.ctrlKey || e.metaKey || e.shiftKey || e.button !== 0) return;
  e.preventDefault();
  const iframe = document.createElement("iframe");
  iframe.src = `https://www.youtube-nocookie.com/embed/${tile.dataset.yt}?autoplay=1&rel=0`;
  iframe.title = tile.dataset.ytTitle || "YouTube";
  iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
  iframe.referrerPolicy = "strict-origin-when-cross-origin";
  iframe.allowFullscreen = true;
  iframe.className = "aspect-video w-full";
  tile.replaceWith(iframe);
});

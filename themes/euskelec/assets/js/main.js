// Video lists ({{< videos >}}): nothing is loaded from YouTube until a tile is clicked, then the tile
// becomes a youtube-nocookie player. Ctrl/Cmd/middle click keeps the normal link to YouTube.
// Besides this, the only JavaScript is the pause button of the home video (below); the mobile menu is a <details>.
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

// Home video: a pause button (moving content longer than 5 s needs one, WCAG 2.2.2), and no autoplay
// for people who ask the system for reduced motion: they get the poster and can start it themselves.
const heroVideo = document.querySelector("[data-hero-video]");
const heroToggle = document.querySelector("[data-hero-toggle]");
if (heroVideo && heroToggle) {
  const sync = () => {
    const paused = heroVideo.paused;
    heroToggle.setAttribute("aria-label", paused ? heroToggle.dataset.labelPlay : heroToggle.dataset.labelPause);
    heroToggle.querySelector("[data-icon-pause]").classList.toggle("hidden", paused);
    heroToggle.querySelector("[data-icon-play]").classList.toggle("hidden", !paused);
  };
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) heroVideo.pause();
  heroVideo.addEventListener("play", sync);
  heroVideo.addEventListener("pause", sync);
  heroToggle.addEventListener("click", () => (heroVideo.paused ? heroVideo.play() : heroVideo.pause()));
  heroToggle.hidden = false;
  sync();
}

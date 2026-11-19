// Video lists ({{< videos >}}): nothing is loaded from YouTube until a tile is clicked, then the tile
// becomes a youtube-nocookie player. Ctrl/Cmd/middle click keeps the normal link to YouTube.
// Besides this: the pause button of the home video and the photo lightbox (below); the mobile menu is a <details>.
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

// Photo galleries ({{< gallery >}}): a photo opens in the lightbox (_partials/lightbox.html) with the others of its
// gallery (also those behind "N more photos"): previous / next, arrow keys, swipe; Esc, × or a click beside the
// photo closes it. Ctrl/Cmd/middle click keeps the plain link to the image.
const lightbox = document.querySelector("[data-lightbox]");
if (lightbox) {
  const img = lightbox.querySelector("[data-lb-img]");
  const caption = lightbox.querySelector("[data-lb-caption]");
  const count = lightbox.querySelector("[data-lb-count]");
  let photos = [];
  let index = 0;
  const show = (i) => {
    index = (i + photos.length) % photos.length;
    const link = photos[index];
    img.src = link.href;
    caption.textContent = link.dataset.caption || ""; // old photos have none (their alt is just "Photo n")
    count.textContent = `${index + 1} / ${photos.length}`;
    if (photos.length > 1) new Image().src = photos[(index + 1) % photos.length].href; // the next one, ready
  };
  document.addEventListener("click", (e) => {
    const link = e.target.closest("[data-gallery] a[data-photo]");
    if (!link || e.ctrlKey || e.metaKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    photos = [...link.closest("[data-gallery]").querySelectorAll("a[data-photo]")];
    lightbox.querySelector("[data-lb-prev]").hidden = lightbox.querySelector("[data-lb-next]").hidden = photos.length < 2;
    show(photos.indexOf(link));
    lightbox.showModal();
  });
  lightbox.querySelector("[data-lb-prev]").addEventListener("click", () => show(index - 1));
  lightbox.querySelector("[data-lb-next]").addEventListener("click", () => show(index + 1));
  lightbox.querySelector("[data-lb-close]").addEventListener("click", () => lightbox.close());
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox || e.target.matches("[data-lb-stage]")) lightbox.close();
  });
  lightbox.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") show(index - 1);
    else if (e.key === "ArrowRight") show(index + 1);
  });
  let x0 = null;
  lightbox.addEventListener("pointerdown", (e) => (x0 = e.pointerType === "touch" ? e.clientX : null));
  lightbox.addEventListener("pointerup", (e) => {
    if (x0 !== null && Math.abs(e.clientX - x0) > 50 && photos.length > 1) show(index + (e.clientX < x0 ? 1 : -1));
    x0 = null;
  });
  lightbox.addEventListener("close", () => img.removeAttribute("src"));
}

// Countdown in the header (_partials/countdown.html): the time left until data-countdown, from the visitor's clock.
// Days and hh:mm:ss, every second; for reduced motion, days, hours and minutes, every minute. Hidden once it has passed.
const countdown = document.querySelector("[data-countdown]");
if (countdown) {
  const end = Date.parse(countdown.dataset.countdown);
  const out = countdown.querySelector("[data-countdown-time]");
  const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const pad = (n) => String(n).padStart(2, "0");
  const tick = () => {
    const left = Math.floor((end - Date.now()) / 1000);
    if (!(left > 0)) {
      countdown.hidden = true;
      return;
    }
    const d = Math.floor(left / 86400);
    const h = Math.floor(left / 3600) % 24;
    const m = Math.floor(left / 60) % 60;
    const days = d ? `${d} ${d === 1 ? countdown.dataset.dayOne : countdown.dataset.dayOther} ` : "";
    out.textContent = calm ? `${days}${h} h ${m} min` : `${days}${pad(h)}:${pad(m)}:${pad(left % 60)}`;
    countdown.hidden = false;
    const step = calm ? 60000 : 1000;
    setTimeout(tick, step - (Date.now() % step) + 20);
  };
  tick();
}

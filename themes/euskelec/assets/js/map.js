// Contact map (_partials/map.html): the places of the page (`map.places`) on one map, with Leaflet and
// OpenStreetMap tiles. No cookies: the tile servers set none and there is no key or account. Loaded only on
// pages with a map. The list under the map says the same in text (and is all there is without JS).
// The venue (`venue: true`, where the competition takes place) stands out: a big lime marker with a chequered
// flag, its text in the label and on top of the others; the other places are small blue squares.
import L from "leaflet";

const escape = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

document.querySelectorAll("[data-map]").forEach((el) => {
  const places = JSON.parse(el.dataset.places);
  el.hidden = false;
  const map = L.map(el, {
    scrollWheelZoom: false, // the page scrolls over the map; zoom with the buttons, or pinch on phones
    dragging: !L.Browser.mobile, // one finger scrolls the page on phones
  });
  map.attributionControl.setPrefix('<a href="https://leafletjs.com">Leaflet</a>');
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);
  // On narrow maps the venue label goes under its flag, so the map can zoom in closer
  const narrow = el.clientWidth < 500;
  const markers = places.map((p) => {
    const icon = p.venue
      ? L.divIcon({ className: "map-pin map-pin--venue", html: el.dataset.flag, iconSize: [40, 40] })
      : L.divIcon({ className: "map-pin", iconSize: [16, 16] });
    const label = p.venue ? `${escape(p.name)}<small>${escape(p.text)}</small>` : escape(p.name);
    return L.marker([p.lat, p.lon], { icon, title: p.name, alt: p.name, zIndexOffset: p.venue ? 1000 : 0 })
      .bindTooltip(label, {
        permanent: true,
        direction: p.venue && narrow ? "bottom" : "right",
        offset: p.venue ? (narrow ? [0, 22] : [22, 0]) : [10, 0],
        className: p.venue ? "map-label map-label--venue" : "map-label",
      })
      .addTo(map);
  });
  // room for the labels: on the right, and under the venue on narrow maps
  map.fitBounds(L.featureGroup(markers).getBounds(), {
    paddingTopLeft: narrow ? [110, 40] : [40, 40],
    paddingBottomRight: narrow ? [90, 80] : [190, 40],
  });
});

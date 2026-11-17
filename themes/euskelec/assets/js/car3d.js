// A 3D model of a Euskelec car turning slowly on itself, drawn with three.js (bundled by Hugo from
// node_modules, nothing is loaded from other sites). Used by {{< competition-intro >}}: the figure holds
// a still picture of the same model (`img`), shown until the model is ready and kept when there is no
// WebGL or JavaScript. The four wheels are one mesh in the model, so the whole car turns, not the wheels.
// A pause button stops it (moving content longer than 5 s needs one, WCAG 2.2.2); people who ask the
// system for reduced motion get it stopped at the start. It only draws while it is on screen.
import {
  ACESFilmicToneMapping,
  Box3,
  CanvasTexture,
  Group,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  PMREMGenerator,
  Scene,
  SRGBColorSpace,
  Timer,
  Vector3,
  WebGLRenderer,
} from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

const SPEED = 0.3; // radians per second: a whole turn in about 21 s
const START = 0.3; // the first view: three quarters from the front, the nose to the left (as in the still picture)

// A soft round shadow under the car, drawn once on a small canvas
function shadowTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const g = c.getContext("2d");
  const grad = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  grad.addColorStop(0, "rgba(31,75,107,0.45)");
  grad.addColorStop(0.55, "rgba(31,75,107,0.18)");
  grad.addColorStop(1, "rgba(31,75,107,0)");
  g.fillStyle = grad;
  g.fillRect(0, 0, 128, 128);
  return new CanvasTexture(c);
}

function setup(figure) {
  const stage = figure.querySelector("[data-car3d-stage]");
  const still = figure.querySelector("img");
  const toggle = figure.querySelector("[data-car3d-toggle]");

  let renderer;
  try {
    renderer = new WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
  } catch {
    return; // no WebGL: the still picture stays
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.setClearColor(0x000000, 0);
  const canvas = renderer.domElement;
  canvas.className = "absolute inset-0 size-full opacity-0 transition-opacity duration-700";
  canvas.setAttribute("aria-hidden", "true"); // the figure's picture already describes it
  stage.append(canvas);

  const scene = new Scene();
  const pmrem = new PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  pmrem.dispose();

  const camera = new PerspectiveCamera(30, 1, 0.05, 100);
  const turntable = new Group();
  scene.add(turntable);

  let radius = 1;
  let target = new Vector3();
  const fit = () => {
    const { width, height } = stage.getBoundingClientRect();
    if (!width || !height) return;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    // Keep the whole turning car in view: fit its bounding sphere in the narrower field of view
    const vFov = (camera.fov * Math.PI) / 180;
    const hFov = 2 * Math.atan(Math.tan(vFov / 2) * camera.aspect);
    const dist = radius / Math.sin(Math.min(vFov, hFov) / 2);
    const dir = new Vector3(1, 0.42, 1).normalize();
    camera.position.copy(target).addScaledVector(dir, dist * 0.8);
    camera.lookAt(target);
    camera.updateProjectionMatrix();
  };

  const draco = new DRACOLoader().setDecoderPath(figure.dataset.draco);
  const loader = new GLTFLoader().setDRACOLoader(draco);
  loader.load(
    figure.dataset.src,
    (gltf) => {
      const car = gltf.scene;
      // Centre the car on the turntable, wheels on the ground (y = 0)
      const box = new Box3().setFromObject(car);
      const size = box.getSize(new Vector3());
      const centre = box.getCenter(new Vector3());
      car.position.set(-centre.x, -box.min.y, -centre.z);
      turntable.add(car);
      turntable.rotation.y = START;

      const shadow = new Mesh(
        new PlaneGeometry(1, 1),
        new MeshBasicMaterial({ map: shadowTexture(), transparent: true, depthWrite: false }),
      );
      const reach = Math.max(size.x, size.z) * 1.05;
      shadow.scale.set(reach, reach, 1);
      shadow.rotation.x = -Math.PI / 2;
      shadow.position.y = 0.001;
      scene.add(shadow);

      radius = Math.hypot(size.x, size.z) / 2 + size.y * 0.15;
      target = new Vector3(0, size.y * 0.38, 0);
      fit();
      draco.dispose();

      start();
      requestAnimationFrame(() => {
        canvas.classList.remove("opacity-0");
        still.classList.add("opacity-0");
      });
    },
    undefined,
    () => canvas.remove(), // the model did not load: the still picture stays
  );

  // Turning, paused and on screen
  let paused = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let visible = false;
  const timer = new Timer();
  const frame = (t) => {
    timer.update(t);
    if (!paused) turntable.rotation.y += SPEED * timer.getDelta();
    renderer.render(scene, camera);
  };
  const loop = () => renderer.setAnimationLoop(visible && turntable.children.length ? frame : null);
  const start = () => {
    timer.reset();
    loop();
    renderer.render(scene, camera);
  };

  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    timer.reset();
    loop();
  }).observe(stage);
  new ResizeObserver(() => {
    fit();
    if (turntable.children.length) renderer.render(scene, camera);
  }).observe(stage);

  const sync = () => {
    toggle.setAttribute("aria-label", paused ? toggle.dataset.labelPlay : toggle.dataset.labelPause);
    toggle.querySelector("[data-icon-pause]").classList.toggle("hidden", paused);
    toggle.querySelector("[data-icon-play]").classList.toggle("hidden", !paused);
  };
  toggle.addEventListener("click", () => {
    paused = !paused;
    timer.reset();
    sync();
  });
  toggle.hidden = false;
  sync();
}

document.querySelectorAll("[data-car3d]").forEach(setup);

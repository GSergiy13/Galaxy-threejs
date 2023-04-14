import * as THREE from "three";
import coreSpace from "./modules/core.js";
import {
  mobileOptionsTwo,
  desktopOptionsTwo,
  orbitalLinesTwo,
} from "./ObjectsControlModelsTwo/index.js";

window.addEventListener("DOMContentLoaded", function () {
  const canvas = document.querySelector("canvas.texture");

  // Scene
  const scene = new THREE.Scene();

  // Sizes
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  // Camera
  const camera = new THREE.PerspectiveCamera(
    30,
    sizes.width / sizes.height,
    0.1,
    1500
  );

  scene.add(camera);

  // Renderer
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
  });

  renderer.info.autoReset = false;

  renderer.setSize(sizes.width, sizes.height);
  // renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setPixelRatio(window.devicePixelRatio);

  let ObjectsControlModels = [
    mobileOptionsTwo,
    desktopOptionsTwo,
    orbitalLinesTwo,
  ];
  coreSpace({
    three: THREE,
    canvas: canvas,
    scene: scene,
    camera: camera,
    renderer: renderer,
    sizes: sizes,
    ObjectsControlModels: ObjectsControlModels,
    trigers: true,
  });

  const $curtain = document.querySelector(".blind");

  window.onload = function () {
    const preloader = document.querySelector(".preloader-container");
    preloader.style.display = "none";
  };
});
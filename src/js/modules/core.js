import { Interaction } from "three.interaction";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { KTX2Loader } from "three/examples/jsm/loaders/KTX2Loader.js";
import firefliesVertexShader from "./shaders/fireflies/vertex.js";
import firefliesFragmentShader from "./shaders/fireflies/fragment.js";

import { Satellits } from "./satellits/index.js";
import { PanelAnimation } from "./panelAnimations/index.js";
import { Sun } from "./sun/index.js";
import { SunAtmosphere } from "./sunAtmosphere/index.js";
import { SetTitleOnPlanets } from "./setTitleOnPlanets/setTitleOnPlanets.js";
import orbitalLine from "./orbitalLines/orbitalLines.js";

import { Planets } from "./planets/index.js";
import { Cursor } from "./castomCursor/index.js";
import { Scroll } from "./Scroll/scroll.js";
import navigation from './navigation/navigation.js';

// import Stats from "./Status/Status.js";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

function coreSpace({ three: THREE, scene: scene, camera: camera, renderer: renderer, sizes: sizes, canvas: canvas, ObjectsControlModels: ObjectsControlModels, trigers: trigers, } = {}) {
  const [mobileOptions, desktopOptions, orbitalLines] = ObjectsControlModels;
  const $header = document.querySelector('.header');

  // const stats = new Stats();
  // stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
  // document.body.appendChild(stats.dom);

  window.scrollTo(0, 0);

  const data = document.querySelector(".data");
  let positionMash = [];

  data.innerHtml += `${window.innerHeight}`;

  const manager = new THREE.LoadingManager();

  const mobileDeviceNumber = 1200;
  let mobileDevice = sizes.width <= mobileDeviceNumber ? true : false;
  const gltfLoader = new GLTFLoader(manager);
  const cubeTextureLoader = new THREE.CubeTextureLoader();
  const textureLoader = new THREE.TextureLoader();
  let firstAnimationActive = true;
  let scrollAnimationAnd = true;
  let cameraAnimationTime = 1;

  const planetObjects =
    sizes.width < sizes.height ? mobileOptions : desktopOptions;

  const panelAnimations = new PanelAnimation(planetObjects);
  const planets = new Planets(THREE, scene, planetObjects, gltfLoader, KTX2Loader);
  let satellits = null;

  if (trigers) {
    satellits = new Satellits(THREE, scene, planetObjects);
  }

  panelAnimations.init();

  const numl = 0;

  const sun = new Sun(THREE, scene, positionMash);
  new SunAtmosphere(THREE, scene, planetObjects);

  // center point
  const centerGeometry = new THREE.SphereBufferGeometry(0.1, 32, 16);
  const centerMaterial = new THREE.MeshBasicMaterial({
    color: "yellow",
    wireframe: true,
  });
  let centerPoint = new THREE.Mesh(centerGeometry, centerMaterial);

  const interaction = new Interaction(renderer, scene, camera);

  centerPoint.position.x = planetObjects[numl].lookAtPosition.x;
  centerPoint.position.y = planetObjects[numl].lookAtPosition.y;
  centerPoint.position.z = planetObjects[numl].lookAtPosition.z;

  scene.add(centerPoint);
  const lightPosition = [
    [3000, 0, 0],
    [0, 3000, 0],
    // [0, 0, 3000],
    // [-3000, 0, 0],
    // [0, -3000, 0],
    // [0, 0, -3000],
  ];

  lightPosition.forEach((element) => {
    const light = new THREE.DirectionalLight("#bfe6ff", 0.9);
    light.position.set(...element);
    scene.add(light);
  });

  const sunLight = new THREE.PointLight("#9e907c", 1.9);

  sunLight.position.set(0, 0, 0);
  scene.add(sunLight);

  const environmantMap = cubeTextureLoader.load([
    "img/static/backgrounds/px.png",
    "img/static/backgrounds/nx.png",
    "img/static/backgrounds/py.png",
    "img/static/backgrounds/ny.png",
    "img/static/backgrounds/pz.png",
    "img/static/backgrounds/nz.png",
  ]);

  scene.background = environmantMap;

  //pices
  const fireflisesGeometry = new THREE.BufferGeometry();

  const fireflisesCount = 1500;

  const positionArray = new Float32Array(fireflisesCount * 2);

  const scaleArray = new Float32Array(fireflisesCount);

  for (let i = 0; i < fireflisesCount; i++) {
    positionArray[i * 3 + 0] = getRandomIntInclusive(-150, 150);
    positionArray[i * 3 + 1] = getRandomIntInclusive(-150, 150);
    positionArray[i * 3 + 2] = getRandomIntInclusive(-150, 150);

    scaleArray[i] = Math.random();
  }

  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  fireflisesGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positionArray, 3)
  );

  fireflisesGeometry.setAttribute(
    "aScale",
    new THREE.BufferAttribute(scaleArray, 1)
  );

  const fireflisesMaterial = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 1) },
      uSize: { value: 2000 },
    },

    vertexShader: firefliesVertexShader,
    fragmentShader: firefliesFragmentShader,
    transparent: true,
    depthTest: false,
  });

  const fireflies = new THREE.Points(fireflisesGeometry, fireflisesMaterial);
  scene.add(fireflies);

  // Controls
  // const controls = new OrbitControls(camera, canvas);
  // controls.enableDamping = true;

  orbitalLine(THREE, scene, orbitalLines);

  let titlePlanets = new SetTitleOnPlanets(
    desktopOptions,
    positionMash,
    THREE,
    scene
  );

  titlePlanets.init();

  //cursor
  const cursor = new Cursor(
    mobileDevice,
    planetObjects,
    animation,
    THREE,
    scene
  );

  cursor.run();
  cursor.click();


  // Animate
  const clock = new THREE.Clock();

  const staticCameraPosition = {
    x: camera.position.x,
    z: camera.position.z,
  };

  function cameraPositionAnimation() {
    if (firstAnimationActive && scrollAnimationAnd) {
      cameraAnimationTime += 0.0002;

      camera.position.x =
        planetObjects[0].cameraPosition.x(cameraAnimationTime);
      camera.position.z =
        planetObjects[0].cameraPosition.z(cameraAnimationTime);
    }
  }

  const tick = () => {
    // stats.begin();
    const elapsedTime = clock.getElapsedTime();

    // monitored code goes here

    // Update controls
    // controls.update();
    positionMash.map((item) => item.quaternion.copy(camera.quaternion));

    cameraPositionAnimation();

    sun.update();

    fireflisesMaterial.uniforms.uTime.value = elapsedTime;

    camera.lookAt(centerPoint.position);

    planets.update(elapsedTime);

    if (trigers) {
      satellits.run(elapsedTime * 0.5);
    }
    renderer.render(scene, camera);

    window.requestAnimationFrame(tick);
    // stats.end();
  };

  tick();

  // controls.addEventListener("change", (event) => {
  //   console.log(controls.object.position);
  // });

  function firstAnimation(number) {
    cameraAnimationTime = 0;
    number === 0
      ? (firstAnimationActive = true)
      : (firstAnimationActive = false);
  }

  // визов для mobile

  animation(0);
  titlePlanets.changeOpasitiTitle(0);

  function animation(animationNumber) {
    if (animationNumber < planetObjects.length) {
      if (animationNumber < planetObjects.length - 1) {
        canvas.style.position = "fixed";
      }

      function coordinateParameter(coordinateAxis) {
        if (
          typeof planetObjects[animationNumber].cameraPosition[
          coordinateAxis
          ] === "function"
        ) {
          if (planetObjects[1].scrollAnimationNumber) {
            return planetObjects[animationNumber].cameraPosition[
              coordinateAxis
            ](planetObjects[1].scrollAnimationNumber);
          } else {
            return planetObjects[animationNumber].cameraPosition[
              coordinateAxis
            ](cameraAnimationTime);
          }
        } else {
          return planetObjects[animationNumber].cameraPosition[coordinateAxis];
        }
      }

      gsap.to(camera.position, {
        x: coordinateParameter("x"),
        y: coordinateParameter("y"),
        z: coordinateParameter("z"),

        duration: 1.7,
        onStart: function () {
          firstAnimation(animationNumber);
          if (true) {
            scrollAnimationAnd = false;
          }
          document.querySelector("body").style.overflow = "hidden";

          if (animationNumber === 1) {
            document.querySelector(
              ".text-discription-container"
            ).style.pointerEvents = "none";
          } else {
            document.querySelector(
              ".text-discription-container"
            ).style.pointerEvents = "auto";
          }

          panelAnimations.paenlHide(animationNumber);
        },
        onComplete: function () {
          if (true) {
            scrollAnimationAnd = true;
          }

          if (animationNumber === 1) {
            document.querySelector("body").style.overflow = "visible";
          }
          panelAnimations.panelShow(animationNumber);
        },
      });

      if (planetObjects[animationNumber].startPosition) {
        titlePlanets.changeOpasitiTitle(0);

        gsap.to($header, {
          opacity: 0,
          duration: 1
        })
      } else {
        titlePlanets.changeOpasitiTitle(1);

        gsap.to($header, {
          opacity: 1,
          duration: 1
        })
      }
    }
  }

  navigation(animation, desktopOptions);

  function paenlResize() {
    const $panelElement = document.querySelectorAll(".panel");
    const descriptionElement = document.querySelectorAll(
      ".section-item-description"
    );

    if (sizes.width <= 560) {
      const bottomText = document.querySelectorAll(
        ".section-item-description__bottom"
      );
      bottomText.forEach((section) => {
        section.style.height = `${window.innerHeight}px`;
      });
    }

    $panelElement.forEach((section) => {
      section.style.height = `${window.innerHeight}px`;
    });
    descriptionElement.forEach((section) => {
      section.style.height = `${window.innerHeight}px`;
    });
  }

  paenlResize();

  window.addEventListener("resize", () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    mobileDevice = sizes.width <= mobileDeviceNumber ? true : false;

    paenlResize();
  });

  const scroll = new Scroll(camera, planetObjects, sizes, renderer, scene);

  window.addEventListener("scroll", scroll);
}

export default coreSpace;
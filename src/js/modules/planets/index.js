import fragmentShader from "../shaders/atmosphere/fragment.js";
import vertexShader from "../shaders/atmosphere/vertex.js";
import { decreaseNumber } from "../functions/index.js";

export class Planets {
  constructor(THREE, scene, planetObjects, gltfLoader) {
    this.THREE = THREE;
    this.scene = scene;
    this.gltfLoader = gltfLoader;
    this.planetObjects = planetObjects;
    this.init();
  }

  init() { 
    this.planetObjects.forEach(element => {
      if (!element.model) return;
        // Hover Efects Planets
        let newSizePlanetsHover = [...element.size].map(elme => elme * 1.5);
        
        let uniforms = {
          coeficient: {
            type: "f",
            value: 1,
          },
          // power: {
          //   type: "f",
          //   value: 2,
          // },
          glowColor: {
            type: "c",
            value: new this.THREE.Color("0x00ff00"),
          },
        };

        let planetsMaterial = new this.THREE.ShaderMaterial({
          uniforms: uniforms,
          vertexShader: vertexShader,
          fragmentShader: fragmentShader,
          blending: this.THREE.NormalBlending,
          transparent: true,
          depthWrite: false,
          // side: this.THREE.DoubleSide,
        });

        let planetsHoverSphere = new this.THREE.SphereBufferGeometry(0.5, 32, 25);
        let planetsHoverMesh = new this.THREE.Mesh(planetsHoverSphere, planetsMaterial);

        planetsHoverMesh.position.set(
          decreaseNumber(element.startPosition.x),
          decreaseNumber(element.startPosition.y),
          decreaseNumber(element.startPosition.z)
        );

        planetsHoverMesh.scale.set(...newSizePlanetsHover);
        element.sphereHover = planetsHoverMesh;
        // --- end

        const textureLoader = new this.THREE.TextureLoader();

        const doorColorTexture = textureLoader.load(`../img/static/textures/planets/${element.model}_Base.jpg`);
        const doorRoughnessTexture = textureLoader.load("../img/static/textures/planets/roughness.jpg");
        const doorNormalTexture = textureLoader.load(`../img/static/textures/planets/${element.model}_Normal.jpg`);

        element.sphere = new this.THREE.Group();

        const sphere_geometry = new this.THREE.SphereGeometry(0.5, 32, 25);
        const material = new this.THREE.MeshStandardMaterial();

        material.metalness = 0;
        material.transparent = true;
        material.roughness = 1;
        material.map = doorColorTexture;
        material.aoMapIntensity = 1;
        material.displacementScale = 0.05;
        material.roughnessMap = doorRoughnessTexture;
        material.normalMap = doorNormalTexture;
        material.normalScale.set(0.6, 0.5);

        element.sphere = new this.THREE.Mesh(sphere_geometry, material);

        element.sphere.scale.set(...element.size);

        element.sphere.position.set(
          decreaseNumber(element.startPosition.x),
          decreaseNumber(element.startPosition.y),
          decreaseNumber(element.startPosition.z)
        )

        this.scene.add(element.sphere, element.sphereHover);
    });
  }

  update(elapsedTime) {
    for (let i = 3; i < this.planetObjects.length; i++) {
      i % 2 === 0
        ? (this.planetObjects[i].sphere.rotation.y = (elapsedTime / 15) * -1)
        : (this.planetObjects[i].sphere.rotation.y = -(elapsedTime / 15) * -1);
    }
  }
  
}
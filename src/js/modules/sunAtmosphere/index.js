import fragmentShader from "../shaders/atmosphere/fragment.js";
import vertexShader from "../shaders/atmosphere/vertex.js";

export class SunAtmosphere {
  constructor(THREE, scene, planetObjects) {
    this.THREE = THREE;
    this.scene = scene;
    this.planetObjects = planetObjects;
    this.init();
  }
  
  init() {
    let uniforms = {
      coeficient: {
        type: "f",
        value: -0.42,
      },
      power: {
        type: "f",
        value: 2,
      },
      glowColor: {
        type: "c",
        value: new this.THREE.Color("red"),
      }
    };

    let sunMaterial = new this.THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      blending: this.THREE.NormalBlending,
      transparent: true,
      depthWrite: false,
    });

    let sunSphere = new this.THREE.SphereBufferGeometry(34, 100, 32);
    let sunMesh = new this.THREE.Mesh(sunSphere, sunMaterial);

    this.planetObjects[2].sphereHover = sunMesh;

    this.scene.add(sunMesh);
  }
}

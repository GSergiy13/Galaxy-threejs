import { decreaseNumber } from "../functions/index.js";
import { gorisontalPosition } from "./satellitsParameters.js";

export class Satellits {
  constructor(THREE, scene, planetObjects) {
    this.THREE = THREE;
    this.scene = scene;
    this.planetObjects = planetObjects;
    this.randomNumbers = [];
    this.distanceNumber = 2.5;
    this.planet1Satelits = [1.5];

    this.init();
    // this.positionInit();
  }


  getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; 
  }

  init() {
    // random
    // console.log(satellitsParameters.x());

    for (let i = 0; i < 6; i++) {
      this.randomNumbers.push(this.randomNumber(18, -10));
    }

    this.planetObjects.forEach((element) => {
      if (element.model) {
        // satellite
        element.satellites = [];

        for (let index = 0; index < 6; index++) {
          let randomNumer = this.getRandomIntInclusive(2, 14);
          const textureLoader = new this.THREE.TextureLoader();

    
          const doorColorTexture = textureLoader.load(
            `../img/static/textures/planets/${(randomNumer < 10) ? '0' + randomNumer : randomNumer }_Base.jpg`
          );

          const doorNormalTexture = textureLoader.load(
            `../img/static/textures/planets/${(randomNumer < 10) ? '0' + randomNumer : randomNumer }_Normal.jpg`
          );

          const sattelitGeometry = new this.THREE.SphereGeometry(
            this.randomNumber(1, 0.3),
            32,
            16
          );

          const satellitMaterial = new this.THREE.MeshStandardMaterial();

          satellitMaterial.metalness = 0;
          satellitMaterial.roughness = 1;
          satellitMaterial.map = doorColorTexture;
          satellitMaterial.aoMapIntensity = 1;
          satellitMaterial.displacementScale = 0.05;
          satellitMaterial.normalMap = doorNormalTexture;
          satellitMaterial.normalScale.set(0.3, 0.4);

          const satellitMash = new this.THREE.Mesh(
            sattelitGeometry,
            satellitMaterial
          );

          element.satellites.push(satellitMash);

          this.scene.add(satellitMash);
        }
      }
    });
  }

  randomNumber(max, min) {
    return Math.random() * (max - min) + min;
  }

  run(elapsedTime) {
    this.planetObjects.forEach((element) => {
      if (element.satellites) {
        element.satellites.forEach((satellit, index) => {
          //gorisintal
          if (index === 0) {
            satellit.position.x = gorisontalPosition.x(
              element.startPosition.x,
              1 + elapsedTime,
              element.size[0],
              this.distanceNumber
            );
            // Y
            satellit.position.z = gorisontalPosition.z(
              element.startPosition.z,
              1 + elapsedTime,
              element.size[0],
              this.distanceNumber
            );
          } else if (index === 1) {
            // vertical 45
            satellit.position.x =
              decreaseNumber(element.startPosition.x) +
              Math.sin(6 + elapsedTime) * (element.size[0] / 2);
            // Y
            satellit.position.y =
              decreaseNumber(element.startPosition.y) +
              Math.sin(6 + elapsedTime) * (element.size[0] / 2);
            // Z
            satellit.position.z =
              decreaseNumber(element.startPosition.z) +
              Math.cos(6 + elapsedTime) * (element.size[0] / 2);
          }
          // 2
          else if (index === 2) {
            // vertical
            satellit.position.x =
              decreaseNumber(element.startPosition.x) +
              Math.sin(4.5 + elapsedTime) *
                (element.size[0] / 2 + this.distanceNumber);
            // Y
            satellit.position.y =
              decreaseNumber(element.startPosition.y) +
              Math.cos(4.5 + elapsedTime) *
                (element.size[0] / 2 + this.distanceNumber);
            // Z
            satellit.position.z = decreaseNumber(element.startPosition.z);
          } else if (index === 3) {
            // gorisontal
            satellit.position.x = gorisontalPosition.x(
              element.startPosition.x,
              5 + elapsedTime,
              element.size[0],
              this.distanceNumber
            );
            // console.log(satellit.position.x);

            // Y
            satellit.position.z = gorisontalPosition.z(
              element.startPosition.z,
              5 + elapsedTime,
              element.size[0],
              this.distanceNumber
            );
            // Z
            // satellit.position.y = gorisontalPosition.y(element.startPosition.y);
          } else if (index === 4) {
            // vertical;
            satellit.position.x =
              decreaseNumber(element.startPosition.x) +
              Math.sin(2 + elapsedTime) *
                (element.size[0] / 2 + this.distanceNumber);
            // Y
            satellit.position.y =
              decreaseNumber(element.startPosition.y) +
              Math.cos(2 + elapsedTime) *
                (element.size[0] / 2 + this.distanceNumber);
            // Z
            satellit.position.z = decreaseNumber(element.startPosition.z);
          } else if (index === 5) {
            // vertical 45
            satellit.position.x =
              decreaseNumber(element.startPosition.x) +
              Math.sin(3 + elapsedTime) * (element.size[0] / 2);
            // Y
            satellit.position.y =
              decreaseNumber(element.startPosition.y) +
              Math.cos(3 + elapsedTime) * (element.size[0] / 2);
            // Z
            satellit.position.z =
              decreaseNumber(element.startPosition.z) +
              Math.cos(3 + elapsedTime) * (element.size[0] / 2);
          }
        });
      }
    });
  }
}

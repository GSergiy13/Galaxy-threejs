import { decreaseNumber } from "../functions/index.js";

export class SetTitleOnPlanets {
  constructor(arrPlanets, newArrPosition, THREE, scene) {
    this.arrPlanets = arrPlanets;
    this.newArrPosition = newArrPosition;
    this.THREE = THREE;
    this.scene = scene;
    this.meshTitle = {
      color: 0xffffff,
      transparent: true,
      opacity: 1,
    };
    this.textMesh = [];
  }

  init() {
    let newArrTitle = this.arrPlanets.filter((item) => item.title);
    for (let i = 0; i < newArrTitle.length; i++) {
      const fontLoader = new this.THREE.FontLoader();

      fontLoader.load(
        "img/static/fonts/helvetiker_regular.typeface.json",
        (font) => {
          fontLoader.load(
            "img/static/fonts/helvetiker_regular.typeface.json",
            (font) => {
              // Material
              const material = new this.THREE.MeshMatcapMaterial(
                this.meshTitle
              );

              // Text
              const textGeometry = new this.THREE.TextBufferGeometry(
                `${newArrTitle[i].title}`,
                {
                  font: font,
                  size: 1.8,
                  height: 0.2,
                  curveSegments: 12,
                  bevelEnabled: true,
                  bevelThickness: 0.03,
                  bevelSize: 0.02,
                  bevelOffset: 0,
                  bevelSegments: 5,
                }
              );

              textGeometry.center();

              const text = new this.THREE.Mesh(textGeometry, material);
              text.position.set(
                decreaseNumber(newArrTitle[i].startPosition.x),
                newArrTitle[i].size[1] / 2 +
                  decreaseNumber(newArrTitle[i].startPosition.y) +
                  5,
                decreaseNumber(newArrTitle[i].startPosition.z)
              );

              this.textMesh.push(text);

              this.scene.add(text);
              this.newArrPosition.push(text);
            }
          );
        }
      );
    }
  }

  changeOpasitiTitle(i) {
    this.changeOpasiti = i;

    this.newArrPosition.forEach((mesh) => {
      // mesh.material.opacity = i

      gsap.to(mesh.material, {
        opacity: i,
        duration: 2,
      });
    });
  }
}
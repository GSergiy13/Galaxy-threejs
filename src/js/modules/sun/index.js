import sunFragmentShader from "../shaders/sun/fragment.js";
import sunVertexShader from "../shaders/sun/vertex.js";

export class Sun {
  constructor(THREE, scene, newArrPosition) {
    this.THREE = THREE;
    this.scene = scene;
    this.newArrPosition = newArrPosition;
    this.material;
    this.init();
  }
  init() {
    let sunGroup = new this.THREE.Object3D();
    const textureLoader = new this.THREE.TextureLoader();

    let uniforms = {
      time: {
        type: "f",
        value: 1.0,
      },
      texture1: {
        type: "t",
        value: textureLoader.load("img/static/textures/sunAtmosphereMaterial.png"),
      },
      texture2: {
        type: "t",
        value: textureLoader.load("img/static/textures/sunSurfaceMaterial.jpg")
      },
    };

    uniforms.texture1.value.wrapS = uniforms.texture1.value.wrapT =
      this.THREE.Repeat;
    uniforms.texture2.value.wrapS = uniforms.texture2.value.wrapT =
      this.THREE.Repeat;

    this.material = new this.THREE.ShaderMaterial({
      vertexShader: sunVertexShader,
      fragmentShader: sunFragmentShader,
      uniforms: uniforms,
    });

    const sonTitle = new this.THREE.FontLoader();

    sonTitle.load(
      "img/static/fonts/helvetiker_regular.typeface.json",
      (font) => {
        sonTitle.load(
          "img/static/fonts/helvetiker_regular.typeface.json",
          (font) => {
            // Material
            const material = new this.THREE.MeshMatcapMaterial(
              this.meshTitle
            );

            // Text
            const textGeometry = new this.THREE.TextBufferGeometry(
              `Сонце`,

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

            const textSun = new this.THREE.Mesh(textGeometry, material);
            textSun.position.set(0, 30, 0);


            // this.textMesh.push(text);
            console.log(textGeometry)
            this.scene.add(textSun);
            this.newArrPosition.push(textSun);

          }
        );
      }
    );

    let geometry = new this.THREE.SphereBufferGeometry(25, 84, 84);
    let superSunMesh = new this.THREE.Mesh(geometry, this.material);

    sunGroup.add(superSunMesh);
    this.scene.add(sunGroup);
  }
  update() {
    this.material.uniforms.time.value += 0.01;
  }
}
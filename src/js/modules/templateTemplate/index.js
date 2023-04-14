export class AudioAccompaniment {
  constructor(planetObjects, THREE, scene) {
    this.THREE = THREE;
    this.scene = scene;
    this.planetObjects = planetObjects;
    this.$button = document.querySelector(".speaker-button");
    this.songPlay = true;
    this.sphere;
  }
  init() {
    const geometry = new this.THREE.SphereGeometry(15, 32, 16);
    const material = new this.THREE.MeshBasicMaterial({
      color: 0xffff00,
      wireframe: true,
    });
    this.sphere = new this.THREE.Mesh(geometry, material);
    this.scene.add(this.sphere);

    this.$button.addEventListener("click", () => {
      this.songToggle();
    });
  }
  animation(number) {
    this.sphere.rotation.y = number;
  }
  songToggle() {
    if (this.songPlay === false) {
      this.songPlay = true;
      this.$button.classList.remove("mute");
    } else {
      this.songPlay = false;
      this.$button.classList.add("mute");
    }
  }
  active(number) {}
}

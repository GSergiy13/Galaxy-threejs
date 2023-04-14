export class Scroll {
  constructor(camera, planetObjects, sizes, renderer, scene) {
    this.camera = camera;
    this.planetObjects = planetObjects;
    this.$scrollContainer = document.querySelector(".scroll-container");
    this.sizes = sizes;
    this.scrollStatus = 0;
    this.scrollAnimationNumber = 0;
    this.renderer = renderer;
    this.scene = scene;
    this.init();
  }
  init() {

    let scroll = () => {
      this.scrollStatus =
        (this.$scrollContainer.getBoundingClientRect().y * -1 * 100) /
        (this.$scrollContainer.clientHeight - this.sizes.height);

      this.scrollAnimationNumber =
        ((this.$scrollContainer.getBoundingClientRect().y * -1 + 1) *
          Math.PI *
          2) /
        (this.$scrollContainer.clientHeight - this.sizes.height);

      this.camera.position.x = this.planetObjects[1].cameraPosition.x(
        this.scrollAnimationNumber
      );
      this.camera.position.z = this.planetObjects[1].cameraPosition.z(
        this.scrollAnimationNumber
      );
      this.planetObjects[1].scrollAnimationNumber = this.scrollAnimationNumber;

      this.renderer.render(this.scene, this.camera);
    };

    scroll();

    window.addEventListener("scroll", scroll);
  }
}
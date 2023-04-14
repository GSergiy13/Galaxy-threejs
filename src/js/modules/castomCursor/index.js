export class Cursor  {
  constructor(mobileDevice, planetObjects, animation, THREE, scene) {
    this.$cursor = document.querySelector("#custom_cursor");
    this.$trackedElements = document.querySelectorAll(".cursor-pointer");
    this.body = document.querySelector("body");
    this.mobileDevice = mobileDevice;
    this.positionX = 0;
    this.positionY = 0;
    this.THREE = THREE;
    this.scene = scene;
    this.planetObjects = planetObjects;
    this.cameraAnimation = animation;
    this.firstClick = false;
  }

  run() { 
    if (!this.mobileDevice) {
      document.addEventListener("mousemove", (event) => {
      
        this.positionX = event.clientX;
        this.positionY = event.clientY;
        this.$cursor.style.top = `${this.positionY - 22}px`;
        this.$cursor.style.left = `${this.positionX - 22}px`;
      });

      this.$trackedElements.forEach((trackedElement) => {
        trackedElement.addEventListener("mouseover", () => {
          this.$cursor.classList.add("pointer");
        });

        trackedElement.addEventListener("mouseout", () => {
          this.$cursor.classList.remove("pointer");
        });
      });
    } else {
      // this.fixedPaenl();
      this.$cursor.style.display = "none";
    }
    this.addInteraction();
  }

  removeActiveClass(elemClass) { elemClass.forEach(elem =>  document.querySelector(elem).classList.remove('active'))}

  addInteraction() {
    let hoverStatus = [];

    this.planetObjects.forEach((objectItem, index) => {
      hoverStatus.push(true);
      if (objectItem.sphereHover) {
        // console.log(objectItem.sphereHover);
        let hoverPlanets = objectItem.sphereHover.material.opacity;

        objectItem.sphereHover.on("mouseover", () => {
          this.$cursor.classList.add("pointer");

          if (objectItem.name !== "sun position" && hoverStatus[index]) {
            hoverStatus[index] = false;

            gsap.to(objectItem.sphereHover.material.uniforms.coeficient, {
              value: -0.45,
              duration: 0.2,
            });
          }
        });

        objectItem.sphereHover.on("mouseout", () => {
          this.$cursor.classList.remove("pointer");

          if (objectItem.name !== "sun position" && !hoverStatus[index]) {
            hoverStatus[index] = true;

            gsap.to(objectItem.sphereHover.material.uniforms.coeficient, {
              value: 1,
              duration: 0.5,
            });
          }
        });

        objectItem.sphereHover.on("click", (ev) => {
          this.cameraAnimation(index);

          this.removeActiveClass([".navigation",".navigation__btn"]);
        });
      }
    });
  }

  click() {
    let click = () => {
      this.cameraAnimation(1);
      this.body.removeEventListener("click", click);

      gsap.to(document.querySelector('.text-discription-container-bg'), {
        backgroundColor: "rgb(0 0 0 / 0%)",
        duration: 1
      })
    };

    this.body.addEventListener("click", click);

    return this;
  }
}

export class PanelAnimation {
  constructor(planetObjects) {
    this.planetObjects = planetObjects;
    this.scrollInfo = document.querySelector(".scroll-info");
    this.$swipeInfo = document.querySelector(".swipe-info");
    this.textItems = document.querySelectorAll(".section-item-description");
    this.$textWitingElemnt = document.querySelectorAll(".writing-animation");
    this.wordArr = [];
    this.animationStart = [];
    this.speed = 40;
  }
  init() {
    this.$textWitingElemnt.forEach((item) => {
      this.animationStart.push(true);
      if (!item.children.length) {
        this.wordArr.push(item.innerHTML.split(""));
        item.innerHTML = "";
      } else {
        let childrenArr = [];
        [...item.children].forEach((element) => {
          childrenArr.push(element.innerHTML.split(""));

          element.innerHTML = "";
        });
        this.wordArr.push(childrenArr);
      }
    });
  }
  textWriting(number) {
    if (this.animationStart[number]) {
      this.animationStart[number] = false;
      let trackedElement = this.$textWitingElemnt[number];
      console.log(this.$textWitingElemnt[number])
      if (trackedElement.children.length) {
        if (this.wordArr[number]) {
          let intervalNumber = 0;
          let maxInterval = 0;
          let mainNumber = 0;
          let indexLetter = 0;
          let numberArr = [];

          this.wordArr[number].forEach((item) => {
            maxInterval += item.length;
            numberArr.push(item.length);
          });


          let intervel = setInterval(() => {
            trackedElement.children[mainNumber].innerHTML +=
              this.wordArr[number][mainNumber][indexLetter];
            trackedElement.children[mainNumber].classList.add("writing-cursor");

            indexLetter++;
            intervalNumber++;


            if (indexLetter === numberArr[mainNumber]) {
              trackedElement.children[mainNumber].classList.remove(
                "writing-cursor"
              );
              mainNumber++;
              indexLetter = 0;
            }

            if (intervalNumber >= maxInterval) {
              clearInterval(intervel);
              this.wordArr[number] = false;
            }
          }, this.speed);
        }
      } else {
        let intervalNumber = 0;
        trackedElement.classList.add("writing-cursor");
        let intervel = setInterval(() => {
          if (this.wordArr[number]) {

            trackedElement.innerHTML += this.wordArr[number][intervalNumber];


            intervalNumber++;
            if (intervalNumber >= this.wordArr[number].length) {
              clearInterval(intervel);
              this.wordArr[number] = false;
            }
          }
        }, this.speed);
      }
    }
  }
  panelShow(number) {
    this.opacityTitle = 0;
    let animationDirection = this.textItems[number].getAttribute("direction");
    this.textItems[number].classList.add(
      `section-item-description-${animationDirection}-active`
    );

    this.textItems[number].style.visibility = "visible";
    if (number !== 0 && number !== 1) {
      this.textWriting(number - 2);
    }
  }
  paenlHide(number) {
    if (number !== 1) {
      this.scrollInfo.classList.add("scroll-info-hide");
      this.$swipeInfo.classList.add("scroll-info-hide");
    } else {
      this.scrollInfo.classList.remove("scroll-info-hide");
      this.$swipeInfo.classList.remove("scroll-info-hide");
    }
    if (number < this.planetObjects.length) {
      this.textItems.forEach((item) => {
        item.style.visibility = "hidden";

        item.classList.remove("section-item-description-left-active");
        item.classList.remove("section-item-description-right-active");
        item.classList.remove("section-item-description-top-active");
      });
    }
  }
}
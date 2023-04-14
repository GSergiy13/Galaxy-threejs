import { decreaseNumber } from "../functions/index.js";

const gorisontalPosition = {
  x: (startPositionX, radian, planetDiameter, distance) =>
    decreaseNumber(startPositionX) +
    Math.sin(radian) * (planetDiameter / 2 + distance),

  y: (startPositionY) => decreaseNumber(startPositionY),

  z: (startPositionZ, radian, planetDiameter, distance) =>
    decreaseNumber(startPositionZ) +
    Math.cos(radian) * (planetDiameter / 2 + distance),
};

export { gorisontalPosition };

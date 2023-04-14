const mobileOptionsTwo = [
  {
    name: "start position",
    cameraPosition: {
      x: (num) => Math.sin(num) * 332.46460783452011,
      y: 100.19369643867758,
      z: (num) => Math.cos(num) * -332.68866097930993,
    },
    lookAtPosition: {
      x: 0,
      y: 1,
      z: 0,
    },
    // audio: "false",
  },
  {
    name: "scroll position",
    cameraPosition: {
      x: (num) => Math.sin(num) * 432.68866097930993,
      y: 160.19369643867758,
      z: (num) => Math.cos(num) * -432.68866097930993,
    },
    lookAtPosition: {
      x: 0,
      y: 1,
      z: 0,
    },
    // audio: "false",
  },
  {
    name: "sun position",
    cameraPosition: {
      x: -82.11420866550894,
      y: 33.49763978249311,
      z: -42.19800565250731,
    },
    lookAtPosition: {
      x: 10,
      y: 5,
      z: 0,
    },
    audio: "img/static/audio/sample4.aac",
  },
  {
    name: "planet1",
    startPosition: {
      x: -123.606,
      y: 0.659,
      z: -136.445,
    },
    // size: [4, 4, 4],
    size: [28.2, 28.2, 28.2],
    title: "Юпитер",
    model: "38",
    cameraPosition: {
      x: -125.068615710426,
      y: 13.532963446924807,
      z: -97.97770960807813,
    },
    lookAtPosition: {
      x: 0,
      y: 11,
      z: 0,
    },
    audio: "img/static/audio/Clock.mp3",
  },

  {
    name: "planet2",

    startPosition: {
      x: 163.094,
      y: 6.104,
      z: -87.437,
    },
    size: [28.8, 28.8, 28.8],
    title: "Сатурн",
    model: "34",
    cameraPosition: {
      x: 125.917302402284,
      y: 9.582796836538853,
      z: -52.370447679831926,
    },
    lookAtPosition: {
      x: 6,
      y: 5,
      z: 0,
    },
    audio: "img/static/audio/InAbstract.mp3",
  },

  {
    name: "planet3",
    startPosition: {
      x: -46.625,
      y: 0.909,
      z: 175.924,
    },
    size: [28, 28, 28],
    title: "Уран",
    model: "44",
    cameraPosition: {
      x: -74.95357337253901,
      y: 10.13275212979154,
      z: 149.83643822689865,
    },
    lookAtPosition: {
      x: 0,
      y: 20,
      z: 0,
    },
    audio: "img/static/audio/Clock.mp3",
  },
];

const desktopOptionsTwo = [
  {
    name: "start position",
    cameraPosition: {
      x: (num) => Math.sin(num) * 221.46460783452011,
      y: 100.19369643867758,
      z: (num) => Math.cos(num) * -332.68866097930993,
    },
    lookAtPosition: {
      x: 0,
      y: 1,
      z: 0,
    },
    // audio: "false",
  },
  {
    name: "scroll position",
    cameraPosition: {
      x: (num) => Math.sin(num) * 232.68866097930993,
      y: 90.19369643867758,
      z: (num) => Math.cos(num) * -232.68866097930993,
    },
    lookAtPosition: {
      x: 0,
      y: 1,
      z: 0,
    },
    // audio: "false",
  },
  {
    name: "sun position",
    cameraPosition: {
      x: 64.42066056860847,
      y: 26.892475184273135,
      z: -82.14729018361089,
    },
    lookAtPosition: {
      x: 10,
      y: 5,
      z: 0,
    },
    audio: "img/static/audio/sample4.aac",
  },
  {
    name: "planet1",
    startPosition: {
      x: -123.606,
      y: 0.659,
      z: -136.445,
    },
    size: [33, 33, 33],
    title: "Юпитер",
    model: "38",
    cameraPosition: {
      x: -125.068615710426,
      y: 13.532963446924807,
      z: -97.97770960807813,
    },
    lookAtPosition: {
      x: 0,
      y: 11,
      z: 0,
    },
    audio: "img/static/audio/Clock.mp3",
  },

  {
    name: "planet2",

    startPosition: {
      x: 163.094,
      y: 6.104,
      z: -87.437,
    },
    size: [22.8, 22.8, 22.8],
    title: "Сатурн",
    model: "34",
    cameraPosition: {
      x: 125.917302402284,
      y: 9.582796836538853,
      z: -52.370447679831926,
    },
    lookAtPosition: {
      x: 6,
      y: 5,
      z: 0,
    },
    audio: "img/static/audio/InAbstract.mp3",
  },

  {
    name: "planet3",
    startPosition: {
      x: -46.625,
      y: 0.909,
      z: 175.924,
    },
    size: [28, 28, 28],
    title: "Уран",
    model: "44",
    cameraPosition: {
      x: -74.95357337253901,
      y: 10.13275212979154,
      z: 149.83643822689865,
    },
    lookAtPosition: {
      x: 0,
      y: 20,
      z: 0,
    },
    audio: "img/static/audio/Clock.mp3",
  },
];

const orbitalLinesTwo = {
  // count: 5,
  ratius: [40, 70, 100],
  tube: 0.05,
  radialSegments: 6,
  tubularSegments: 100,
  rotation: [1.6, -1.7, 1.6, -1.6, -4.8],
};

export { mobileOptionsTwo, desktopOptionsTwo, orbitalLinesTwo };

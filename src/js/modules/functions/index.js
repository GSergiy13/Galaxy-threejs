const decreaseNumber = (num) => {
  const divider = 0.55;
  if (num) {
    return num * divider;
  } else {
    return num;
  }
};

export { decreaseNumber };

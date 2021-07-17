const radiansToDeg = (radians) => {
  return (radians/3284 * (180/Math.PI));
}

const randomBody = () => {
  return SHAPES[Math.round(Math.random() * 3)];
};

const randomColor = () => {
  return COLORS[Math.round(Math.random() * COLORS.length-1)];
};

const randomWeight = () => {
  return WEIGHT[Math.round(Math.random() * 3)];
};

const createBody = (type) => {
  let body;
  switch (type) {
    case 'rect':
      body = Bodies.rectangle(
        Math.round(Math.random() * 450 + 200),
        Math.round(Math.random() * 450 + 200),
        Math.round(Math.random() * 50 + 50), Math.round(Math.random() * 50 + 50),
        {
          render: {
            fillStyle: randomColor(),
          }
        });
      return body;
    case 'poly':
      body = Bodies.polygon(
        Math.round(Math.random() * 450 + 200),
        Math.round(Math.random() * 450 + 200),
        Math.round(Math.random() * 10 + 5),
        Math.round(Math.random() * 20 + 50),
        {
          render: {
            fillStyle: randomColor(),
          }
        }
      );
      return body;
    case 'circle':
      body = Bodies.circle(
        Math.round(Math.random() * 450 + 200),
        Math.round(Math.random() * 450 + 200),
        Math.round(Math.random() * 20 + 20),
        {
          render: {
            fillStyle: randomColor(),
          },
        },
      );
      return body;
    case 'triangle':
      body = Bodies.trapezoid(
        Math.round(Math.random() * 450 + 200),
        Math.round(Math.random() * 450 + 200),
        Math.round(Math.random() * 80 + 50),
        Math.round(Math.random() * 80 + 50),
        Math.round(Math.random() * 3+1),
        {
          render: {
            fillStyle: randomColor(),
          },
        },
      );
      return body;
  }
}

const clearWorld = () => {
  Composite.clear(engine.world);
  initializeBounds();
  setInputState(0);
  input.value = 0;
  setCounterState(3);
}
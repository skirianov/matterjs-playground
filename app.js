const Engine = Matter.Engine,
      Render = Matter.Render,
      Runner = Matter.Runner,
      Bodies = Matter.Bodies,
      Composite = Matter.Composite,
      Body = Matter.Body;

const engine = Engine.create();

const render = Render.create({
  element: document.getElementById('container'),
  engine: engine,
  options: {
    height: 1000,
    width: 1000,
    wireframes: false,
    background: '#eeeeee',
    hasBounds: true,
  },
});

Render.run(render);

const runner = Runner.create();

Runner.run(runner, engine);
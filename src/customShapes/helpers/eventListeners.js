import helpers from "./canvasHelpers";
import canvasState from "../canvasState";

const { canvas, ctx, completeBtn, addShapeBtn, width, height } = helpers;
let { vertices } = helpers;

let lastVertice;

canvas.addEventListener("mousedown", () => {
  if (canvasState.getInitialState() === "create") {
    let position = helpers.getCanvasMousePosition(canvas, event);
    let vertice = {
      x: position.x,
      y: position.y,
      name: vertices.length,
    };

    helpers.addPoint(vertice);
    lastVertice = vertices[vertices.length - 1];
  } else if (canvasState.getInitialState() === "edit") {
    let selected;
    canvas.onmousemove = () => {
      let position = helpers.getCanvasMousePosition(canvas, event);

      vertices.forEach((each) => {
        if (
          position.x > each.x - 5 &&
          position.x < each.x + 5 &&
          position.y > each.y - 5 &&
          position.y < each.y + 5
        ) {
          selected = Object.assign({}, each);
        }
      });

      if (selected) {
        let newVertice = {
          ...helpers.getCanvasMousePosition(canvas, event),
          name: selected.name,
        };
        let newVerticesArray = vertices.map((each) => {
          if (
            each.x === selected.x &&
            each.y === selected.y &&
            each.name === selected.name
          ) {
            return newVertice;
          }
          return each;
        });
        vertices = [...newVerticesArray];
      }
    };
  }
});

canvas.addEventListener("mouseup", () => {
  helpers.drawFromVertices(vertices);
  canvas.onmousemove = null;
});

complete.addEventListener("click", () => {
  helpers.drawFromVertices(vertices);
  canvasState.setInitialState("edit");
});

import helpers from "./canvasHelpers";
import canvasState from "../canvasState";

const { canvas, ctx, completeBtn, width, height } = helpers;

let lastVertice;
canvas.addEventListener("mousedown", () => {
  if (canvasState.getInitialState() === "create") {
    let position = helpers.getCanvasMousePosition(canvas, event);
    let vertice = {
      x: position.x,
      y: position.y,
      name: helpers.vertices.length,
    };

    helpers.addPoint(vertice);
    lastVertice = helpers.vertices[helpers.vertices.length - 1];
    helpers.drawFromVertices(helpers.vertices);
  } else if (canvasState.getInitialState() === "edit") {
    let selected;
    canvas.onmousemove = () => {
      let position = helpers.getCanvasMousePosition(canvas, event);

      helpers.vertices.forEach((each) => {
        if (
          position.x > each.x - 30 &&
          position.x < each.x + 30 &&
          position.y > each.y - 30 &&
          position.y < each.y + 30
        ) {
          selected = Object.assign({}, each);
        }
      });
      if (selected) {
        let newVertice = {
          ...helpers.getCanvasMousePosition(canvas, event),
          name: selected.name,
        };
        let newVerticesArray = helpers.vertices.map((each) => {
          if (
            each.x === selected.x &&
            each.y === selected.y &&
            each.name === selected.name
          ) {
            return newVertice;
          }
          return each;
        });
        helpers.vertices = [...newVerticesArray];
        helpers.drawFromVertices(helpers.vertices);
      }
    };
    canvas.onmouseup = () => {
      canvas.onmousemove = null;
    }
  }
});

completeBtn.addEventListener('click', () => {
  helpers.drawFromVertices(helpers.vertices);
  canvasState.setInitialState("edit");
});



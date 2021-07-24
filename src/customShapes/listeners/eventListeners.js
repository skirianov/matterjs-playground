import helpers from "../helpers/canvasHelpers";
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

      selected = helpers.checkIfSelected(position, helpers.vertices);
      if (selected) {
        // if point is selected, create a new vertices array and redraw
        let newVertice = helpers.verticeFromMousePosition(selected);
        let newVerticesArray = helpers.newArrayWithNewVertice(selected, newVertice, helpers.vertices);

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



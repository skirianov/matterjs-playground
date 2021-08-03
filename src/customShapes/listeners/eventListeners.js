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
      name: canvasState.getVertices().length,
    };

    helpers.addPoint(vertice);

    let localVertices = canvasState.getVertices();

    lastVertice = localVertices[localVertices.length - 1];
    console.log(localVertices);
    helpers.drawFromVertices(localVertices);
  } else if (canvasState.getInitialState() === "edit") {
    let selected;
    canvas.onmousemove = () => {
      let position = helpers.getCanvasMousePosition(canvas, event);

      selected = helpers.checkIfSelected(position, canvasState.getVertices());
      if (selected) {
        // if point is selected, create a new vertices array and redraw
        let newVertice = helpers.verticeFromMousePosition(selected);
        let newVerticesArray = helpers.newArrayWithNewVertice(selected, newVertice, canvasState.getVertices());

        canvasState.setVertices([...newVerticesArray]);
        helpers.drawFromVertices(canvasState.getVertices());
      }
    };
    canvas.onmouseup = () => {
      canvas.onmousemove = null;
      canvas.onmousedown = null;
    }
  }
});

completeBtn.addEventListener('click', () => {
  helpers.drawFromVertices(canvasState.getVertices());
  canvasState.setInitialState("edit");
});




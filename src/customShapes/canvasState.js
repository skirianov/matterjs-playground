let initialState = 'create'; // initial state = create || edit
let vertices = [];

const canvasState = {
  initialState,
  getInitialState: () => {
    return initialState;
  },
  setInitialState: (type) => {
    initialState = type;
  },
  vertices,
  getVertices: () => {
    return vertices;
  },
  setVertices: (array) => {
    vertices = array;
  }
}

export default canvasState;

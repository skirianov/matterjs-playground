let initialState = 'create'; // initial state = create || edit
let spinState = 'none';

const canvasState = {
  initialState,
  getInitialState: () => {
    return initialState;
  },
  setInitialState: (type) => {
    initialState = type;
  },
}

export default canvasState;

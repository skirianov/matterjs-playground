let initialState = 'create';

const canvasState = {
  initialState,
  getInitialState: () => {
    return initialState;
  },
  setInitialState: (type) => {
    initialState = type;
  }
}

export default canvasState;

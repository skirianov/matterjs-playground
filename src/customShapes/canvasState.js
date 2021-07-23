let initialState = 'create'; // initial state = create || edit

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

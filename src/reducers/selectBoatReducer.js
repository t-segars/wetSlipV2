export default (state = [], action) => {
  switch (action.type) {
    case 'SELECT_BOAT':
      return action.payload;
    default:
      return state;
  }
};

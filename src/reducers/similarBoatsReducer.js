export default (state = [], action) => {
  switch (action.type) {
    case 'SIMILAR_BOATS':
      return action.payload;
    default:
      return state;
  }
};

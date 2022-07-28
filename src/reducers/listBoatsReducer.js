export default (state = [], action) => {
  switch (action.type) {
    case 'LIST_BOATS':
      return action.payload;
    default:
      return state;
  }
};

export default (state = [], action) => {
  switch (action.type) {
    case 'CONVERSATION':
      return action.payload;
    default:
      return state;
  }
};

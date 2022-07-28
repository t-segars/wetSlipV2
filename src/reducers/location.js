export default (state = '', action) => {
  switch (action.type) {
    case 'LOCATION':
      return action.payload;
    default:
      return state;
  }
};

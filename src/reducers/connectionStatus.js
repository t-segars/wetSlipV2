export default (state = true, action) => {
  switch (action.type) {
    case 'CONNECTION_STATUS_UPDATE':
      return action.payload;
    default:
      return state;
  }
};

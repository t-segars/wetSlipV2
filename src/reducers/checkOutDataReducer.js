export default (state = [], action) => {
  switch (action.type) {
    case 'CHECKOUT_DATA':
      return action.payload;
    default:
      return state;
  }
};

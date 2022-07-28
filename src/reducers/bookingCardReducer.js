export default (state = {}, action) => {
  switch (action.type) {
    case 'BOOKING_CARD':
      return action.payload;
    default:
      return state;
  }
};

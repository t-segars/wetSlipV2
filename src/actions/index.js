import history from '../history';

//Add a boat
export const addBoat = (data) => (dispatch) => {
  dispatch({ type: 'ADD_BOAT', payload: data });
};

//Boat Result
export const listBoats = (data) => (dispatch) => {
  dispatch({ type: 'LIST_BOATS', payload: data });
};

//Select Boat
export const selectBoat = (data) => async (dispatch) => {
  const response = await data;

  if (response) {
    dispatch({ type: 'SELECT_BOAT', payload: response });
    history.push('/selectboat');
  }
};

//Boat Card
export const bookingCard = (fromDate, toDate, bookingDays, price) => async (
  dispatch
) => {
  dispatch({
    type: 'BOOKING_CARD',
    payload: { fromDate, toDate, bookingDays, price },
  });
};

//Similar Boats
export const similarBoats = (data) => async (dispatch) => {
  const response = await data;

  dispatch({ type: 'SIMILAR_BOATS', payload: response });
};

//Current user
export const currentUser = (data) => async (dispatch) => {
  const response = await data;

  dispatch({ type: 'CURRENT_USER', payload: response });
};

export const checkoutData = (data) => async (dispatch) => {
  const response = await data;

  dispatch({ type: 'CHECKOUT_DATA', payload: response });
};

// User Profile
export const userProfile = (data) => async (dispatch) => {
  const response = await data;

  dispatch({ type: 'USER_PROFILE', payload: response });
};

// conversation
export const conversation = (data) => async (dispatch) => {
  const response = await data;

  dispatch({ type: 'CONVERSATION', payload: response });
};

// location search
export const location = (data) => async (dispatch) => {
  const response = await data;

  dispatch({ type: 'LOCATION', payload: response });
};

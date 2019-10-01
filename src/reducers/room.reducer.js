export const SET_BILL_DATA = 'SET_BILL_DATA';
export const SET_SELECTED = 'SET_SELECTED';
export const SET_CART_ITEMS = 'SET_CART_ITEMS';

const roomReducer = (state, action) => {
  switch (action.type) {
    case SET_BILL_DATA:
      return {
        ...state,
        billData: action.value
      };
    case SET_SELECTED:
      return {
        ...state,
        billData: action.value
      };
    case SET_CART_ITEMS:
      return {
        ...state,
        cartData: action.value
      };
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
};

export default roomReducer;
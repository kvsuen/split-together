export const SET_BILL_DATA = 'SET_BILL_DATA';
export const SET_INITIAL_CART_ITEM = 'SET_INITIAL_CART_ITEM';
export const SET_IS_CHECKED = 'SET_IS_CHECKED';
export const SET_CART_ITEMS = 'SET_CART_ITEMS';
export const ON_ITEM_CHECK = 'ON_ITEM_CHECK';
export const ON_ITEM_UNCHECK = 'ON_ITEM_UNCHECK';

// This function is to merge existing state with the updated state item
// Otherwise we would be replacing state with just the updated state item
// without the previous state
const updateBillState = (state, id, bool) => {
  let itemToUpdate = { ...state.billData[id], is_checked: bool }

  return {
    ...state.billData,
    [id]: itemToUpdate
  }
}

const roomReducer = (state, action) => {
  switch (action.type) {
    case SET_BILL_DATA:
      return {
        ...state,
        billData: action.value
      };
      
    case SET_INITIAL_CART_ITEM:
      const ids = Object.keys(action.value);
      const idsAsNumber = ids.map(id => Number(id))
      return {
        ...state,
        cartData: idsAsNumber
      };

    case SET_IS_CHECKED:
      let billData = updateBillState(state, action.value, true);

      if (state.billData[action.value].is_checked) {
        billData = updateBillState(state, action.value, false);
      } 

      return {
        ...state,
        billData: billData
      };

    case SET_CART_ITEMS:
      return {
        ...state,
        cartData: action.value
      };

    case ON_ITEM_CHECK:
      if (!state.billData) return state;
      const checkBillData = updateBillState(state, action.value, true);
      return {
        ...state,
        billData: checkBillData
      };

    case ON_ITEM_UNCHECK:
      if (!state.billData) return state;
      const uncheckBillData = updateBillState(state, action.value, false);
      return {
        ...state,
        billData: uncheckBillData
      };

    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
};

export default roomReducer;

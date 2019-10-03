export const SET_BILL_DATA = 'SET_BILL_DATA';
export const SET_INITIAL_CART_ITEM = 'SET_INITIAL_CART_ITEM';
export const SET_ITEM_CHECKED = 'SET_ITEM_CHECKED';
export const SET_ITEM_UNCHECKED = 'SET_ITEM_UNCHECKED';
export const SET_CART_ITEMS = 'SET_CART_ITEMS';
export const SET_IS_HOST = 'SET_IS_HOST';
export const ADD_CART_ITEM = 'ADD_CART_ITEM';
export const REMOVE_CART_ITEM = 'REMOVE_CART_ITEM';
export const ON_ITEM_CHECK = 'ON_ITEM_CHECK';
export const ON_ITEM_UNCHECK = 'ON_ITEM_UNCHECK';
export const ON_REDIRECT = 'ON_REDIRECT';

// This function is to merge existing state with the updated state item
// Otherwise we would be replacing state with just the updated state item
// without the previous state
const updateBillState = (state, id, bool) => {
  let itemToUpdate = { ...state.billData[id], is_checked: bool };

  return {
    ...state.billData,
    [id]: itemToUpdate
  };
};

const roomReducer = (state, action) => {
  switch (action.type) {
    case SET_BILL_DATA:
      return {
        ...state,
        billData: action.value.items,
        hostId: action.value.host_id
      };

    case SET_INITIAL_CART_ITEM:
      const ids = Object.keys(action.value);
      const idsAsNumber = ids.map(id => Number(id));
      return {
        ...state,
        cartData: idsAsNumber
      };

    case SET_ITEM_CHECKED:
      return {
        ...state,
        billData: updateBillState(state, action.value, true)
      };

    case SET_ITEM_UNCHECKED:
      return {
        ...state,
        billData: updateBillState(state, action.value, false)
      };

    case SET_CART_ITEMS:
      return {
        ...state,
        cartData: action.value
      };
  
    case SET_IS_HOST:
        const res = action.value === state.hostId
        return {
          ...state,
          isHost: res
        };

    case ADD_CART_ITEM:
      return {
        ...state,
        cartData: action.value
      };

    case REMOVE_CART_ITEM:
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

    case ON_REDIRECT:
      return {
        ...state,
        redirect: true
      };

    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
};

export default roomReducer;

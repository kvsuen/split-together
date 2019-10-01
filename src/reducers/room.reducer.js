export const SET_BILL_DATA = 'SET_BILL_DATA';
export const SET_SELECTED = 'SET_SELECTED';
export const SET_CART_ITEMS = 'SET_CART_ITEMS';
export const ON_ITEM_CHECK = 'ON_ITEM_CHECK';
export const ON_ITEM_UNCHECK = 'ON_ITEM_UNCHECK';


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
    case ON_ITEM_UNCHECK:
      if (!state.billData) return state; 
      const bill = { ...state.billData[action.value], is_checked: false };

      const billData = {
        ...state.billData,
        [action.value]: bill
      };

      return {
        ...state,
        billData: billData
      };
    case ON_ITEM_CHECK:
      if (!state.billData) return state; 
      const bill2 = { ...state.billData[action.value], is_checked: true };
  
      const billData2 = {
        ...state.billData,
        [action.value]: bill2
      };

      return {
        ...state,
        billData: billData2
      };
      
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
};

export default roomReducer;
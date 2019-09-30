export const SET_PHOTO = 'SET_PHOTO';
export const SET_REDIRECT_BOOLEAN = 'SET_REDIRECT_BOOLEAN';
export const SET_ROOM_ID = 'SET_ROOM_ID';

const reducer = (state, action) => {
  switch (action.type) {
    case SET_PHOTO:
      return {
        ...state,
        photo: action.value
      };
    case SET_REDIRECT_BOOLEAN:
      return {
        ...state,
        redirect: action.value
      };
    case SET_ROOM_ID:
      return {
        ...state,
        roomId: action.value
      };
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
};

export default reducer;
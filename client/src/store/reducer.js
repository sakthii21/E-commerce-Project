// src/redux/reducer.js
const initialState = {
    user: null,
    isAuthenticated: false
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_USER':
        return {
          ...state,
          user: action.payload.user,
          isAuthenticated: action.payload.isAuthenticated
        };
      default:
        return state;
    }
  };
  
  export default authReducer;
  
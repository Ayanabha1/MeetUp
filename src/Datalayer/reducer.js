export const initialState = {
  userData: {},
  loggedIn: false,
  loading: false,
  successMessage: "",
  errorMessage: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        loading: action.loading,
      };
    case "SET_LOGIN_STATUS":
      return {
        ...state,
        loggedIn: action.loggedIn,
      };
    case "SET_USER_DATA":
      return {
        ...state,
        userData: action.userData,
      };

    default:
      return state;
  }
};

export default reducer;

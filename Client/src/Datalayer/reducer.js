export const initialState = {
  user: null,
  loggedIn: false,
  loginModalOpen: false,
  googleLoggedIn: false,
  loading: false,
  roomJoined: false,
};
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_LOGIN_STATUS":
      return {
        ...state,
        loggedIn: action.loggedIn,
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: action.loading,
      };
    case "SET_GOOGLE_LOGGEDIN":
      return {
        ...state,
        googleLoggedIn: action.googleLoggedIn,
      };
    case "SET_USER_DETAILS":
      return {
        ...state,
        user: action.user,
      };
    case "SET_LOGIN_MODAL_OPEN":
      return {
        ...state,
        loginModalOpen: action.loginModalOpen,
      };
    case "SET_SIGNUP_MODAL_OPEN":
      return {
        ...state,
        signUpModalOpen: action.signUpModalOpen,
      };
    case "SET_SOCKET":
      return {
        ...state,
        socket: action.socket,
      };
    case "SET_JOINED_ROOM":
      return {
        ...state,
        roomJoined: action.roomJoined,
      };
    default:
      return state;
  }
};

export default reducer;

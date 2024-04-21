import { useContext, createContext, useReducer } from "react";

const AuthContext = createContext();
const initialState = {
  user: null,
  isAuthenticated: false,
};

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function reducer(state, action) {
    switch (action.type) {
      case "login":
        return {
          ...state,
          user: {
            ...FAKE_USER,
            email: action.payload.email,
            password: action.payload.password,
          },
          isAuthenticated: true,
        };
      case "logout":
        return { ...state, user: null, isAuthenticated: false };
      default:
        throw new Error("Unknown action");
    }
  }
  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({
        type: "login",
        payload: { email: email, password: password },
      });
    }
  }
  function logout() {
    dispatch({ type: "logout" });
  }
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext was used outside AuthProvider");
  return context;
}
export { AuthProvider, useAuth };

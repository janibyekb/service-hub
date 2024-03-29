import { createContext, useEffect, useReducer } from "react";

const initialState = {
  user:
    localStorage.getItem("user") != undefined
      ? JSON.parse(localStorage.getItem("user"))
      : null,
  role: null,
};

export const authContext = createContext(initialState);

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        role: null,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload.user,
        role: action.payload.role,
      };

    case "LOGOUT":
      return {
        user: null,
        role: null,
      };

    default:
      break;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
    localStorage.setItem("role", JSON.stringify(state.role));
  }, []);

  return (
    <authContext.Provider
      value={{ user: state.user, role: state.role, dispatch }}
    >
      {children}
    </authContext.Provider>
  );
};

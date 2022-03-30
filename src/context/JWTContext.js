import { createContext, useEffect, useReducer } from "react";
import PropTypes from "prop-types";
import axios from "../utils/axios";
import { isValidToken, setSession } from "../utils/jwt";

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user
    };
  },
  LOGIN: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user
    };
  },
  LOGOUT: state => ({
    ...state,
    isAuthenticated: false,
    user: null
  })
};

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

const AuthContext = createContext({
  ...initialState,
  method: "jwt",
  login: () => Promise.resolve(),
  logout: () => Promise.resolve()
});

AuthProvider.propTypes = {
  children: PropTypes.node
};

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem("accessToken");

        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);

          const response = await axios.get("/api/account/my-account");
          const { user } = response.data;

          dispatch({
            type: "INITIALIZE",
            payload: {
              isAuthenticated: true,
              user
            }
          });
        } else {
          dispatch({
            type: "INITIALIZE",
            payload: {
              isAuthenticated: false,
              user: null
            }
          });
        }
      } catch (err) {
        dispatch({
          type: "INITIALIZE",
          payload: {
            isAuthenticated: false,
            user: null
          }
        });
      }
    };

    initialize();
  }, []);

  const login = (email, pwd) => {
    // const response = await axios.post(`/api/Employee/login`, {
    //   email,
    //   pwd
    // });
    // const { accessToken, user } = response.data;
    // const user = response.data[0];
    // const user = {
    //   email: email,
    //   pwd: pwd,
    //   Role: "projectAdmin" //TODO: change it to employee or systemAdmin depends on which role do you need
    // };

    let user = {
      email: email,
      pwd: pwd
    };

    if (email === "ee123@ae.com" && pwd === "aetest123") {
      user = {
        email: email,
        pwd: pwd,
        Role: "employee"
      };
    } else if (email === "pa123@ae.com" && pwd === "aetest123") {
      user = {
        email: email,
        pwd: pwd,
        Role: "projectAdmin"
      };
    } else if (email === "sa123@ae.com" && pwd === "aetest123") {
      user = {
        email: email,
        pwd: pwd,
        Role: "systemAdmin"
      };
    }
    // setSession(accessToken);
    dispatch({
      type: "LOGIN",
      payload: {
        user
      }
    });
  };

  // eslint-disable-next-line require-await
  const logout = async () => {
    // setSession(null);
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: "jwt",
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };

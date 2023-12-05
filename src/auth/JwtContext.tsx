import {createContext, useEffect, useReducer, useCallback, useMemo} from 'react';
// utils
import localStorageAvailable from 'src/utils/localStorageAvailable';
//
import {isValidToken, setSession} from 'src/auth/utils';
import {ActionMapType, AuthStateType, AuthUserType, JWTContextType} from 'src/auth/types';
import {SSOClient} from 'src/_clients';

// ----------------------------------------------------------------------

// NOTE:
// We only build demo at basic level.
// Customer will need to do some extra handling yourself if you want to extend the logic and other features...

// ----------------------------------------------------------------------

enum Types {
  INITIAL = 'INITIAL',
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
  LOGOUT = 'LOGOUT',
}

type Payload = {
  [Types.INITIAL]: {
    isAuthenticated: boolean;
    user: AuthUserType;
  };
  [Types.LOGIN]: {
    user: AuthUserType;
  };
  [Types.REGISTER]: {
    user: AuthUserType;
  };
  [Types.LOGOUT]: undefined;
};

type ActionsType = ActionMapType<Payload>[keyof ActionMapType<Payload>];

// ----------------------------------------------------------------------

const initialState: AuthStateType = {
  isInitialized: false,
  isAuthenticated: false,
  user: null,
};

const reducer = (state: AuthStateType, action: ActionsType) => {
  if (action.type === Types.INITIAL) {
    return {
      isInitialized: true,
      isAuthenticated: action.payload.isAuthenticated,
      user: action.payload.user,
    };
  }
  if (action.type === Types.LOGIN) {
    return {
      ...state,
      isAuthenticated: true,
      user: action.payload.user,
    };
  }
  if (action.type === Types.REGISTER) {
    return {
      ...state,
      isAuthenticated: true,
      user: action.payload.user,
    };
  }
  if (action.type === Types.LOGOUT) {
    return {
      ...state,
      isAuthenticated: false,
      user: null,
    };
  }
  return state;
};

// ----------------------------------------------------------------------

export const AuthContext = createContext<JWTContextType | null>(null);

// ----------------------------------------------------------------------

type AuthProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider({children}: AuthProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const storageAvailable = localStorageAvailable();

  const initialize = useCallback(async () => {
    try {
      const accessTokenWithRemember = storageAvailable ? localStorage.getItem('accessToken') : '';
      const accessTokenNoRemember = storageAvailable ? sessionStorage.getItem('accessToken') : '';

      const accessToken = accessTokenWithRemember || accessTokenNoRemember;

      if (accessToken && isValidToken(accessToken)) {
        // why this is here
        if (accessTokenWithRemember) setSession(accessToken, '', true);
        if (accessTokenNoRemember) setSession(accessToken, '', false);

        const response = await SSOClient.get('/oauth2/userinfo');

        const user = response.data.data;

        dispatch({
          type: Types.INITIAL,
          payload: {
            isAuthenticated: true,
            user,
          },
        });
      } else {
        dispatch({
          type: Types.INITIAL,
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: Types.INITIAL,
        payload: {
          isAuthenticated: false,
          user: null,
        },
      });
    }
  }, [storageAvailable]);

  useEffect(() => {
    initialize()
  }, [initialize]);

  // LOGIN
  const login = useCallback(async (email: string, password: string, exchangeCode: string, remember: boolean) => {
    const response = await SSOClient.post('/oauth2/auth', {
      email,
      password,
      exchangeCode,
    });
    const {accessToken, user} = response.data.data.oauth2;

    setSession(accessToken, "", remember);

    dispatch({
      type: Types.LOGIN,
      payload: {
        user,
      },
    });
  }, []);

  // LOGOUT
  const logout = useCallback(() => {
    setSession(null, null, false);
    dispatch({
      type: Types.LOGOUT,
    });
  }, []);

  const memoizedValue = useMemo(
    () => ({
      isInitialized: state.isInitialized,
      isAuthenticated: state.isAuthenticated,
      user: state.user,
      initialize,
      login,
      logout,
    }),
    [state.isAuthenticated, state.isInitialized, state.user, login, logout, initialize]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}

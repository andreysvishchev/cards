import { authAPI } from '../../api/AuthApi';
import { LoginDataType } from '../../api/ProfileApi';
import { changeAppStatus, setError } from '../../app/appReducer';
import { AppThunkType } from '../../common/hooks/hooks';
import { setUserData } from '../profile/profileReducer';

const initState = {
  isLoggedIn: false,
  id: '',
};

export const loginReducer = (
  state: InitStateType = initState,
  actions: LoginActionsType,
): InitStateType => {
  switch (actions.type) {
    case 'LOGIN/SET-IS-LOGGED-IN': {
      return { ...state, isLoggedIn: actions.payload.isLoggedIn, id: actions.payload.id };
    }
    default:
      return state;
  }
};

export const setIsLoggedIn = (isLoggedIn: boolean, id?: string) => {
  return {
    type: 'LOGIN/SET-IS-LOGGED-IN',
    payload: { isLoggedIn, id },
  } as const;
};

export const logout = () => {
  return {
    type: 'LOGIN/LOGOUT',
  } as const;
};

export const sendLoginData =
  (data: LoginDataType): AppThunkType =>
  dispatch => {
    dispatch(changeAppStatus('loading'));
    authAPI
      .login(data)
      .then(res => {
        if (res.statusText === 'OK') {
          dispatch(setIsLoggedIn(true, res.data._id));
          const { email, _id, name, publicCardPacksCount, avatar = 'ava' } = res.data;

          // аватар может быть undefined поэтому проверка
          if (avatar) {
            dispatch(setUserData(email, _id, name, publicCardPacksCount, avatar));
          }
        }
      })
      .catch(err => {
        dispatch(setError(err.response.data.error));
      })
      .finally(() => {
        dispatch(changeAppStatus('idle'));
      });
  };

export const logoutTC = (): AppThunkType => async dispatch => {
  dispatch(changeAppStatus('loading'));
  try {
    await authAPI.logout();
    dispatch(setIsLoggedIn(false));
  } catch (e: any) {
    dispatch(setError(e.response.data.error));
  } finally {
    dispatch(changeAppStatus('idle'));
  }
};

type InitStateType = {
  isLoggedIn: boolean;
  id: string | undefined;
};

type SetAuthUserDataType = ReturnType<typeof setIsLoggedIn>;
type LogoutType = ReturnType<typeof logout>;
export type LoginActionsType = SetAuthUserDataType | LogoutType;

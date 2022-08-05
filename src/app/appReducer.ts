import { authAPI } from '../api/AuthApi';
import { AppThunkType } from '../common/types/types';
import { setIsLoggedIn } from '../pages/login/loginReducer';
import { setUserData } from '../pages/profile/profileReducer';

const initState = {
  status: 'idle' as RequestStatusType,
  isInitialized: false,
  error: null as string | null,
};

export const appReducer = (
  state: InitStateType = initState,
  actions: AppActionsType,
): InitStateType => {
  switch (actions.type) {
    case 'APP/CHANGE-APP-STATUS':
      return { ...state, status: actions.status };
    case 'APP/SET_IS_INITIALIZED': {
      return { ...state, isInitialized: actions.payload.value };
    }
    case 'APP/SET_ERROR': {
      return { ...state, ...actions.payload };
    }
    default:
      return state;
  }
};

export const changeAppStatus = (status: RequestStatusType) => {
  return { type: 'APP/CHANGE-APP-STATUS', status } as const;
};

export const setIsInitialized = (value: boolean) => {
  return { type: 'APP/SET_IS_INITIALIZED', payload: { value } } as const;
};

export const setError = (error: string | null) => {
  return { type: 'APP/SET_ERROR', payload: { error } } as const;
};

export const initializeApp = (): AppThunkType => async dispatch => {
  try {
    const auth = await authAPI.authMe();

    dispatch(setIsLoggedIn(true, auth.data._id));
    const { email, _id, name, publicCardPacksCount, avatar = 'ava' } = auth.data;

    dispatch(setUserData(email, _id, name, publicCardPacksCount, avatar));
  } catch (err: any) {
    throw new Error(err.response.data.error);
  } finally {
    dispatch(setIsInitialized(true));
  }
};

type InitStateType = typeof initState;
type ChangeAppStatusType = ReturnType<typeof changeAppStatus>;
type SetIsInitializedType = ReturnType<typeof setIsInitialized>;
type SetErrorType = ReturnType<typeof setError>;
export type AppActionsType = ChangeAppStatusType | SetIsInitializedType | SetErrorType;
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

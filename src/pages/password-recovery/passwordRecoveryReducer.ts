import { authAPI } from '../../api/AuthApi';
import { changeAppStatus, setError } from '../../app/appReducer';
import { AppThunkType } from '../../common/hooks/hooks';

const initState = {
  sendEmailRecovery: false,
};

export const passwordRecoveryReducer = (
  state: InitStateType = initState,
  actions: PasswordRecoveryActionsType,
): InitStateType => {
  switch (actions.type) {
    case 'LOGIN/SET-EMAIL-SENT': {
      return { ...state, sendEmailRecovery: actions.payload.value };
    }
    default:
      return state;
  }
};

export const setEmailSent = (value: boolean) => {
  return {
    type: 'LOGIN/SET-EMAIL-SENT',
    payload: { value },
  } as const;
};

export const sendPasswordRecoveryData =
  (email: string): AppThunkType =>
  dispatch => {
    dispatch(changeAppStatus('loading'));
    authAPI
      .requestRecoveryLink(email)
      .then(res => {
        if (res.statusText === 'OK') {
          dispatch(setEmailSent(true));
        }
      })
      .catch(err => {
        dispatch(setError(err.response.data.error));
      })
      .finally(() => {
        dispatch(changeAppStatus('idle'));
      });
  };

type InitStateType = typeof initState;
type SetEmailSentDataType = ReturnType<typeof setEmailSent>;
export type PasswordRecoveryActionsType = SetEmailSentDataType;

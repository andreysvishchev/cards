import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import { AppActionsType } from '../../app/appReducer';
import { AppStateType } from '../../app/store';
import { CardsActionsType } from '../../pages/cards/cardsReducer';
import { PacksActionsType } from '../../pages/cards/packsReducer';
import { LoginActionsType } from '../../pages/login/loginReducer';
import { PasswordNewActionsType } from '../../pages/password-new/passwordNewReducer';
import { PasswordRecoveryActionsType } from '../../pages/password-recovery/passwordRecoveryReducer';
import { ProfileActionsType } from '../../pages/profile/profileReducer';
import { RegistrationActionsType } from '../../pages/registration/registrationReducer';

// все типы action для всего app
export type ActionTypeForApp =
  | RegistrationActionsType
  | ProfileActionsType
  | LoginActionsType
  | AppActionsType
  | PasswordNewActionsType
  | PasswordRecoveryActionsType
  | PacksActionsType
  | CardsActionsType;
// типизация для диспатча санок в санках
export type AppThunkType = ThunkAction<void, AppStateType, unknown, ActionTypeForApp>;
export type ThunkDispatchType = ThunkDispatch<AppStateType, unknown, ActionTypeForApp>;

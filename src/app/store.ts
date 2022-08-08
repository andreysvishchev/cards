import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from 'redux';
import thunk from 'redux-thunk';

import { loginReducer } from '../pages/login/loginReducer';
import { cardsReducer } from '../pages/packsList/cards/cardsReducer';
import { packsReducer } from '../pages/packsList/packsReducer';
import { passwordNewReducer } from '../pages/password-new/passwordNewReducer';
import { passwordRecoveryReducer } from '../pages/password-recovery/passwordRecoveryReducer';
import { profileReducer } from '../pages/profile/profileReducer';
import { registrationReducer } from '../pages/registration/registrationReducer';

import { appReducer } from './appReducer';

const rootReducer = combineReducers({
  app: appReducer,
  login: loginReducer,
  packs: packsReducer,
  registration: registrationReducer,
  profile: profileReducer,
  passwordNew: passwordNewReducer,
  passwordRecovery: passwordRecoveryReducer,
  cards: cardsReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
export type AppStateType = ReturnType<typeof rootReducer>;

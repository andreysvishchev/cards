import {RegistrationActionsType} from "../pages/registration/registrationReducer";
import {ProfileActionsType} from "../pages/profile/profileReducer";
import {LoginActionsType} from "../pages/login/loginReducer";
import {AppActionsType} from "../app/appReducer";
import {PasswordNewActionsType} from "../pages/password-new/passwordNewReducer";
import {PasswordRecoveryActionsType} from "../pages/password-recovery/passwordRecoveryReducer";
import {CardsActionsType} from "../pages/cards/cardsReducer";

// все типы action для всего app
export type ActionTypeForApp = RegistrationActionsType | ProfileActionsType | LoginActionsType | AppActionsType | PasswordNewActionsType | PasswordRecoveryActionsType | CardsActionsType;
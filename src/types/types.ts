import {RegistrationActionsType} from "../pages/registration/registrationReducer";
import {ProfileActionsType} from "../pages/profile/profileReducer";
import {LoginActionsType} from "../pages/login/loginReducer";
import {AppActionsType} from "../app/appReducer";

// все типы action для всего app
export type ActionTypeForApp = RegistrationActionsType | ProfileActionsType | LoginActionsType | AppActionsType;
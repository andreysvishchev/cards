import {RegistrationActionsType} from "../pages/registration/registrationReducer";
import {ProfileActionsType} from "../pages/profile/profileReducer";

// все типы action для всего app
export type ActionTypeForApp = RegistrationActionsType | ProfileActionsType;
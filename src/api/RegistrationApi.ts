import { instance } from './instance/instance';

export const registrationAPI = {
  registration(data: RegistrationDataType) {
    return instance.post(`auth/register`, data);
  },
};

export type RegistrationDataType = {
  email: string;
  password: string;
};

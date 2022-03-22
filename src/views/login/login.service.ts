import { AxiosResponse } from 'axios';
import http from '../../core/http';

export const LoginService = {

  login(params: LoginData): Promise<AxiosResponse<any>> {
    return http.post('/login',  params);
  },
};

export interface LoginData {
  [k: string]: any;
}


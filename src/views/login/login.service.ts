import { AxiosResponse } from 'axios';
// import axios from '../../core/http';
import { post } from '../../core/http';

export const LoginService = {

  login(method: any, params: LoginData): Promise<AxiosResponse<any>> {
    // Axios.default
    // console.log(Axios)
    // return axios.post('/login', params)
    // return axios({
    //   headers: {
    //     "Content-Type": "text/html;charset=utf-8",
    //     "Access-Control-Allow-Origin": "*",
    //     "Access-Control-Allow-Headers": "*",
    //     "Access-Control-Allow-Credentials": "true",
    //     "Access-Control-Max-Age": "3600",
    //   },
    //   method: method,
    //   url: '/login',
    //   params: params
    // })
    return post('/sys/login',  params);
  },
};

export interface LoginData {
  [k: string]: any;
}


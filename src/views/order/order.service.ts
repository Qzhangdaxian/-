import { AxiosResponse } from 'axios';
// import axios from '../../core/http';
import { get } from '../../core/http';

export const orderService = {

  orderList(method: any, params: LoginData): Promise<AxiosResponse<any>> {
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
    // /nature/order/getList
    return get('/nature/order/getList', params);
  },
  storeList(params: any) {
    return get('/store/getList', params)
  },
};

export interface LoginData {
  [k: string]: any;
}


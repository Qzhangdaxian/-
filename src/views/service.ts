import { AxiosResponse } from 'axios';
// import axios from '../../core/http';
import { get, post, http } from '../core/http';

export const orderService = {
  uploadPath: '/oss/file/upload',
  orderList(method: any, params: LoginData): Promise<AxiosResponse<LoginData>> {
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
    return get('/taskOrderOtc/queryList', params);
  },
  orderSave(params: LoginData): Promise<AxiosResponse<LoginData>> {
    return post('/nature/order/save', params);
  },
  orderDetail(params: LoginData): Promise<AxiosResponse<LoginData>> {
    return get('/nature/order/getDetail', params);
  },
  orderUpdate(params: UpdateData): Promise<AxiosResponse<UpdateData>>{
    return post('/nature/order/update', params)
  },
  orderPay(params: PayData): Promise<AxiosResponse<PayData>> {
    return post('/nature/order/pay', params)
  },
  orderRecord(params: RecordData): Promise<AxiosResponse<RecordData>> {
    return post('/nature/order/recording', params)
  },
  orderRefundRecord(params: RefundRecordData): Promise<AxiosResponse<RefundRecordData>> {
    return post('/nature/order/refundRecord', params)
  },
  orderreRund(params: any): Promise<AxiosResponse<RefundRecordData>> {
    return post('/nature/order/refund', params)
  },
  // 上传图片
  upload(file: File): any {
    // const formData = new FormData();
    // console.log(file)
    // formData.set('file', file);
    // console.log(formData)
    // return http(this.uploadPath, formData, 'post', 'multipart/form-data');
    const formData = new FormData();
    formData.set('file', file);
    const request = new Request("http://192.168.2.67:8080/oss/file/upload", { method: 'POST', body: formData })
    return fetch(request)
  },

  delete(id: string): any {
    const request = new Request(`http://192.168.2.67:8080/oss/file/delete?id=${id}`, { method: 'POST', body: id })
    return fetch(request)
  }
};
export interface UploadedData {
  createBy: string;
  createTime: string;
  fileName: string;
  id: string;
  update: any;
  updateTime: any;
  url: string;
}
export interface LoginData {
  [k: string]: any;
}

export interface SaveData {
  userName: string,
  age: number,
  identity: string,
  phone: string,
  alopeciaHistory: string,
  alopeciaState: number,
  alopeciaImg: string
}
export interface UpdateData {
  userName: string,
  age: number,
  identity: string,
  phone: string,
  alopeciaHistory: string,
  alopeciaState: number,
  alopeciaImg: string,
  id: number,
  voucher:string
}
export interface PayData {
  id: number,
  voucher: string,
  payMethod: number,
}
export interface RecordData{
  id: number,
  productNo: string,
  productNoImg: string
}

export interface RefundRecordData{
  id: number,
  refundImg: string
}

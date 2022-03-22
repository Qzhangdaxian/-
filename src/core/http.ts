import axios, { AxiosStatic } from 'axios';
// import VueAxios from 'vue-axios';

// const axiosInstance = axios.create();
axios.defaults.baseURL = process.env.VUE_APP_BASE_URL;
axios.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error),
);

axios.interceptors.response.use((res) => res.data);

export default axios as AxiosStatic;

export interface CellResponse<T> {
  code?: number;
  message?: string | null;
  success?: boolean;
  data: T;
}

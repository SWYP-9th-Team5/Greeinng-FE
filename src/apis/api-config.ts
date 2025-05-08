import axios, { AxiosInstance } from 'axios';

const apiConfig = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  transactionTime: process.env.NEXT_PUBLIC_TRANSACTION_TIME
    ? parseInt(process.env.NEXT_PUBLIC_TRANSACTION_TIME, 10)
    : 3000,
  transactionAlwaysFail:
    process.env.NEXT_PUBLIC_TRANSACTION_ALWAYS_FAIL === 'ON',
  errorRate: process.env.NEXT_PUBLIC_ERROR_RATE
    ? parseInt(process.env.NEXT_PUBLIC_ERROR_RATE, 10)
    : 0,
};

interface CustomInstance extends AxiosInstance {
  get<T>(...params: Parameters<AxiosInstance['get']>): Promise<T>;
  delete<T>(...params: Parameters<AxiosInstance['delete']>): Promise<T>;
  post<T>(...params: Parameters<AxiosInstance['post']>): Promise<T>;
  put<T>(...params: Parameters<AxiosInstance['put']>): Promise<T>;
  patch<T>(...params: Parameters<AxiosInstance['patch']>): Promise<T>;
}

export interface ErrorResponse {
  message: string;
  trID?: string;
}

const AxiosConfig = (
  baseURL: string = 'http://223.130.155.195:8080',
  transactionTime = 3000,
  transactionAlwaysFail = false,
  errorRate = 0,
): CustomInstance => {
  const instance = axios.create({
    baseURL,
    timeout: transactionTime,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  instance.interceptors.request.use(
    async (config) => {
      // transactionAlwaysFail이 true일 경우 항상 요청을 실패시킴
      if (transactionAlwaysFail) {
        return Promise.reject({
          config,
          response: {
            status: 500,
            data: { message: 'Transaction always fail mode is ON' },
          },
        });
      }
      return config;
    },
    (error) => {
      console.log(error);
      return Promise.reject(error.response.data);
    },
  );

  instance.interceptors.response.use(
    (res) => {
      // errorRate에 따라 확률적으로 에러 발생시키기
      if (errorRate > 0 && Math.random() * 100 < errorRate) {
        return Promise.reject({
          response: {
            data: { message: `Random error triggered (${errorRate}% chance)` },
          },
        });
      }
      return res.data;
    },
    async (err) => {
      const { config, response } = err;

      // 에러
      if (response.status === 401) {
        console.log('에러');
      }

      if (response?.status !== 401 || config.sent) throw err;
      config.sent = true;
      throw err;
    },
  );
  return instance;
};

const api = AxiosConfig(
  apiConfig.baseUrl,
  apiConfig.transactionTime,
  apiConfig.transactionAlwaysFail,
  apiConfig.errorRate,
);

export default api;

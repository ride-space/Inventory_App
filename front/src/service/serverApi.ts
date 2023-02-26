import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import { createApi } from '@reduxjs/toolkit/query/react';
import type { AxiosError, AxiosRequestConfig } from 'axios';
import axios from 'axios';
// import { HYDRATE } from 'next-redux-wrapper';

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const axiosBaseQuery = (
  { baseUrl }: { baseUrl: string } = { baseUrl: '' },
): BaseQueryFn<
  {
    data?: AxiosRequestConfig['data'];
    method: AxiosRequestConfig['method'];
    params?: AxiosRequestConfig['params'];
    url: string;
  },
  unknown,
  unknown
> => {
  return async ({ data, method, params, url }) => {
    try {
      const result = await axios({ data, method, params, url: baseUrl + url });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: {
          data: err.response?.data || err.message,
          status: err.response?.status,
        },
      };
    }
  };
};

export const serverApi = createApi({
  baseQuery: axiosBaseQuery({ baseUrl }),
  endpoints: () => {
    return {};
  },
  reducerPath: 'serverApi',
  tagTypes: ['Category'],
});

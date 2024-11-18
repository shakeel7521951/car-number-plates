import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from '../../BaseUrl';

export const productApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/api/v1`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState()?.auth?.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => '/getAllProducts',
    }),
    getSingleProduct: builder.query({
      query: (id) => `/singleProduct/${id}`,
    }),
    getFilterProduct: builder.mutation({
      query: (category) => ({
        url: '/filteredProducts',
        method: 'POST',
        body: { category },
      }),
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetSingleProductQuery,
  useGetFilterProductMutation,
} = productApi;

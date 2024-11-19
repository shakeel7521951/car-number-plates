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
  tagTypes: ['Products'],
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => '/getAllProducts',
      providesTags: ['Products'],
    }),
    getSingleProduct: builder.query({
      query: (id) => `/singleProduct/${id}`,
      providesTags: (result, error, id) => [{ type: 'Products', id }],
    }),
    getFilterProduct: builder.mutation({
      query: (category) => ({
        url: '/filteredProducts',
        method: 'POST',
        body: { category },
      }),
    }),
    updateView: builder.mutation({
      query: (id) => ({
        url: `/productViews/${id}`,
        method: 'PUT',
      }),
      invalidatesTags: [{ type: 'Products' }],
    }),
    likeProduct: builder.mutation({
      query: (id) => ({
        url: `/likeProduct/${id}`,
        method: 'PUT',
      }),
      invalidatesTags: ['Products'],
    }),
    dislikeProduct: builder.mutation({
      query: (id) => ({
        url: `/dislikeProduct/${id}`,
        method: 'PUT',
      }),
      invalidatesTags: ['Products'],
    }),

    createPlate: builder.mutation({
      query: (data) => ({
        url: '/createProduct',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetSingleProductQuery,
  useGetFilterProductMutation,
  useUpdateViewMutation,
  useDislikeProductMutation,
  useLikeProductMutation,
  useCreatePlateMutation,
} = productApi;

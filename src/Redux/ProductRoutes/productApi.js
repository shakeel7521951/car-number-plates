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
      transformResponse: (response) => {
        return response.products?.reverse() || [];
      },
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
        transformResponse: (response) => {
          return response.products?.reverse() || [];
        },
      }),
      invalidatesTags: ['Products'],
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
    getSellerProduct: builder.query({
      query: () => '/get-seller-products',
      keepUnusedDataFor: 0,
      providesTags: ['Products'],
      transformResponse: (response) => {
        return response.products?.reverse() || [];
      },
    }),
    createPlate: builder.mutation({
      query: (data) => ({
        url: '/createProduct',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Products'],
    }),
    updateProduct: builder.mutation({
      query: ({ id, updatePlate }) => ({
        url: `/updateProduct/${id}`,
        method: 'PUT',
        body: updatePlate,
      }),
      invalidatesTags: ['Products'],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/deleteProduct/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Products'],
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
  useGetSellerProductQuery,
  useDeleteProductMutation,
  useUpdateProductMutation,
} = productApi;

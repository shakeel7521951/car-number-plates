import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from '../../BaseUrl';

export const orderApi = createApi({
  reducerPath: 'orderApi',
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
  tagTypes: ['Orders'],

  endpoints: (builder) => ({
    // Create Order
    createOrder: builder.mutation({
      query: ({ id, orderData }) => ({
        url: `/createOrder/${id}`,
        method: 'POST',
        body: orderData,
      }),
      invalidatesTags: ['Orders'],
    }),

    updateOrderStatus: builder.mutation({
      query: ({ id, orderStatus }) => ({
        url: `/updateStatus/${id}`,
        method: 'PUT',
        body: { orderStatus },
      }),
      invalidatesTags: ['Orders'],
    }),

    // Delete Order
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/deleteOrder/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Orders'],
    }),

    // Get All Orders
    getAllOrders: builder.query({
      query: () => ({
        url: `/getAllOrders`,
        method: 'GET',
      }),
      providesTags: ['Orders'],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useUpdateOrderStatusMutation,
  useDeleteOrderMutation,
  useGetAllOrdersQuery,
} = orderApi;

import { IResponseRedux } from "../../../types/global";

import { baseApi } from "../../api/baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    placeOrder: builder.mutation({
      query: (body) => ({
        url: "/orders",
        method: "POST",
        body,
      }),
      invalidatesTags: ["order"],
    }),
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/orders/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["order"],
    }),
    orderStatusUpdate: builder.mutation({
      query: (body) => {
        return {
          url: `/orders/status/${body.id}`,
          method: "PATCH",
          body: { status: body.data },
        };
      },
      invalidatesTags: ["order"],
    }),
    verifyOrder: builder.query({
      query: (order_id) => ({
        url: "/orders/verify",
        params: { order_id },
        method: "GET",
      }),
      providesTags: ["order"],
    }),
    myOrders: builder.query({
      query: () => {
        return {
          url: "/orders/myOrder",
          method: "GET",
        };
      },
      providesTags: ["order"],
      transformResponse: (response: IResponseRedux<any>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    allOrders: builder.query({
      query: () => {
        return {
          url: "/orders",
          method: "GET",
        };
      },
      providesTags: ["order"],
      transformResponse: (response: IResponseRedux<any>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
  }),
});
export const {
  usePlaceOrderMutation,
  useVerifyOrderQuery,
  useMyOrdersQuery,
  useAllOrdersQuery,
  useDeleteOrderMutation,
  useOrderStatusUpdateMutation,
} = orderApi;

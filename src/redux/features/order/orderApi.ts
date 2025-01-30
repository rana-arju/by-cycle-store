import { IQueryParam, IResponseRedux } from "../../../types/global";
import { IProduct } from "../../../types/product";
import { baseApi } from "../../api/baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    placeOrder: builder.mutation({
      query: (body) => ({
        url: "/orders",
        method: "POST",
        body,
      }),
    }),
    getAllProduct: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: IQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/products",
          method: "GET",
          params,
        };
      },
      transformResponse: (response: IResponseRedux<IProduct[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    verifyOrder: builder.query({
      query: (order_id) => ({
        url: "/orders/verify",
        params: { order_id },
        method: "GET",
      }),
    }),
  }),
});
export const {usePlaceOrderMutation, useVerifyOrderQuery} = orderApi;

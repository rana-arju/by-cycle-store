import { IQueryParam, IResponseRedux } from "../../../types/global";
import { IProduct } from "../../../types/product";
import { baseApi } from "../../api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addProduct: builder.mutation({
      query: (body) => ({
        url: "/products",
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
    getSingleProduct: builder.query({
      query: (args) => {
        return {
          url: `/products/${args}`,
          method: "GET",
        };
      },
    }),
  }),
});
export const { useAddProductMutation, useGetAllProductQuery , useGetSingleProductQuery} = productApi;

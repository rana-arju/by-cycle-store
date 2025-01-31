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
      invalidatesTags: [{ type: "Product", id: "LIST" }],
    }),

    updateProduct: builder.mutation({
      query: (body) => ({
        url: `/products/${body.id}`,
        method: "PUT",
        body: body.data,
      }),
      invalidatesTags: [{ type: "Product", id: "LIST" }],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Product", id: "LIST" }],
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
      providesTags: [{ type: "Product", id: "LIST" }],
      transformResponse: (response: IResponseRedux<IProduct[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    getSingleProduct: builder.query({
      query: (id) => {

        return {
          url: `/products/${id}`,
          method: "GET",
        };
      },
      providesTags: [{ type: "Product", id: "LIST" }],

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
  useAddProductMutation,
  useGetAllProductQuery,
  useGetSingleProductQuery,
  useDeleteProductMutation,
  useUpdateProductMutation,
} = productApi;

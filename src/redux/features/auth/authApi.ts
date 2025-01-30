import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
    }),
    registration: builder.mutation({
      query: (body) => ({
        url: "/auth/registration",
        method: "POST",
        body,
      }),
    }),

    getMyData: builder.query({
      query: () => {
        return {
          url: "/auth/me",
          method: "GET",
        };
      },
    }),
  }),
});
export const {useLoginMutation, useRegistrationMutation, useGetMyDataQuery} = authApi
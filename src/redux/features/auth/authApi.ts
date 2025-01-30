import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
      invalidatesTags: ["auth"],
    }),

    registration: builder.mutation({
      query: (body) => ({
        url: "/auth/registration",
        method: "POST",
        body,
      }),
      invalidatesTags: ["auth"],
    }),
    statusUpdate: builder.mutation({
      query: (body) => ({
        url: `auth/role/${body.id}`,
        method: "PUT",
        body: body.data,
      }),
      invalidatesTags: ["auth"],
    }),
    roleUpdate: builder.mutation({
      query: (body) => ({
        url: `auth/status/${body.id}`,
        method: "PUT",
        body: body.data,
      }),
      invalidatesTags: ["auth"],
    }),

    getMyData: builder.query({
      query: () => {
        return {
          url: "/auth/me",
          method: "GET",
        };
      },
      providesTags: ["auth"],
    }),
    AllUsers: builder.query({
      query: () => {
        return {
          url: "/auth/users",
          method: "GET",
        };
      },
      providesTags: ["auth"],
    }),
  }),
});
export const {
  useLoginMutation,
  useRegistrationMutation,
  useGetMyDataQuery,
  useAllUsersQuery,
  useStatusUpdateMutation,
  useRoleUpdateMutation,
} = authApi;

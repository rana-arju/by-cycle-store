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
      query: (body) => {

        return {
          url: `/auth/status/${body.id}`,
          method: "PATCH",
          body: { status: body.data },
        };
      },
      invalidatesTags: ["auth"],
    }),
    profileUpdate: builder.mutation({
      query: (body) => {
        return {
          url: `/auth/profile`,
          method: "PATCH",
          body,
        };
      },
      invalidatesTags: ["auth"],
    }),
    roleUpdate: builder.mutation({
      query: (body) => ({
        url: `/auth/role/${body.id}`,
        method: "PATCH",
        body: { role: body.data },
      }),
      invalidatesTags: ["auth"],
    }),
    deleteUser: builder.mutation({
      query: (body) => ({
        url: `auth/${body.id}`,
        method: "DELETE",
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
    allUsers: builder.query({
      query: () => {
        return {
          url: "/auth/users",
          method: "GET",
        };
      },
      providesTags: ["auth"],
    }),
    passwordChange: builder.mutation({
      query: (body) => ({
        url: "/auth/change-password",
        method: "POST",
        body,
      }),
    }),
  }),
});
export const {
  useLoginMutation,
  useRegistrationMutation,
  useGetMyDataQuery,

  useStatusUpdateMutation,
  useRoleUpdateMutation,
  useDeleteUserMutation,
  useAllUsersQuery,
  useProfileUpdateMutation,
  usePasswordChangeMutation
} = authApi;

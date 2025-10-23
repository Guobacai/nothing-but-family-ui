import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/auth',
  }),
  endpoints: (builder) => ({
    login: builder.mutation<
      { token: string; familyId: string; familyMemberId: string },
      { email: string; password: string }
    >({
      query: (payload) => ({
        url: 'login',
        method: 'POST',
        body: payload,
      }),
    }),
    signupUser: builder.mutation<
      { message: string },
      {
        email: string;
        password: string;
        familyName: string;
        familyMemberName: string;
      }
    >({
      query: (payload) => ({
        url: 'signup',
        method: 'POST',
        body: payload,
      }),
    }),
  }),
});

export const { useLoginMutation, useSignupUserMutation } = authApi;

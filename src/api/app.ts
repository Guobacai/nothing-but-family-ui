import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from '../types/user';

interface FinRecord {
  FinMonth: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
  id: string;
  totalIncoming: number;
  aptCommonCharge: number;
  aptMortgage: number;
  utility: number;
  merrill: number;
  creditcard: number;
  totalExpense: number;
  saving: number;
  operatingMargin: number;
}

export const appApi = createApi({
  reducerPath: 'appApi',
  tagTypes: ['FinancialRecords'],
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
    prepareHeaders: (headers) => {
      const token = document.cookie
        .split('; ')
        .find((row) => row.startsWith('token='))
        ?.split('=')[1];

      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getRecords: builder.query<FinRecord, void>({
      query: () => 'records',
    }),
    getRecordByYearAndMonth: builder.query<
      FinRecord,
      { year: string; month: string }
    >({
      query: ({ year, month }) =>
        `records/getByYearAndMonth?year=${year}&month=${month}`,
      providesTags: (result, error, arg) => {
        return [{ type: 'FinancialRecords', month: arg.month, year: arg.year }];
      },
    }),
    createRecord: builder.mutation({
      query: (payload) => ({
        url: 'record',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: (result, error, arg) => {
        console.log('createRecord result:', result);
        return [
          { type: 'FinancialRecords', month: result.month, year: result.year },
        ];
      },
    }),
    deleteRecord: builder.mutation({
      query: ({ recordId }) => ({
        url: `record/${recordId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, arg) => {
        return [{ type: 'FinancialRecords', month: arg.month, year: arg.year }];
      },
    }),
    getUserById: builder.query<User[], { userId: string }>({
      query: ({ userId }) => `user/${userId}`,
    }),
    getTagsByFamilyId: builder.query<string[], { familyId: string }>({
      query: ({ familyId }) => `tags?familyId=${familyId}`,
    }),
  }),
});

export const {
  useGetRecordsQuery,
  useCreateRecordMutation,
  useDeleteRecordMutation,
  useGetRecordByYearAndMonthQuery,
  useGetTagsByFamilyIdQuery,
  useGetUserByIdQuery,
} = appApi;

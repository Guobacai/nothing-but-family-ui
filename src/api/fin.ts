import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface FinRecord {
    FinMonth: string
    createdAt?: string
    updatedAt?: string
    deletedAt?: string
    id: string
    totalIncoming: number
    aptCommonCharge: number
    aptMortgage: number
    utility: number
    merrill: number
    creditcard: number
    totalExpense: number
    saving: number
    operatingMargin: number
}

export const finApi = createApi({
    reducerPath: 'finApi',
    tagTypes: ['FinancialRecords'],
    baseQuery: fetchBaseQuery({
        baseUrl: "/api",
        prepareHeaders: (headers) => {
            const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];

            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }

            return headers;
        }
    }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (payload) => ({
                url: 'auth/login',
                method: "POST",
                body: payload,
            })
        }),
        signupUser: builder.mutation({
            query: (payload) => ({
                url: 'auth/signup',
                method: "POST",
                body: payload,
            })
        }),
        getRecords: builder.query<FinRecord, void>({
            query: () => 'records'
        }),
        getRecordByYearAndMonth: builder.query<FinRecord, { year: string, month: string }>({
            query: ({ year, month }) => `records/getByYearAndMonth?year=${year}&month=${month}`,
            providesTags: (result, error, arg) => {
                return [{ type: 'FinancialRecords', month: arg.month, year: arg.year }]
            },
        }),
        createRecord: builder.mutation({
            query: (payload) => ({
                url: 'record',
                method: "POST",
                body: payload,
            }),
            invalidatesTags: (result, error, arg) => {
                console.log( 'createRecord result:', result )
                return [{ type: 'FinancialRecords', month: result.month, year: result.year }]
            }
        }),
        deleteRecord: builder.mutation({
            query: ({recordId}) => ({
                url: `record/${recordId}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, arg) => {
                return [{ type: 'FinancialRecords', month: arg.month, year: arg.year }]
            }
        })
    })
});

export const { useGetRecordsQuery, useCreateRecordMutation, useDeleteRecordMutation, useGetRecordByYearAndMonthQuery, useLoginMutation, useSignupUserMutation } = finApi
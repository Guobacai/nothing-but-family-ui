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
    baseQuery: fetchBaseQuery({ baseUrl: "/api"}),
    endpoints: (builder) => ({
        getRecords: builder.query<FinRecord, void>({
            query: () => 'records'
        }),
        getRecordByYearAndMonth: builder.query<FinRecord, { year: string, month: string }>({
            query: ({ year, month }) => `records/getByYearAndMonth?year=${year}&month=${month}`
        }),
        createRecord: builder.mutation({
            query: (payload) => ({
                url: 'records',
                method: "POST",
                body: payload,
            })
        }),
        deleteRecord: builder.mutation({
            query: (recordId) => ({
                url: `records/${recordId}`,
                method: "DELETE",
            }),
        })
    })
});

export const { useGetRecordsQuery, useCreateRecordMutation, useDeleteRecordMutation, useGetRecordByYearAndMonthQuery } = finApi
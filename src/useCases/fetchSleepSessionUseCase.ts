import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const sleepSessionApi = createApi({
  reducerPath: 'sleepSessionApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://s3.amazonaws.com/eight-public/challenge/' }),
  endpoints: (builder) => ({
    fetchSleepIntervalByUserId: builder.query<{}, string>({
      query: (userId) => `${userId}.json`,
    }),
  }),
})

export const { useFetchSleepIntervalByUserIdQuery, useLazyFetchSleepIntervalByUserIdQuery } =  sleepSessionApi
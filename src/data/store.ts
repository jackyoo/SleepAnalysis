import { configureStore } from '@reduxjs/toolkit'
import sleepIntervalReducer from './sleepSessionSlice'
import { sleepSessionApi } from '../useCases/fetchSleepSessionUseCase'
import { setupListeners } from '@reduxjs/toolkit/query'

export const store = configureStore({
  reducer: {
    counter: sleepIntervalReducer,
    [sleepSessionApi.reducerPath]: sleepSessionApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(sleepSessionApi.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
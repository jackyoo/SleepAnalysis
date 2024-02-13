import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface ISleepSessionState {
  loading: boolean
  currentUserId: string | undefined
}

const initialState: ISleepSessionState = {
  loading: false,
  currentUserId: undefined
}

export const sleepSessionSlice = createSlice({
  name: 'sleepSession',
  initialState,
  reducers: {
    setCurrentUserId: (state, action: PayloadAction<string>) => {
      state.currentUserId = action.payload
    },
  },
})

export const { setCurrentUserId } = sleepSessionSlice.actions

export default sleepSessionSlice.reducer  
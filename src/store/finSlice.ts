import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from './index'
import type { PayloadAction } from '@reduxjs/toolkit'

interface FinState {
  isDetailOpen: boolean
}

const initialState: FinState = {
  isDetailOpen: false,
}

export const finSlice = createSlice({
  name: 'fin',
  initialState,
  reducers: {
    setDetailOpen: (state, action: PayloadAction<boolean>) => {
      state.isDetailOpen = action.payload
    }
  }
})

export const { setDetailOpen } = finSlice.actions

export const selectIsDetailOpen = (state: RootState) => state.fin.isDetailOpen

export default finSlice.reducer
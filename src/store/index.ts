import { configureStore } from '@reduxjs/toolkit'
import finSlice from './finSlice'

export const store = configureStore({
  reducer: {
    fin: finSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
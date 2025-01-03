import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface SpendingState {
    isSideFormOpen: boolean
}

const initialState: SpendingState = {
    isSideFormOpen: false,
}

export const spendingSlice = createSlice({
    name: "spending",
    initialState,
    reducers: {
        setSideFormOpen: (state, action: PayloadAction<boolean>) => {
            state.isSideFormOpen = action.payload;
        }
    },
});

export const { setSideFormOpen } = spendingSlice.actions;

export default spendingSlice.reducer;
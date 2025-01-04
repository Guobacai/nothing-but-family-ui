import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import spendingReducer from './pages/spending/spendingSlice.ts';
import { finApi } from './api/fin.ts';

export const store = configureStore({
    reducer: {
        spending: spendingReducer,
        [finApi.reducerPath]: finApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(finApi.middleware)
});

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
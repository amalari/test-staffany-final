import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AlertState {
    message: string
    type: 'success' | 'info' | 'warning' | 'error'
}

const initialState: AlertState = {
    message: '',
    type: 'error',
}

export const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        setMessage: (state, action: PayloadAction<string>) => {
            state.message = action.payload
        },
        setType: (state, action: PayloadAction<AlertState["type"]>) => {
            state.message = action.payload
        }
    },
})

export const { setMessage, setType } = alertSlice.actions;

// getter

// async process

export default alertSlice.reducer
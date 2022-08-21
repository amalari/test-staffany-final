import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    format,
    startOfWeek,
    endOfWeek,
    parseISO
} from "date-fns"  
import { RootState } from '../../store/store';
import { setMessage } from '../alert/alertSlice';
import shiftAPI, { CreateShiftDTO, Shift, UpdateShiftDTO} from './shiftAPI';

export interface ShiftState {
    shifts: Shift[]
    selectedShift: Shift | null
    status: 'idle' | 'loading' | 'failed'
    dateFilter: string // string date
    publishedAt: string | null // string date
    triggerSave: boolean
    saveStatus: 'idle' | 'loading' | 'failed'
}

const initialState: ShiftState = {
    shifts: [],
    selectedShift: null,
    status: 'idle',
    dateFilter: new Date().toISOString(),
    publishedAt: null,
    triggerSave: false,
    saveStatus: 'idle'
}

export const shiftSlice = createSlice({
    name: 'shift',
    initialState,
    reducers: {
        setDateFilter: (state, action: PayloadAction<string>) => {
            state.dateFilter = action.payload
        },
        setTriggerSave: (state, action: PayloadAction<boolean>) => {
            state.triggerSave = action.payload
        },
        deleteById: (state, action: PayloadAction<string>) => {
            const tempShifts = [...state.shifts];
            const idx = tempShifts.findIndex((v: any) => v.id === action.payload);
            tempShifts.splice(idx, 1);
            state.shifts = tempShifts
        },
        setPublishedAt: (state, action: PayloadAction<string>) => {
            state.publishedAt = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getShiftsAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getShiftsAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.shifts = action.payload.results;
                if(action.payload.results.length > 0) {
                    state.publishedAt = action.payload.results[0].publishedAt
                } else {
                    state.publishedAt = null
                }
            })
            .addCase(getShiftsAsync.rejected, (state) => {
                state.status = 'failed';
            })
            .addCase(findShiftByIdAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(findShiftByIdAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.selectedShift = action.payload.results;
            })
            .addCase(findShiftByIdAsync.rejected, (state) => {
                state.status = 'failed';
            })
            .addCase(createShiftAsync.pending, (state) => {
                state.saveStatus = 'loading';
            })
            .addCase(createShiftAsync.fulfilled, (state) => {
                state.saveStatus = 'idle';
            })
            .addCase(createShiftAsync.rejected, (state) => {
                state.saveStatus = 'failed';
            })
            .addCase(updateShiftByIdAsync.pending, (state) => {
                state.saveStatus = 'loading';
            })
            .addCase(updateShiftByIdAsync.fulfilled, (state) => {
                state.saveStatus = 'idle';
            })
            .addCase(updateShiftByIdAsync.rejected, (state) => {
                state.saveStatus = 'failed';
            })
    },
})

export const { setDateFilter, setTriggerSave, deleteById, setPublishedAt } = shiftSlice.actions;

// getter
export const startEndDateFilter = (state: RootState) => ({
    startDate: format(startOfWeek(parseISO(state.shift.dateFilter), {weekStartsOn: 1}), "yyyy-MM-dd"),
    endDate: format(endOfWeek(parseISO(state.shift.dateFilter), {weekStartsOn: 1}), "yyyy-MM-dd")
})
export const isLoading = (state: RootState) => state.shift.status === 'loading'

// async process
export const getShiftsAsync = createAsyncThunk(
    'shift/getShifts',
    async (params: any = {}, appThunk) => {
        try {
            return await shiftAPI.findMany(params)
        } catch (error: any) {
            appThunk.dispatch(setMessage(error.message))
            throw new Error(error.message)
        }
    }
)
export const createShiftAsync = createAsyncThunk(
    'shift/createShift',
    async (payload: CreateShiftDTO, appThunk) => {
        try {
            return await shiftAPI.createShift(payload)
        } catch (error: any) {
            appThunk.dispatch(setMessage(error.message))
            throw new Error(error.message)
        }
    }
)
export const deleteShiftByIdAsync = createAsyncThunk(
    'shift/deleteShiftById',
    async (id: string, appThunk) => {
        try {
            return await shiftAPI.deleteById(id)
        } catch (error: any) {
            appThunk.dispatch(setMessage(error.message))
            throw new Error(error.message)
        }
    }
)
export const findShiftByIdAsync = createAsyncThunk(
    'shift/findShiftById',
    async (id: string, appThunk) => {
        try {
            return await shiftAPI.findById(id)
        } catch (error: any) {
            appThunk.dispatch(setMessage(error.message))
            throw new Error(error.message)
        }
    }
)
export const updateShiftByIdAsync = createAsyncThunk(
    'shift/updateShiftById',
    async ({ id, payload }: { id: string, payload: UpdateShiftDTO }, appThunk) => {
        try {
            return await shiftAPI.updateById(id, payload)
        } catch (error: any) {
            appThunk.dispatch(setMessage(error.message))
            throw new Error(error.message)
        }
    }
)
export const publishShiftsAsync = createAsyncThunk(
    'shift/publishShifts',
    async (_, appThunk) => {
        try {
            const currentState = appThunk.getState() as RootState
            return await shiftAPI.publish(startEndDateFilter(currentState))
        } catch (error: any) {
            appThunk.dispatch(setMessage(error.message))
            throw new Error(error.message)
        }
    }
)

export default shiftSlice.reducer
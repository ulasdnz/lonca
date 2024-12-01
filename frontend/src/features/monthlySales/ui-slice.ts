import { createSlice } from '@reduxjs/toolkit'
import { CUSTOM_API_STATUS } from '../../constants'
import { getMonthlySales } from './api-slice'

export const salesSlice = createSlice({
  name: 'sales',
  initialState: {
    status: CUSTOM_API_STATUS.IDLE,
    data: null,
    error: null,
  } as MonthlySalesInitialState,

  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getMonthlySales.pending, state => {
        state.status = CUSTOM_API_STATUS.LOADING as CUSTOM_API_STATUS
      })
      .addCase(getMonthlySales.fulfilled, (state, action) => {
        state.status = CUSTOM_API_STATUS.SUCCEEDED as CUSTOM_API_STATUS
        state.data = action.payload
      })
      .addCase(getMonthlySales.rejected, (state, action: any) => {
        state.status = CUSTOM_API_STATUS.FAILED as CUSTOM_API_STATUS
        state.error = action.payload.message || 'An error occurred'
      })
  },
})

export const {} = salesSlice.actions

export default salesSlice.reducer

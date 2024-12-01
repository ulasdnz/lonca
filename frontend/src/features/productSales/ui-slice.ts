import { createSlice } from '@reduxjs/toolkit'
import { CUSTOM_API_STATUS } from '../../constants'
import { getProductsSalesMonthly } from './api-slice'

export const salesSlice = createSlice({
  name: 'sales',
  initialState: {
    status: CUSTOM_API_STATUS.IDLE,
    data: null,
    error: null,
  } as ProductSalesInitialState,

  reducers: {
    setSelectedProductId: (state, action) => {
      state.selectedProductId = action.payload
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getProductsSalesMonthly.pending, state => {
        state.status = CUSTOM_API_STATUS.LOADING as CUSTOM_API_STATUS
      })
      .addCase(getProductsSalesMonthly.fulfilled, (state, action) => {
        state.status = CUSTOM_API_STATUS.SUCCEEDED as CUSTOM_API_STATUS
        state.data = action.payload
      })
      .addCase(getProductsSalesMonthly.rejected, (state, action: any) => {
        state.status = CUSTOM_API_STATUS.FAILED as CUSTOM_API_STATUS
        state.error = action.payload.message || 'An error occurred'
      })
  },
})

export const { setSelectedProductId } = salesSlice.actions

export default salesSlice.reducer

import axiosInstance from '../../utils/axiosInstance'
import { createAsyncThunk } from '@reduxjs/toolkit'
import config from '../../../config'

export const getProductsSalesMonthly = createAsyncThunk('products', async (_params, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(`${config.serverIp}/sales/vendors?groupBy=product`)

    return response?.data
  } catch (error: any) {
    return rejectWithValue(error.response.data.message)
  }
})

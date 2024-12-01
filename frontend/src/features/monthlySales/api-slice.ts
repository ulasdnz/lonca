import axiosInstance from '../../utils/axiosInstance'
import { createAsyncThunk } from '@reduxjs/toolkit'
import config from '../../../config'

export const getMonthlySales = createAsyncThunk('monthly', async (_params, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(`${config.serverIp}/sales/vendors?groupBy=month`)
    return response?.data
  } catch (error: any) {
    return rejectWithValue(error.response.data.message)
  }
})

import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import config from '../../../config'

export const getVendors = createAsyncThunk('vendors', async (_data, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${config.serverIp}/vendors`)
    return response?.data
  } catch (error: any) {
    return rejectWithValue(error.response.data.message ?? 'Unexpected error occurred')
  }
})

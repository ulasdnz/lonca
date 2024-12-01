import { createSlice } from '@reduxjs/toolkit'
import { getVendors } from './api-slice'
import { CUSTOM_API_STATUS } from '../../constants'

const loginSlice = createSlice({
  name: 'sales',
  initialState: {
    vendors: {
      status: CUSTOM_API_STATUS.IDLE as CUSTOM_API_STATUS,
      data: null,
      error: null,
    },
    user: {
      id: localStorage.getItem('id') || null,
      email: localStorage.getItem('email') || null,
      name: localStorage.getItem('name') || null,
      vendorId: localStorage.getItem('vendorId') || null,
      token: localStorage.getItem('token') || null,
    },
  } as LoginInitialState,

  reducers: {
    setUser: (state, action) => {
      state.user.id = action.payload.user._id
      state.user.email = action.payload.user.email
      state.user.name = action.payload.user.name
      state.user.vendorId = action.payload.user.vendorId
      state.user.token = action.payload.token

      localStorage.setItem('id', action.payload.user._id)
      localStorage.setItem('email', action.payload.user.email)
      localStorage.setItem('name', action.payload.user.name)
      localStorage.setItem('vendorId', action.payload.user.vendorId)
      localStorage.setItem('token', action.payload.token)
    },
    logout: state => {
      state.user.id = null
      state.user.email = null
      state.user.name = null
      state.user.vendorId = null
      state.user.token = null
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getVendors.pending, state => {
        state.vendors.status = CUSTOM_API_STATUS.LOADING as CUSTOM_API_STATUS
      })
      .addCase(getVendors.fulfilled, (state, action) => {
        state.vendors.status = CUSTOM_API_STATUS.SUCCEEDED as CUSTOM_API_STATUS
        state.vendors.data = action.payload
      })
      .addCase(getVendors.rejected, (state, action: any) => {
        state.vendors.status = CUSTOM_API_STATUS.FAILED as CUSTOM_API_STATUS
        state.vendors.error = action.payload.message || 'An error occurred'
      })
  },
})

export const { setUser, logout } = loginSlice.actions

export default loginSlice.reducer

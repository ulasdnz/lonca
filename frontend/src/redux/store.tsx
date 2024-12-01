import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import monthlySalesReducer from '../features/monthlySales/ui-slice'
import productSalesReducer from '../features/productSales/ui-slice'
import loginReducer from '../features/login/ui-slice'

export const store = configureStore({
  reducer: {
    monthlySales: monthlySalesReducer,
    productSales: productSalesReducer,
    login: loginReducer,
  },
})

setupListeners(store.dispatch)
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

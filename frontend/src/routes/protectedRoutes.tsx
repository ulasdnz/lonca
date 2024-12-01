import MonthlySales from '../pages/monthlySales'
import ProductSales from '../pages/productSales'

const protectedRoutes = [
  { path: '/monthly-sales', element: <MonthlySales /> },
  { path: '/product-sales', element: <ProductSales /> },
  { path: '/', element: <MonthlySales /> },
]

export default protectedRoutes

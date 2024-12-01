import { useEffect, useState, useRef } from 'react'
import { getProductsSalesMonthly } from '../features/productSales/api-slice.ts'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../redux/store.tsx'
import ProductSales from '../components/tables/productSales.tsx'
import MonthlySales from '../components/charts/sales.tsx'
import { CUSTOM_API_STATUS } from '../constants/index.ts'
import Header from '../components/navbar/index.tsx'
import AxiosInstance from '../utils/axiosInstance.ts'
import config from '../../config.ts'
import Loading from '../components/loading/index.tsx'
import Error from '../components/error/index.tsx'

function App() {
  const dispatch = useDispatch<AppDispatch>()
  const { status, error, data } = useSelector((state: { productSales: ProductSalesInitialState }) => state.productSales)
  const [productDetail, setProductDetail] = useState({ status: CUSTOM_API_STATUS.IDLE, data: null, error: null })
  const [selectedProduct, setSelectedProduct] = useState<ProductSale | null>(null)
  const scrollRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    dispatch(getProductsSalesMonthly())
  }, [])

  const handleProductSelect = async (productId: string) => {
    try {
      setProductDetail({ status: CUSTOM_API_STATUS.LOADING, data: null, error: null })
      const response = await AxiosInstance.get(`${config.serverIp}/sales/vendors?productId=${productId}&groupBy=month`)
      setProductDetail({ status: CUSTOM_API_STATUS.SUCCEEDED, data: response.data, error: null })
    } catch (error: any) {
      setProductDetail({ status: CUSTOM_API_STATUS.FAILED, data: null, error: error.response?.data?.message ?? error.message })
    }
  }

  useEffect(() => {
    if (selectedProduct) handleProductSelect(selectedProduct.productId)
  }, [selectedProduct])

  useEffect(() => {
    if (productDetail.data && productDetail.status == CUSTOM_API_STATUS.SUCCEEDED && scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [productDetail])

  return (
    <div>
      <Header />
      {(productDetail.status === CUSTOM_API_STATUS.FAILED || productDetail.error) && <Error error={productDetail.error ?? 'Unexpected error occurred.'} />}
      {status === CUSTOM_API_STATUS.FAILED && <Error error={error ?? 'Unexpected error occurred.'} />}
      <div className='xl:w-9/12 sm:w-11/12 mx-auto mb-12'>
        <div className='pt-12 pl-8'>
          <h2 className='mb-6 text-2xl font-semibold text-gray-800'>All Time Sales By Product</h2>
          {status === CUSTOM_API_STATUS.LOADING && <Loading />}
          {status === CUSTOM_API_STATUS.SUCCEEDED && data && (
            <ProductSales
              data={data}
              handleProductSelect={setSelectedProduct}
            />
          )}
          {productDetail.status === CUSTOM_API_STATUS.LOADING && <Loading />}
          {productDetail.status === CUSTOM_API_STATUS.SUCCEEDED && productDetail.data && selectedProduct && (
            <div
              ref={scrollRef}
              className='mt-12'>
              <h2 className='pl-8 mb-6 text-2xl font-semibold text-gray-800'>Sales For The Product: {selectedProduct.name}</h2>
              <MonthlySales data={productDetail.data} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App

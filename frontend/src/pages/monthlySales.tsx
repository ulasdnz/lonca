import { useEffect } from 'react'
import { getMonthlySales } from '../features/monthlySales/api-slice.ts'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../redux/store.tsx'
import MonthlySales from '../components/charts/sales.tsx'
import { CUSTOM_API_STATUS } from '../constants/index.ts'
import Header from '../components/navbar/index.tsx'
import Loading from '../components/loading/index.tsx'
import Error from '../components/error/index.tsx'

function App() {
  const dispatch = useDispatch<AppDispatch>()
  const { status, error, data } = useSelector((state: { monthlySales: MonthlySalesInitialState }) => state.monthlySales)
  const { vendorId } = useSelector((state: { login: LoginInitialState }) => state.login.user)

  useEffect(() => {
    if (vendorId) dispatch(getMonthlySales())
  }, [])

  return (
    <div>
      <Header />
      <div className='xl:w-9/12 mx-auto  sm:w-11/12  mt-12'>
        <h2 className='pl-8 mb-6 text-2xl font-semibold text-gray-800'>Monthly Sales</h2>
        {status === CUSTOM_API_STATUS.LOADING && <Loading />}
        {(status === CUSTOM_API_STATUS.FAILED || error != null) && <Error error={error ?? 'Unexpected error occurred.'} />}
        {data && <MonthlySales data={data} />}
      </div>
    </div>
  )
}

export default App

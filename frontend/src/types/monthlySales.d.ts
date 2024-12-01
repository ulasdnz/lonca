type monthlySale = {
  date: string
  price: number
}

type MonthlySalesInitialState = {
  status: CUSTOM_API_STATUS
  data: monthlySale[] | null
  error: string | null
}

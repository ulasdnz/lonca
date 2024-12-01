type ProductSale = {
  productId: string
  name: string
  totalSaleNumber: number
  totalPrice: number
}

type ProductDetail = {
  date: string
  price: number
}

type ProductSalesInitialState = {
  selectedProductId: number | null
  status: CUSTOM_API_STATUS
  data: ProductSale[] | null
  error: string | null
}

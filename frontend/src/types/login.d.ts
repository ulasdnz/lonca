type User = {
  id: string | null
  email: string | null
  name: string | null
  vendorId: string | null
  token: string | null
}

type LoginInitialState = {
  vendors: {
    data: Vendor[] | null
    status: CUSTOM_API_STATUS
    error: string | null
  }
  user: User
}

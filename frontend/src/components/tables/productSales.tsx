import { useState, useEffect, useRef } from 'react'
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  TablePagination,
  TextField,
  Paper,
  TableSortLabel,
  IconButton,
  Button,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import useOnClickOutside from '../../hooks/useOutSideClick'
import CloseIcon from '@mui/icons-material/Close'

const ProductTable = ({ data, handleProductSelect }: { data: ProductSale[]; handleProductSelect: (product: ProductSale) => void }) => {
  const [search, setSearch] = useState<string>('')
  const [rowsPerPage, setRowsPerPage] = useState<number>(10)
  const [page, setPage] = useState<number>(0)
  const [order, setOrder] = useState<'asc' | 'desc'>('desc')
  const [sortBy, setSortBy] = useState<string>('totalPrice')
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  useOnClickOutside(inputRef, () => setIsSearchOpen(false))

  useEffect(() => {
    if (isSearchOpen && inputRef.current) inputRef.current.focus()
  }, [isSearchOpen])

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
    setPage(0)
  }

  const handleChangePage = (_: any, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleSort = (column: string) => {
    const isAsc = sortBy === column && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setSortBy(column)
  }

  const filteredData = data.filter(product => product.name.toLowerCase().includes(search.toLowerCase()))

  const handleSortData = (array: ProductSale[]) => {
    return array.sort((a: any, b: any) => {
      const aValue = sortBy === 'name' ? a.name.toLowerCase() : a[sortBy]
      const bValue = sortBy === 'name' ? b.name.toLowerCase() : b[sortBy]

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return order === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
      } else if (typeof aValue === 'number' && typeof bValue === 'number') {
        return order === 'asc' ? aValue - bValue : bValue - aValue
      }
      return 0
    })
  }

  const sortedFilteredData = handleSortData(filteredData)
  const paginatedData = sortedFilteredData.slice(page * rowsPerPage, (page + 1) * rowsPerPage)

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ fontSize: '18px' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <TableSortLabel
                    active={sortBy === 'name'}
                    direction={sortBy === 'name' ? order : 'asc'}
                    onClick={() => handleSort('name')}>
                    Product Name
                  </TableSortLabel>
                  <IconButton
                    size='small'
                    onClick={() => setIsSearchOpen(!isSearchOpen)}>
                    <SearchIcon />
                  </IconButton>
                  {!isSearchOpen && search != '' && (
                    <span
                      onClick={() => setIsSearchOpen(true)}
                      className='bg-slate-200 py-1 px-2 rounded	'>
                      {search}
                      <IconButton
                        style={{ padding: 1 }}
                        onClick={() => setSearch('')}>
                        <CloseIcon style={{ fontSize: 15, marginTop: '-8px', marginLeft: '4px' }} />
                      </IconButton>
                    </span>
                  )}
                </div>
                {isSearchOpen && (
                  <TextField
                    placeholder='Search...'
                    inputRef={inputRef}
                    size='small'
                    variant='standard'
                    value={search}
                    onChange={handleSearch}
                    style={{ marginTop: 8 }}
                  />
                )}
              </TableCell>
              <TableCell
                style={{ fontSize: '18px' }}
                align='right'>
                <TableSortLabel
                  active={sortBy === 'totalSaleNumber'}
                  direction={sortBy === 'totalSaleNumber' ? order : 'asc'}
                  onClick={() => handleSort('totalSaleNumber')}>
                  Number of Items Sold
                </TableSortLabel>
              </TableCell>
              <TableCell
                style={{ fontSize: '18px' }}
                align='right'>
                <TableSortLabel
                  style={{ fontSize: '18px' }}
                  active={sortBy === 'totalPrice'}
                  direction={sortBy === 'totalPrice' ? order : 'asc'}
                  onClick={() => handleSort('totalPrice')}>
                  Total Price
                </TableSortLabel>
              </TableCell>
              <TableCell
                style={{ fontSize: '18px' }}
                align='right'>
                Details
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedData.map((product, index) => (
              <TableRow key={index}>
                <TableCell style={{ fontSize: '16px' }}>{product.name}</TableCell>
                <TableCell
                  style={{ fontSize: '16px' }}
                  align='right'>
                  {product.totalSaleNumber}
                </TableCell>
                <TableCell
                  style={{ fontSize: '16px' }}
                  align='right'>
                  ${product.totalPrice.toFixed(2)}
                </TableCell>
                <TableCell
                  style={{ fontSize: '16px' }}
                  align='right'>
                  <Button
                    style={{ fontSize: '14px' }}
                    onClick={() => handleProductSelect(product)}
                    variant='contained'>
                    See Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {paginatedData.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={3}
                  align='center'>
                  There is no data to show
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component='div'
        count={filteredData.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </>
  )
}

export default ProductTable

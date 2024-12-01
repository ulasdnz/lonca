import { Link } from 'react-router-dom'
import { logout } from '../../features/login'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import Logo from '../../assets/logo.avif'

const Header = () => {
  const user = useSelector((state: { login: LoginInitialState }) => state.login.user)
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <nav className='sticky top-0 z-50 py-4 px-6 sm:px-[9vw] bg-gray-100 flex items-center justify-between shadow-md'>
        <div>
          <img
            src={Logo}
            alt='logo'
            className='h-10'
          />
        </div>
        <button
          className='sm:hidden text-gray-600 focus:outline-none'
          onClick={toggleMenu}>
          <svg
            className='w-6 h-6'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
            />
          </svg>
        </button>
        <div className='hidden sm:flex'>
          <ul className='flex space-x-8 font-bold'>
            <li>
              <Link
                to='/monthly-sales'
                className='hover:underline'>
                Monthly Sales
              </Link>
            </li>
            <li>
              <Link
                to='/product-sales'
                className='hover:underline'>
                Product Sales
              </Link>
            </li>
            <li>
              <a
                href='/login'
                onClick={() => {
                  localStorage.clear()
                  logout()
                }}
                className='hover:underline'>
                Logout
              </a>
            </li>
            <li>
              <span className='font-bold ml-6'>{user.name}</span>
            </li>
          </ul>
        </div>
      </nav>

      <div
        className={`fixed top-16 left-0 w-full bg-gray-100 z-40 transition-all duration-300 sm:hidden ${isOpen ? 'max-h-screen' : 'max-h-0'} overflow-hidden`}>
        <ul className='flex flex-col space-y-4 p-4 font-bold'>
          <li>
            <Link
              to='/monthly-sales'
              className='hover:underline'
              onClick={toggleMenu}>
              Monthly Sales
            </Link>
          </li>
          <li>
            <Link
              to='/product-sales'
              className='hover:underline'
              onClick={toggleMenu}>
              Product Sales
            </Link>
          </li>
          <li>
            <a
              href='/login'
              onClick={() => {
                localStorage.clear()
                logout()
              }}
              className='hover:underline'>
              Logout
            </a>
          </li>
          <li>
            <span className='font-bold'>{user.name}</span>
          </li>
        </ul>
      </div>
    </>
  )
}

export default Header

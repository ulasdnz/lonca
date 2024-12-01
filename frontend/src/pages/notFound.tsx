const NotFound = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gray-100'>
      <h1 className='text-9xl font-extrabold text-gray-800'>404</h1>
      <h2 className='text-2xl font-semibold text-gray-600 mt-4'>Page Not Found</h2>
      <p className='text-gray-500 mt-2 text-center max-w-lg'>
        The page you're looking for doesn't exist or has been moved. Please check the URL or go back to the homepage.
      </p>
      <a
        href='/'
        className='mt-6 px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg text-lg shadow-lg'>
        Go Home
      </a>
    </div>
  )
}

export default NotFound

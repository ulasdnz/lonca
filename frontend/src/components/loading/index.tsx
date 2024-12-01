const Loading = () => {
  return (
    <div className='flex mt-24 justify-center min-h-screen'>
      <div className='flex space-x-2'>
        <div className='w-4 h-4 bg-blue-500 rounded-full animate-bounce'></div>
        <div className='w-4 h-4 bg-blue-500 rounded-full animate-bounce delay-150'></div>
        <div className='w-4 h-4 bg-blue-500 rounded-full animate-bounce delay-300'></div>
      </div>
    </div>
  )
}

export default Loading

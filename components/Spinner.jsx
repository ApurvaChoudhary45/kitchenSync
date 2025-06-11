import React from 'react'

const Spinner = () => {
  return (
    <div>
      <div className="col-span-3 flex justify-center items-center py-20 w-full">
        <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin text-center">
        </div>
      </div>


    </div>
  )
}

export default Spinner

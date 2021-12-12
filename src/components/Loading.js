import React from 'react'
import ReactLoading from 'react-loading'

function Loading({ isShow }) {
  return (
    isShow && (
      <div className="fixed top-0 w-screen h-screen flex flex-col items-center justify-center bg-gray-50 opacity-70 z-50">
        <ReactLoading
          type={'spin'}
          color={'#2e90ff'}
          height={'4rem'}
          width={'4rem'}
        />
      </div>
    )
  )
}

export default Loading

import React from 'react'
import Loader from 'react-loader-spinner'
import './ChatPageMaskLoader.scss'

const ChatPageMaskLoader = () => {
  return (
    <div className="mask-wrapper">
      <Loader
        className="loader"
        type="Oval"
        color="#00BFFF"
        height={100}
        width={100}
      />
    </div>
  )
}

export default ChatPageMaskLoader

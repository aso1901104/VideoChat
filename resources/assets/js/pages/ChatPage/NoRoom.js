import React from 'react'
import { Link } from 'react-router-dom'
import './noRoom.scss'
import { FaExclamationTriangle as Icon } from 'react-icons/fa'

const NoRoom = ({ roomName }) => {
  return (
    <div className="no-room-wrapper">
      <div className="container">
        <Icon className="icon" />
        <h2 className="main-title">/{roomName}は存在しません。</h2>
        <h2 className="main-title">正しいURLを入力しましたか？</h2>
        <Link
          className="return-button"
          to="/"
        >
          戻る
        </Link>
      </div>
    </div>
  )
}

export default NoRoom

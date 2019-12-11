import React from 'react'
import { Link } from 'react-router-dom'
import './noRoom.scss'

const NoRoom = ({ roomName }) => {
  return (
    <div className="no-room-wrapper">
      <h2 className="main-title">/{roomName}は存在しません</h2>
      <h2 className="main-title">正しいURLを入力しましたか？</h2>
      <Link to="/">戻る</Link>
    </div>
  )
}

export default NoRoom;

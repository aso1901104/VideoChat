import React from 'react'
import { Link } from 'react-router-dom'
import { FaVideo } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";

import './roomList.scss'

const RoomList = ({ rooms, setIsOpenDeleteModal, setSelectedRoomId }) => {

  const roomItems = rooms.map(room => (
    <li>
      <Link to={`/chat/${room.name}`} className="room-list-content-wrapper">
        <FaVideo className="icon" />
          <p>{room.name}</p>
        <div className="close-icon-area"
          onClick={() => {
            setIsOpenDeleteModal(true)
            setSelectedRoomId(room.id)
          }}
        >
          <FaTimes className="close-icon" />
        </div>
      </Link>
    </li>
  ))
  return (
  <div className="room-list-wrapper">
    <ul>
      {roomItems}
    </ul>
  </div>)
}

export default RoomList;

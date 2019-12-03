import React from 'react'
import { Link } from 'react-router-dom'
import { FaVideo } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";

import './roomList.scss'

const RoomList = ({ rooms, setIsOpenDeleteModal, setSelectedRoomId }) => {

  const roomItems = rooms.map(room => (
    <li>
      <div className="room-list-content-wrapper">
        <Link className="link-area" to={`/chat/${room.name}`}>
          <FaVideo className="icon" />
          <p>{room.name}</p>
        </Link>
        <div className="close-icon-area"
          onClick={() => {
            setIsOpenDeleteModal(true)
            setSelectedRoomId(room.id)
          }}
        >
          <FaTimes className="close-icon" />
        </div>
      </div>
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

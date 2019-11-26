import React from 'react'
import { FaVideo } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";

import './roomList.scss'

const RoomList = ({ rooms, setIsOpenDeleteModal }) => {

  const roomItems = rooms.map(room => (
    <li>
      <div className="room-list-content-wrapper">
        <FaVideo className="icon" />
        <p>{room.name}</p>
        <div className="close-icon-area" onClick={() => setIsOpenDeleteModal(true)}>
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

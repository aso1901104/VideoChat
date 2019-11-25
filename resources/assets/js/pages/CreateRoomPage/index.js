import React, { useState, useEffect }from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import RequireAuthWrapper from '../../components/RequireAuthWrapper'

import { FaVideo } from "react-icons/fa";


import './createRoomPage.scss'

const RoomList = ({ rooms }) => {

  const roomItems = rooms.map(room => (
    <li>
      <div className="room-list-content-wrapper">
        <FaVideo className="icon" />
        <p>{room.name}</p>
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

const CreateRoomPage = RequireAuthWrapper((props) => {
  const [rooms, setRooms] = useState([])
  const createRoom = () => {
    axios.post('/createRoom', {
      room_name: 'asfasdasdfasdfasdasdfasdf',
    })
  }
  const getMyRooms = () => {
    axios.get('/getMyRooms').then(res => {
      setRooms(res.data.rooms);
    })
  }

  useEffect(() => {
    getMyRooms();
    console.log('aaaaaaaaaaa')
  }, [])
  return (
    <div className="create-room-wrapper">
      <div className="create-room-content-wrapper">
        <div className="room-list-area">
          <h3 className="title">Your rooms</h3>
          <RoomList rooms={rooms} />
        </div>
      </div>
    </div>
  )
});

export default CreateRoomPage

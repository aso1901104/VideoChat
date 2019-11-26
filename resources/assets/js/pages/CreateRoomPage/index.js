import React, { useState, useEffect }from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import RequireAuthWrapper from '../../components/RequireAuthWrapper'

import './createRoomPage.scss'

import RoomList from './RoomList';
import DeleteRoomModal from '../../components/Modals/DeleteRoomModal'


const CreateRoomPage = RequireAuthWrapper((props) => {
  const [rooms, setRooms] = useState([])
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)
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

  const deleteRoom = (roomId) => {
    axios.delete(`/deleteRoom/${roomId}`)
  }

  const closeDeleteModal = () => {
    setIsOpenDeleteModal(false)
  }

  useEffect(() => {
    getMyRooms();
  }, [])
  return (
    <div className="create-room-wrapper">
      {isOpenDeleteModal && <DeleteRoomModal closeDeleteModal={closeDeleteModal} />}
      <div className="create-room-content-wrapper">
        <div className="room-list-area">
          <h3 className="title">Your rooms</h3>
          <RoomList
            rooms={rooms}
            deleteFunc={deleteRoom}
            setIsOpenDeleteModal={setIsOpenDeleteModal}
          />
        </div>
      </div>
    </div>
  )
});

export default CreateRoomPage

import React, { useState, useEffect }from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import RequireAuthWrapper from '../../components/RequireAuthWrapper'

import './createRoomPage.scss'

import RoomList from './RoomList';
import DeleteRoomModal from '../../components/Modals/DeleteRoomModal'
import CreateRoomModal from '../../components/Modals/CreateRoomModal'


const CreateRoomPage = RequireAuthWrapper((props) => {
  const [rooms, setRooms] = useState([])
  const [errors, setErrors] = useState([])
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)
  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false)
  const [selectedRoomId, setSelectedRoomId] = useState(null)
  const [roomName, setRoomName] = useState('');
  const createRoom = () => {
    axios.post('/createRoom', {
      name: roomName,
    }).then(res => {
      setRoomName('')
      setRooms(res.data.rooms)
      setIsOpenCreateModal(false)
    }).catch((e) => {
      const errors = Object.values(e.response.data.errors)
      setErrors(errors)

    })
  }
  const getMyRooms = () => {
    axios.get('/getMyRooms').then(res => {
      setRooms(res.data.rooms);
    })
  }
  const deleteRoom = (roomId) => {
    axios.delete(`/deleteRoom/${roomId}`).then((res) => {
      const { rooms } = res.data
      setRooms(rooms);
      setIsOpenDeleteModal(false)
    });
  }
  const closeDeleteModal = () => {
    setIsOpenDeleteModal(false)
  }
  const closeCreateModal = () => {
    setRoomName('')
    setIsOpenCreateModal(false)
  }
  useEffect(() => {
    getMyRooms();
  }, [])
  return (
    <div className="create-room-wrapper">

      {isOpenDeleteModal && <DeleteRoomModal closeModal={closeDeleteModal} deleteRoom={() => deleteRoom(selectedRoomId)} />}
      {isOpenCreateModal &&
        <CreateRoomModal
          createRoom={createRoom}
          setRoomName={setRoomName}
          closeModal={closeCreateModal}
          roomName={roomName}
          errors={errors}
        />
      }
      <div className="create-room-content-wrapper">
        <div className="room-list-area">
          <h3 className="title">Your rooms</h3>
          <RoomList
            rooms={rooms}
            deleteFunc={deleteRoom}
            setIsOpenDeleteModal={setIsOpenDeleteModal}
            setSelectedRoomId={setSelectedRoomId}
          />
          <div className="button-area">
            <button className="create-button" onClick={() => setIsOpenCreateModal(true)}>Create a room</button>
          </div>
        </div>
      </div>
    </div>
  )
});

export default CreateRoomPage

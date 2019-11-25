import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import RequireAuthWrapper from '../../components/RequireAuthWrapper'

const CreateRoomPage = RequireAuthWrapper((props) => {
  console.log(props.currentUser)
  const createRoom = () => {
    axios.post('/createRoom', {
      room_name: 'asfasdasdfasdfasdasdfasdf',
    })
  }
  return (
    <div onClick={() => createRoom()}>create room</div>
  )
});

export default CreateRoomPage

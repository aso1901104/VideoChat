import React from 'react';

import './createRoomModal.scss'

import ModalMask from '../ModalMask'
const MIX_APP_URL = process.env.MIX_APP_URL;

const CreateRoomModal = ModalMask(({ roomName, setRoomName, closeModal, createRoom, errors }) => {
  return (
    <div className="create-room-modal-wrapper">
      <h2 className="create-modal-title">プライベートな会議室を作成して始めましょう</h2>
      <p className="root-url">{MIX_APP_URL}/</p>
      {errors.length > 0 ?
      errors.map(error => {
      return (<p className="error-message">{error}</p>)
      })
      :
      null
      }
      <div className="input-wrapper">
        <input
          className="room-name-input"
          type="text"
          placeholder="企業名、プロジェクト名やその他の名前。"
          value={roomName}
          onChange={e => setRoomName(e.target.value)}
        />
      </div>
      <div className="button-area">
        <button className={roomName !== '' ? 'create-button' : 'create-button none-active'} onClick={() => createRoom()}>作成</button>
        <button className="cancel-button" onClick={() => closeModal()}>キャンセル</button>
      </div>
    </div>
  )
})

export default CreateRoomModal;

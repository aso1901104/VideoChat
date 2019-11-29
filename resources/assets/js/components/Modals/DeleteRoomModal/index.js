import React from 'react';

import './deleteRoomModal.scss'

import ModalMask from '../ModalMask'

const DeleteRoomModal = ModalMask(({ closeModal, deleteRoom }) => {
  return (
    <div className="delete-room-modal-wrapper">
      <h2 className="delete-modal-title">本当にこの部屋を消しても宜しいですか？</h2>
      <div className="button-area">
      <button className="no-button" onClick={() => closeModal()}>Cancel</button>
      <button className="yes-button" onClick={() => deleteRoom()}>Delete</button>
      </div>
    </div>
  )
})

export default DeleteRoomModal;

import React from 'react';

import './deleteRoomModal.scss'

import ModalMask from '../ModalMask'

const DeleteRoomModal = ModalMask(() => {
  return (
    <div className="delete-room-modal-wrapper">
      <h2 className="delete-modal-title">本当にこの部屋を消しても宜しいですか？</h2>
      <div className="button-area">
      <button className="no-button">Cancel</button>
      <button className="yes-button">Delete</button>
      </div>
    </div>
  )
})

export default DeleteRoomModal;

import React from 'react'
import './modalMask.scss';

const ModalMask = WappedCompo => {
  return class extends React.Component {
    constructor(props) {
      super(props)
    }
    render() {
      return (
        <div className="modal-mask-wrapper" onClick={(e) => {
          e.target.className === 'modal-mask-wrapper' && this.props.closeDeleteModal(e)
        }}>
          <div>
            <WappedCompo {...this.props} />
          </div>
        </div>
      )
    }
  }
}

export default ModalMask

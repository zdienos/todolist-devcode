import React from 'react'
import delSuccess from '../image/modal-information-icon.svg'

function ModalDelSuccess( {setModal} ) {
  return (
    <div className='modal-background' onClick={() => {
      setModal(false)
    }}>
        <div data-cy="modal-information" className='modal-delete-success'>
            <img data-cy="modal-information-icon" src={delSuccess} alt="delete-success"></img>
            <h4 data-cy="modal-information-title">Activity berhasil dihapus</h4>
        </div>
    </div>
  )
}

export default ModalDelSuccess
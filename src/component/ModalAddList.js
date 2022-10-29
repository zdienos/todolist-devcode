import React from 'react'
import closeBtn from '../image/icon-close.72631f1e.svg'
import dropDown from '../image/icon-dropdown.e6b09153.svg'
import { useState } from 'react'

function ModalAddList({setModal, setNewTodo, addItemTodo}) {
  const priority = ["very-high", "high", "normal", "low", "very-low"]
  const options = ["Very High", "High", "Medium", "Low", "Very Low"]
  const dataCy = ["modal-add-prioprity-very-high","modal-add-prioprity-high","modal-add-prioprity-medium","modal-add-prioprity-low","modal-add-prioprity-very-low"]

  const [selected, setSelected] = useState({
                                            color: 0, 
                                            optionPriority: "Very High"})
  const [dropDownOpened, setDropDownOpened] = useState(false)
  const [inputValue, setInputValue] = useState("")

  function handleInput(event){
    const {value} = event.target
    setInputValue(value)
    setNewTodo((prevValue) => {
      return({
      ...prevValue,
      newTitle: value
    }
      )})
  }

  return (
    <div className='modal-background'>
        <div data-cy="modal-add" className='modal-content'>
            <div className='modal-header'>
                <h3 data-cy="modal-add-title">Tambah List Item</h3>
                <img data-cy="modal-add-close-button" className='close-button' src={closeBtn} alt='close-button' onClick={()=>{
                  setModal(false)
                }}></img>
            </div>
            <div className='modal-body'>
              <div data-cy="modal-add-name-title">NAMA LIST ITEM</div>
              <input data-cy="modal-add-name-input" className='input-activity' type='text' placeholder='Tambahkan nama Activity' value={inputValue} onChange={handleInput}>
              </input>
              <div data-cy="modal-add-priority-title">PRIORITY</div>
              <div data-cy="modal-add-priority-item" className='dropdown-menu' onClick={()=> {
                setDropDownOpened(!dropDownOpened)
              }}>
                <div className={'item-priority '+priority[selected.color]}></div>
                <h4 className='type-priority'>{selected.optionPriority}</h4>
                <img src={dropDown} alt='dropdown'></img>
              </div>
              {dropDownOpened && (
                <div data-cy="modal-add-priority-dropdown" className='dropdown-content'>
                    {options.map((option, index)=> {
                        return (
                        <div data-cy={dataCy[index]} className='dropdown-item' key={index} onClick={()=> {
                            const prioritySelected = index
                            setSelected({
                              color: index,
                              optionPriority: option
                            })
                            setNewTodo((prevValue) => {
                              return ({
                                ...prevValue,
                                newPriority: priority[prioritySelected]
                              })
                            })
                            setDropDownOpened(false)
                        }}>
                            <div className={'item-priority '+priority[index]}></div>
                            <h4 className='type-priority'>{option}</h4>
                        </div>
                    )})}
                </div>
              )}
              {/* dropdown menu */}
            </div>
            <div className='modal-footer'>
              <button data-cy="modal-add-save-button" className='modal-button add-button' disabled={!inputValue} onClick={() => {
                addItemTodo()
                setModal(false)
              }}>Simpan</button>
            </div>
        </div>
    </div>
  )
}

export default ModalAddList
import React from 'react'
import closeBtn from '../image/icon-close.72631f1e.svg'
import dropDown from '../image/icon-dropdown.e6b09153.svg'
import { useState } from 'react'

function ModalEditList({setModal, setNewTodo, updateItemTodo, selectedItem}) {
  const priority = ["very-high", "high", "normal", "low", "very-low"]
  const options = ["Very High", "High", "Medium", "Low", "Very Low"]

  const colorSelected = priority.indexOf(selectedItem.priority)

  const [selected, setSelected] = useState({
                                            color: colorSelected, 
                                            optionPriority: options[colorSelected]})
  const [dropDownOpened, setDropDownOpened] = useState(false)
  const [inputValue, setInputValue] = useState(selectedItem.title)

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
        <div className='modal-content'>
            <div className='modal-header'>
                <h3>Edit Item</h3>
                <img className='close-button' src={closeBtn} alt='close-button' onClick={()=>{
                  setModal(false)
                }}></img>
            </div>
            <div className='modal-body'>
              <div>NAMA LIST ITEM</div>
              <input className='input-activity' type='text' placeholder='Tambahkan nama Activity' value={inputValue} onChange={handleInput}>
              </input>
              <div>PRIORITY</div>
              <div className='dropdown-menu' onClick={()=> {
                setDropDownOpened(!dropDownOpened)
              }}>
                <div className={'item-priority '+priority[selected.color]}></div>
                <h4 className='type-priority'>{selected.optionPriority}</h4>
                <img src={dropDown} alt='dropdown'></img>
              </div>
              {dropDownOpened && (
                <div className='dropdown-content'>
                    {options.map((option, index)=> {
                        return (
                        <div className='dropdown-item' key={index} onClick={()=> {
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
              <button className='modal-button add-button' disabled={!inputValue} onClick={() => {
                updateItemTodo()
                setModal(false)
              }}>Simpan</button>
            </div>
        </div>
    </div>
  )
}

export default ModalEditList
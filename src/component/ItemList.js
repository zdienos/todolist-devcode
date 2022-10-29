import React from 'react'
import { Link, useParams } from "react-router-dom"
import { useState, useEffect } from 'react'
import axios from 'axios'
import ModalSort from './ModalSort'
import ModalAddList from './ModalAddList'
import ModalEditList from './ModalEditList'
import emptyTodo from '../image/empty-todo.png'
import backTodo from '../image/icon-back.0fe266ef.svg'
import editTodo from '../image/todo-title-edit.png'
import sortTodo from '../image/todo-sort.png'
import delTodo from '../image/icon-delete.1e080ddb.svg'
import alertDel from '../image/modal-delete-icon.svg'


function ItemList() {
  const URL_API = "https://todo.api.devcode.gethired.id/"
  const {id} = useParams()
  const [modalAddOpened, setModalAddOpened] = useState(false)
  const [modalDelOpened, setModalDelOpened] = useState(false)
  const [modalSortOpened, setModalSortOpened] = useState(false)
  const [modalEditOpened, setModalEditOpened] = useState(false)
  const [editingTitle, setEditingTitle] = useState(false)
  const [dataResponse, setDataResponse] = useState([])
  const [selectedItem, setSelectedItem] = useState()
  const [titleActivity, setTitleActivity] = useState("")
  const [selectedSort, setSelectedSort] = useState("")
  const [newTodo, setNewTodo] = useState({newTitle: "", newPriority: "very-high"})

  useEffect(() => {
    getItemDetail()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function getItemDetail(){
    axios.get(URL_API +"activity-groups/"+id)
    .then(function (response){
      setTitleActivity(response.data.title)
      setDataResponse(response.data.todo_items)
    }).catch(function (error){
      console.log(error)
    }).then(function() {
      sortingTodo(selectedSort)
    })
  }

  function addItemTodo(){
    axios.post(URL_API + 'todo-items', {
      activity_group_id: id,
      title: newTodo.newTitle,
      priority: newTodo.newPriority,
      is_active: 1,
      _comment: "list of priority is : very-high, high, normal, low, very-low | defalut value is very-high"
    })
    .then(function(){
      getItemDetail()
      setNewTodo({newTitle: "", newPriority: "very-high"})
    }).catch(function(error){
      console.log(error)
    })
  }

  function deleteItemTodo(){
    axios.delete(URL_API +'todo-items/'+selectedItem.id)
    .then(function (){
      getItemDetail()
    }).catch(function (error){
      console.log(error)
    })
  }

  function updateItemTodo(sele){
    axios.patch(URL_API +'todo-items/'+selectedItem.id, {
      title: newTodo.newTitle,
      priority: newTodo.newPriority
    })
    .then(function (){
      getItemDetail()
    }).catch(function (error){
      console.log(error)
    })
  }

  function updateTitleActivity(){
    axios.patch(URL_API + 'activity-groups/'+id, {
      title: titleActivity
    })
    .then(function (){
      getItemDetail()
    }).catch(function (error){
      console.log(error)
    })
  }

  function sortingTodo(selectedSort){
    switch(selectedSort){
      case "Terbaru":
        dataResponse.todo_items = dataResponse.sort((a,b) => {
          return b.id - a.id
        })
        break
      case "Terlama":
        dataResponse.todo_items = dataResponse.sort((a,b) => {
          return a.id - b.id
        })
        break
      case "A-Z":
        dataResponse.todo_items = dataResponse.sort((a,b) => {
          return a.title.toUpperCase() < b.title.toUpperCase() ? -1 : 1
        })
        break
      case "Z-A":
        dataResponse.todo_items = dataResponse.sort((a,b) => {
          return b.title.toUpperCase() < a.title.toUpperCase() ? -1 : 1
        })
        break;
      case "Belum Selesai":
        dataResponse.todo_items = dataResponse.sort((a,b) => {
          return b.is_active - a.is_active
        })
        break
      default:
        return dataResponse
    }
  }

  function handleCheckBox(id){
     const updatedItem = dataResponse.find((item) => {
      return item.id === id
     })
     updatedItem.is_active === 0 ? updatedItem.is_active = 1 : updatedItem.is_active = 0
     axios.patch(URL_API +'todo-items/'+id, {
      is_active: updatedItem.is_active
     }).then(() => {
      getItemDetail()
     }).catch((error) => {
      console.log(error)
     })
  }

  function handleInputTitle(event){
    const {value} = event.target
    setTitleActivity(value)
  }

  return (
    <div className='container'>
        <div className='dashboard-header'>
            <div className='detail-header-left'>
              <Link to='/todo-list/'><img data-cy='todo-back-button' className='todo-button backButton' src={backTodo} alt="back-Todo"></img></Link>
              <h1 data-cy='todo-title' className={editingTitle? "display-none" : ""}>{titleActivity}</h1>
              <input className={editingTitle ? "todo-edit-title" : "display-none"} type='text' value={titleActivity} onChange={handleInputTitle} onBlur={updateTitleActivity}></input>
              <img className='todo-button editButton' data-cy='todo-title-edit-button' src={editTodo} alt="edit-Todo" onClick={() => {
                setEditingTitle(!editingTitle)
              }}></img>
            </div>
            <div className='detail-header-right'>
              <div>
                <img data-cy='todo-sort-button' className='todo-button sortButton' src={sortTodo} alt="sort-Todo" onClick={() => {
                  setModalSortOpened(!modalSortOpened)
                }}></img>
                {modalSortOpened && <ModalSort setSelectedSort={setSelectedSort} selectedSort={selectedSort}
                sortingTodo={sortingTodo} setModal={setModalSortOpened} />}
              </div>
              <button data-cy='todo-add-button' className='add-button' onClick={() => {
                setModalAddOpened(true)
              }}>
                <span className="icon-plus">+ Tambah</span>
              </button>
            </div>
        </div>
        <div className='item-container'>

        {/*Ada todo */}
        {dataResponse.length > 0 ? (
          dataResponse.map((item, index) => {
            return (
                <div className='item-card' data-cy={'todo-item-'+index} key={index} onClick={() => {
                  setSelectedItem(item)
                }}>
                  <input type='checkbox' data-cy='todo-item-checkbox' checked={item.is_active === 0} onChange={(e) => {
                  handleCheckBox(item.id)
                  }}>
                  </input>
                  <div className={'item-priority '+item.priority} data-cy="todo-item-priority-indicator"></div>
                  <h4 className={item.is_active === 0 ? "item-checked" : ""} data-cy='todo-item-title'>{item.title}</h4>
                  <img className='todo-button editButton' data-cy='todo-item-edit-button' src={editTodo} alt="edit-Todo" onClick={() => {
                    setModalEditOpened(!modalEditOpened)
                  }}></img>
                  <img className='delete-button' data-cy="todo-item-delete-button" src={delTodo} alt='delete-activity' onClick={() => {
                    setModalDelOpened(!modalDelOpened)
                  }}>
                  </img>
                </div>
          )})
        ) : 
        (
          <div data-cy='todo-empty-state' className='activity-empty' onClick={() => {
                setModalAddOpened(true)
              }}>
            <img src={emptyTodo} alt="empty-Todo"></img>
          </div>
        )
        }
        </div>
        {/* Modal DELETE List */}
        { modalDelOpened && (
          <div className='modal-background'>
            <div className='modal-content-del' data-cy="modal-delete">
              <div className='modal-header'>
                <img src={alertDel} data-cy="modal-delete-icon" alt="alert-img"></img>
              </div>
              <div className='modal-body-del' data-cy="modal-delete-title">
                <p>Apakah anda yakin menghapus item list</p>
                <h4 className='modal-del-name'>"{selectedItem.title}"?</h4>
              </div>
              <div className='modal-footer'>
                <button data-cy="modal-delete-cancel-button" onClick={() => {
                  setModalDelOpened(!modalDelOpened)
                }}>Batal
                </button>
                <button data-cy="modal-delete-confirm-button" className='del-button' onClick={() => {
                  deleteItemTodo()
                  setModalDelOpened(!modalDelOpened)
                }}>Hapus</button>
              </div>
            </div>
          </div>
        )}
        {/* Modal ADD List */}
        {modalAddOpened && <ModalAddList setModal={setModalAddOpened} 
          setNewTodo={setNewTodo} addItemTodo={addItemTodo}/>}
        {modalEditOpened && <ModalEditList setModal={setModalEditOpened} 
        setNewTodo={setNewTodo} updateItemTodo={updateItemTodo} selectedItem={selectedItem} />}
    </div>
    
  )
}

export default ItemList
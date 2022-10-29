import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import ModalDelSuccess from './ModalDelSuccess'
import emptyActivity from '../image/empty-activity.png'
import delTodo from '../image/icon-delete.1e080ddb.svg'
import alertDel from '../image/modal-delete-icon.svg'


function Dashboard() {
  const URL_API = "https://todo.api.devcode.gethired.id/"
  const [dataResponse, setDataResponse] = useState([])
  const [modalDelOpened, setModalDelOpened] = useState(false)
  const [modalAlertDel, setModalAlertDel] = useState(false)
  const [selectedActivity, setSelectedActivity] = useState();

  useEffect(() => {
    getList()
  }, [])

  function getList() {
    axios.get(URL_API + "activity-groups?email=mardinosantosa@gmail.com")
      .then(function (response){
        setDataResponse(response.data.data)
      }).catch( function (error){
        console.log(error)
      })
  }

  function addActivity(){
    axios.post(URL_API + "activity-groups", {
        title: "New Activity",
        email: "mardinosantosa@gmail.com",
        _comment: "email digunakan untuk membedakan list data yang digunakan antar aplikasi"
    })
    .then(function () {
      getList()
    })
    .catch(function (error){
      console.log(error)
    })
  }

  function deleteActivity() {
    axios.delete(URL_API + "activity-groups/" + selectedActivity.id)
    .then(function () {
      getList()
    })
    .catch(function (error){
      console.log(error)
    })
  }

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric"}
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <div className='container'>
        <div className='dashboard-header'>
            <h1 data-cy='activity-title'>Activity</h1>
            <button className='add-button' data-cy='activity-add-button'><span className="icon-plus" onClick={() => {
              addActivity()
            }}>+ Tambah</span></button>
        </div>
        <div data-cy='Dashboard'>
      
          <div className='activity-container'>
            { 
              /* Active Activity */
              dataResponse.length > 0 ?
              
              dataResponse.map((data, index) => {
              return (
                  <div data-cy={"activity-item-"+index} className='activity-card' key={index} id={"itemTodo"+ index}>
                  <Link to={"/detail/"+data.id} style={{ color: 'inherit', textDecoration: 'inherit'}}>
                    <div className='activity-header'>
                      <h3 data-cy='activity-item-title'>{data.title}</h3>
                    </div>
                  </Link>
                  <div className='activity-footer'>
                    <h4 data-cy='activity-item-date'>{formatDate(data.created_at)}</h4>
                    <img data-cy='activity-item-delete-button' className='delete-button' src={delTodo} alt='delete-activity' onClick={()=> {
                      setSelectedActivity(data)
                      setModalDelOpened(!modalDelOpened)
                    }}></img>
                  </div>
                  </div>
              )
            }) :
            /* Empty Activity */
            <div data-cy='activity-empty-state' className='activity-empty'>
              <img src={emptyActivity} alt="empty-activity" onClick={() => {
                addActivity()
              }}></img>
            </div>
            }
          </div>
        </div>

        {/* Modal DELETE Activity */}
        { modalDelOpened && (
          <div className='modal-background' onClick={() => {
            setModalDelOpened(!modalDelOpened)
          }}>
            <div className='modal-content-del' data-cy="modal-delete">
              <div className='modal-header'>
                <img data-cy="modal-delete-icon" src={alertDel} alt="alert-img"></img>
              </div>
              <div className='modal-body-del' data-cy="modal-delete-title">
                <p>Apakah anda yakin menghapus activity ?</p>
                <h4>"{selectedActivity.title}"</h4>
              </div>
              <div className='modal-footer'>
                <button data-cy="modal-delete-cancel-button" onClick={() => {
                  setModalDelOpened(!modalDelOpened)
                }}>Batal</button>
                <button data-cy="modal-delete-confirm-button" className='del-button' onClick={() => {
                  deleteActivity()
                  setModalDelOpened(!modalDelOpened)
                  setModalAlertDel(!modalAlertDel)
                }}>Hapus</button>
              </div>
            </div>
          </div>
        )}
        
        {/* Modal Delete Success */}
        {modalAlertDel && <ModalDelSuccess setModal={setModalAlertDel}/>}
    </div>
  )
}

export default Dashboard
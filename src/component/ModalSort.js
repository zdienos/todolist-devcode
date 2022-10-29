import React from 'react'
import newestImg from '../image/sortTerbaru.svg'
import oldestImg from '../image/sortTerlama.svg'
import azImg from '../image/sortAZ.svg'
import zaImg from '../image/sortZA.svg'
import notFinishedImg from '../image/SortNotFinished.svg'
import tickSort from '../image/sortCentang.svg'

function ModalSort({sortingTodo, setSelectedSort, selectedSort, setModal}) {
    const srcSortImg = [newestImg, oldestImg, azImg, zaImg, notFinishedImg]
    const sortMenu = ["Terbaru", "Terlama", "A-Z", "Z-A", "Belum Selesai"]
    const dataCy = ["sort-latest","sort-oldest","sort-az","sort-za","sort-unfinished"]

  return (
    <div className='modal-sort-container' data-cy="sort-parent">
        {sortMenu.map((item, index) => {
            return(
            <div data-cy={dataCy[index]} className='modal-sort-item' key={index} onClick={() => {
                const itemSelected = item
                setSelectedSort(itemSelected)
                sortingTodo(itemSelected)
                setModal(false)
            }}>
                <img src={srcSortImg[index]} alt='sort-menu-img'></img>
                <div>{item}</div>
                {item === selectedSort && (
                    <img src={tickSort} alt="centang-sort"></img>
                )}
                
            </div>)
        })}
    </div>
  )
}

export default ModalSort
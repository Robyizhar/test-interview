import React from 'react'

const Pagination = ({goToPrevPage, goToNextPage, perPage, totalItems, currentPage, paginate}) => {

    const pageNumbers = [];

    for (let index = 1; index <= Math.ceil(parseInt(totalItems) / parseInt(perPage)); index++) {
        pageNumbers.push(index);
    }

    return (
        <div className='col-md-12 mt-5'>
            <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={goToPrevPage}>Previous</button>
                    </li>
                    {pageNumbers.map(number => (
                        <li onClick={() => paginate(number)} key={number} className={`page-item ${currentPage === number ? 'disabled' : ''}`}>
                            <span style={{cursor: "pointer"}} href='!#' className="page-link">{number}</span>
                        </li>
                    ))}
                    <li className={`page-item ${currentPage === pageNumbers.length ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={goToNextPage}>Next</button>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Pagination
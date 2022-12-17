import React, { Fragment } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchData, setPage, goToNextPage, goToPrevPage} from "../reduce/actions";
import Image from './Image'
import { config } from '../config';
import Button from './Button';
import Swal from 'sweetalert2'
import { deleteData } from '../api/fetchApi';
import Pagination from './Pagination';

const Index = () => {

    let dispatch = useDispatch();
    let response = useSelector(state => state.datas);
    let redirect = useNavigate();
    React.useEffect(() => {
		dispatch(fetchData());
	}, [dispatch, response.currentPage, response.keyword, response.perPage]);

    const deleteHandler = (id) => {

        Swal.fire({
            title: 'Delete This Item ?',
            showCancelButton: true,
            confirmButtonText: 'Ok',
        }).then((result) => {
            if (result.isConfirmed) {
                let result = deleteData(id);
                result.then(function(data) {
                    if (data.data.error === 1) {
                        Swal.fire(data.data.message, '', 'error')
                    } else {
                        Swal.fire('Deleted !', '', 'success')
                        dispatch(fetchData());
                    }
                })
            }
        })
    }

    const editHandler = (id) => {
        console.log(id);
        redirect(`/form/${id}`);
    }
    return (
        <Fragment>
            <div className='row'>
                <div className='col-12 col-sm-12 col-md-12 my-3'>
                <div className="card" >
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th scope="col">No</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Description</th>
                                        <th scope="col">Image</th>
                                        <th width="14%" scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {response.status === 'success' && response.data.map((row, index) => 
                                    <tr key={index}>
                                        <td>{index}</td>
                                        <td>{row.title}</td>
                                        <td>{row.description}</td>
                                        <td>{
                                            row.image_url && <Image url={`${config.api_host}/${row.image_url}`} width={'25%'}></Image>
                                        }</td>
                                        <td className='p-3'>
                                            <Button onAction={() => editHandler(row._id)} text={`Edit`} icon={`bi bi-pencil-square`} property={`btn btn-light`}></Button>
                                            <Button onAction={() => deleteHandler(row._id)} text={`Delete`} icon={`bi bi-trash-fill`} property={`btn btn-light`}></Button>
                                        </td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <Pagination 
                    currentPage={response.currentPage} 
                    perPage={response.perPage} 
                    totalItems={response.totalItems} 
                    paginate={ number => dispatch(setPage(number))} 
                    goToPrevPage={ () => dispatch(goToPrevPage())} 
                    goToNextPage={ () => dispatch(goToNextPage())}>
                </Pagination>
            </div>
        </Fragment>
    )
}

export default Index

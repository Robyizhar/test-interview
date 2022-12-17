import React, { useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { config } from '../config';
import { imagePreview, storeData, updateData, setStatus, getDataRow, setInput } from '../reduce/actions';
import { useForm } from 'react-hook-form';

import { rules } from './Validation';

const Form = () => {

    const { register, handleSubmit, setValue, setError, formState:{ errors } } = useForm();
    let dispatch = useDispatch();
    let response = useSelector( state => state.datas );
	let redirect = useNavigate();
    let params = useParams();

    const [image, setImage] = useState('')

    React.useEffect(() => {
        if (params.id) {
            let result = dispatch(getDataRow(params.id));
            result.then(function (data) {
                console.log(data);
                let row = data.data.data

                dispatch(setStatus('success'))
                dispatch(setInput(data.data.data));
                dispatch(imagePreview(`${config.api_host}/${row.image_url}`));

                setValue("title", row.title);
                setValue("description", row.description);
                setValue("link", row.link);
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, params.id]);

    const submitHandler = data => {
        dispatch(setStatus('process'));
        let formData = image !== '' ? {...data, image: image} : data;
        dispatch(setInput(formData));

        let result;
        if (params.id) {
            result = dispatch(updateData());
        } else {
            result = dispatch(storeData());
        }

        result.then(function(row) {
            if (row.error) {
                dispatch(setStatus('error', row.error.message));
                if (row.error.response.data.fields) {
                    const fields = row.error.response.data.fields;
                    Object.keys(fields).forEach((field) => {
                        setError(field, {message: fields[field].message});
                    });
                }
            } else {
                dispatch(setStatus('success', row.result.data.message));
                dispatch(setInput(''));
                dispatch(imagePreview(''));
                redirect(`/`);
            }
        }); 

    }

    const onImageUpload = (file) => {
        dispatch(imagePreview(URL.createObjectURL(file)));
        setImage(file);
    }

    return (
        <div className='row'>
            <div className='col-md-6'>
                <form onSubmit={handleSubmit(submitHandler)}>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Judul</label>
                        <input type="text" autoFocus className="form-control" {...register('title', rules.title)} />
                        {params.id && <input type="hidden" value={params.id} {...register('_id')}></input>}
                        {errors.title && <p className='error-message' role="alert">{errors.title?.message}</p>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Deskripsi</label>
                        <input type="text" className="form-control" {...register('description', rules.description)} id="description" />
                        {errors.description && <p className='error-message' role="alert">{errors.description?.message}</p>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="link" className="form-label">Link</label>
                        <input type="text" defaultValue={response.input.link} className="form-control" {...register('link',rules.link)} id="link" />
                        {errors.link && <p className='error-message' role="alert">{errors.link?.message}</p>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="image" className="form-label">Image</label>
                        <input type="file" onChange={ (event) => onImageUpload(event.target.files[0]) } className="form-control" id="image" />
                    </div>
                    {response.imagePreview && !params.id && <div className="mb-3">
                        <img src={response.imagePreview} alt="" style={{width: '20%'}}></img>
                    </div>}
                    {params.id && response.imagePreview && <div className="mb-3">
                        <img src={response.imagePreview} alt="" style={{width: '20%'}}></img>
                    </div>}
                    <div className="mb-3 form-check">
                        {
                        response.input.is_active && response.input.is_active === 1 ? 
                        <input type="checkbox" className="form-check-input" value={1} {...register('is_active')} id="is_active" /> : 
                        <input type="checkbox" className="form-check-input" value={1} {...register('is_active')} id="is_active" />
                        }
                        
                        <label className="form-check-label" htmlFor="is_active">Check me out</label>
                    </div>
                    {   
                        response.status === 'process' ?
                        <button type="submit" disabled className="btn btn-primary">Loading...</button> : 
                        <button type="submit" className="btn btn-primary">Submit</button>
                    }
                </form>
            </div>
        </div>
    )
}

export default Form
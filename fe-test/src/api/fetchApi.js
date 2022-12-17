import axios from 'axios';
import { config } from '../config';

export async function getData(params) {
    return await axios.get(`${config.api_host}/banners`, {
        params, 
        headers: {
            'Content-type': 'multipart/form-data'
        }
    })
}

export async function saveData(data){
    return await axios.post(`${config.api_host}/banners/store`, data, {
    headers: {
        'Content-Type': 'multipart/form-data', 
    }});
}

export async function editData(data){
    return await axios.put(`${config.api_host}/banners/update`, data, {
    headers: {
        'Content-Type': 'multipart/form-data', 
    }});
}

export async function detailData(id){
    return await axios.get(`${config.api_host}/banners/detail/${id}`, {
    headers: {
        'Content-Type': 'multipart/form-data', 
    }});
}

export async function deleteData(id){
    return await axios.delete(`${config.api_host}/banners/destroy/${id}`, {
    headers: {
        'Content-Type': 'multipart/form-data', 
    }});
}
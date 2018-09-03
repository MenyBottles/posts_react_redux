import axios from 'axios';
export const FETCH_POSTS = 'fetch_posts';
export const ADD_POST = 'add_post';
export const DELETE_POST = 'delete_post';

const BASE_URL = 'http://reduxblog.herokuapp.com/api/posts/';
const KEY = '?key=mzamora';

export function fetchPosts(){
    const response = axios.get(`${BASE_URL}${KEY}`)
    return {
        type: FETCH_POSTS,
        payload: response
    }
}

export function addPost(values,callback){
    const response = axios.post(`${BASE_URL}${KEY}`, values).then(() => callback())
    return {
        type: ADD_POST,
        payload: response
    }
}

export function deletePost(id, callback){
    const response = axios.delete(`${BASE_URL}${id}${KEY}`).then(() => callback())
    return{
        type: DELETE_POST,
        payload: response
    }
}
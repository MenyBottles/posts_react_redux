import axios from 'axios';
export const FETCH_POSTS = 'FETCH_POSTS';
export const FETCH_POSTS_FULFILLED = 'FETCH_POSTS_FULFILLED';

export const FETCH_POST = 'FETCH_POST';
export const FETCH_POST_FULFILLED = 'FETCH_POST_FULFILLED';

export const ADD_POST = 'add_post';
export const DELETE_POST = 'delete_post';

const BASE_URL = 'http://reduxblog.herokuapp.com/api/posts/';
const KEY = '?key=mzamora';

export const fetchPosts = () => ({ type: FETCH_POSTS })
export const fetchPostsFulfilled = (posts) => ({ type: FETCH_POSTS_FULFILLED, payload: { posts } })

export const fetchPostsAPI = () => (dispatch, getState) => {
    if(!getState().posts.isLoaded) {
        dispatch(fetchPosts())
        return axios.get(`${BASE_URL}${KEY}`).then(
            response => dispatch(fetchPostsFulfilled(response.data))
        )
    }
}


export const fetchPost = () => ({ type: FETCH_POST })
export const fetchPostFulfilled = (post) =>  ({ type: FETCH_POST_FULFILLED, payload: { post } })

export const fetchPostAPI = (id) => (dispatch, getState) => {
    if(!getState().posts.entities.find(o => o.id == id)) {
        dispatch(fetchPost())
        return axios.get(`${BASE_URL}${id}${KEY}`).then(
            response => dispatch(fetchPostFulfilled(response.data))
        )
    }
    
}

export function addPost(values,callback){
    
}

export function deletePost(id, callback){
    
}


/*export function fetchPosts(){
    const response = axios.get(`${BASE_URL}${KEY}`)
    return {
        type: FETCH_POSTS,
        payload: response
    }
}

export function fetchPost(id) {
    const response = axios.get(`${BASE_URL}${id}${KEY}`)
    return {
        type: FETCH_POST,
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
}*/
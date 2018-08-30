import axios from 'axios';
export const FETCH_POSTS = 'fetch_posts';

const BASE_URL = 'http://reduxblog.herokuapp.com/api/posts';
const KEY = '?key=mzamora';

export function fetchPosts(){
    const response = axios.get(`${BASE_URL}${KEY}`)
    return {
        type: FETCH_POSTS,
        payload: response
    }
}
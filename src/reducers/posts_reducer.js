import {FETCH_POSTS, FETCH_POST, FETCH_POSTS_FULFILLED, FETCH_POST_FULFILLED} from '../actions';

const initialState = {
    isLoading: false,
    isLoaded: false,
    entities: []
}

export default function (state = initialState ,action) {
    const { type, payload } = action
    console.log(payload)
    switch (type) {
        case FETCH_POSTS :
            return {
                ...state,
                isLoading: true
            }
        case FETCH_POSTS_FULFILLED:
            return {
                ...state,
                isLoading: false,
                isLoaded: true,
                entities: payload.posts
            }
        
        case FETCH_POST:
            return state

        case FETCH_POST_FULFILLED :
            return {
                ...state,
                entities: [
                    ...state.entities,
                    payload.post
                ]
            }
        default:
            return state
    }
}
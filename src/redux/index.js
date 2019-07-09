import { combineReducers } from 'redux';

export const REQUEST_POSTS = 'REQUEST_POSTS';
const FETCH_POSTS = 'FETCH_POSTS';
export const SUBMIT_POST = 'SUBMIT_POST';
const CREATE_POST_SUCCESS = 'CREATE_POST_SUCCESS';
const CHANGE_PAGE = 'CHANGE_PAGE';
const SEARCH = 'SEARCH';
const FINISH_LOADING = 'FINISH_LOADING';
const ALERT = 'ALERT';  

// actions
export const recievePostsFromApi = (data) => ({
    type: FETCH_POSTS,
    posts: data
})

export const requestPostsFromApi = () => ({
    type: REQUEST_POSTS
})

export const submitPost = (data) => ({
    type: SUBMIT_POST,
    payload: data
})

export const createPostSuccess = (data) => ({
    type: CREATE_POST_SUCCESS,
    payload: data
})

export const alert = (data) => ({
    type: ALERT,
    payload: data
})

export const finishLoading = () => ({
    type: FINISH_LOADING
})

export const changePage = (data) => ({
    type: CHANGE_PAGE,
    payload: data
})

export const search = (data) => ({
    type: SEARCH,
    payload: data
})

export const changeUrl = (url) => ({
    type: url,
})

// reducer
const posts = (state=[], action) => {
    switch (action.type) {
        case FETCH_POSTS:
            return [...state, ...action.posts]
        case CREATE_POST_SUCCESS:
            return [ action.payload ];
        default:
            return state;
    }
}

const isAlert = (state=false, action) => {
    switch (action.type) {
        case ALERT:
            return action.payload
        default:
            return state
    }
}

const isLoading = (state=true, action) => {
    switch (action.type) {
        case FINISH_LOADING:
            return false
        default:
            return state
    }
}

const page = (state={pageNumber:1, pageSize:5}, action) => {
    switch (action.type) {
        case CHANGE_PAGE:
            return {
                ...state,
                pageNumber: action.payload
            }
        case SEARCH:
            return {
                ...state,
                pageNumber: 1
            }
        default:
            return state
    }
}

const searchString = (state='', action) => {
    switch (action.type) {
        case SEARCH:
            return action.payload;
        default:
            return state;
    }
}

export default (extraReducer) => combineReducers({
    posts,
    isAlert,
    isLoading,
    page,
    searchString,
    ...extraReducer
})




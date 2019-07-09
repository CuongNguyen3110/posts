import { combineReducers } from 'redux';

export const REQUEST_POSTS = 'REQUEST_POSTS';
const REQUEST_POSTS_SUCCESS = 'REQUEST_POSTS_SUCCESS';
const REQUEST_POSTS_ERROR = 'REQUEST_POSTS_ERROR';
const HIDE_ALL_POSTS = 'HIDE_ALL_POSTS';
export const CREATE_POST = 'CREATE_POST';
const CREATE_POST_SUCCESS = 'CREATE_POST_SUCCESS';
const CREATE_POST_ERROR = 'CREATE_POST_ERROR';
const CHANGE_PAGE = 'CHANGE_PAGE';
const SEARCH = 'SEARCH';

// actions
export const requestPostsSuccess = (data) => ({
    type: REQUEST_POSTS_SUCCESS,
    posts: data
})

export const requestPostsFromApi = () => ({
    type: REQUEST_POSTS
})

export const requestPostsError = (error) => ({
    type: REQUEST_POSTS_ERROR,
    payload: error
})

export const hideAllPosts = () => ({
    type: HIDE_ALL_POSTS
})

export const createPost = (data) => ({
    type: CREATE_POST,
    payload: data
})

export const createPostSuccess = (data) => ({
    type: CREATE_POST_SUCCESS,
    payload: data
})

export const createPostError = (error) => ({
    type: CREATE_POST_ERROR,
    payload: error
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
        case REQUEST_POSTS_SUCCESS:
            return [...state, ...action.posts]
        case CREATE_POST_SUCCESS:
            return [ action.payload ]
        case HIDE_ALL_POSTS:
            return []
        default:
            return state;
    }
}

const isLoading = (state=true, action) => {
    switch (action.type) {
        case REQUEST_POSTS:
            return true
        case REQUEST_POSTS_SUCCESS:
            return false
        case CREATE_POST:
            return true
        case CREATE_POST_SUCCESS:
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
    isLoading,
    page,
    searchString,
    ...extraReducer
})




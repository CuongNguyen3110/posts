import { takeEvery, call, put, all } from 'redux-saga/effects';
import {
    REQUEST_POSTS,
    CREATE_POST,
    requestPostsSuccess,
    requestPostsError,
    createPostSuccess,
    createPostError,
} from './index';
import { apiFetchPost, apiAddNewPost } from '../helpers/api'

function* watchFetchPosts() {
    yield takeEvery(REQUEST_POSTS, fetchPosts);
}

function* fetchPosts() {
    let data;
    try {
        data = yield call(apiFetchPost);
    } catch (error) {
        return yield put(requestPostsError(error));
    }

    yield put(requestPostsSuccess(data));
}

function* watchAddNewPost() {
    yield takeEvery(CREATE_POST, addNewPost);
}

function* addNewPost(action) {
    const { payload } = action;

    let response;
    try {
        response = yield call(apiAddNewPost, payload);
    } catch (error) {
        return yield put(createPostError(error));
    }

    yield put(createPostSuccess(response));
}

export default function* rootSaga() {
    yield all([
        watchFetchPosts(),
        watchAddNewPost()
    ]);
}
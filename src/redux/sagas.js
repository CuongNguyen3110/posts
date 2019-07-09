import { takeEvery, call, put, all } from 'redux-saga/effects';
import { 
    REQUEST_POSTS, 
    SUBMIT_POST, 
    recievePostsFromApi, 
    createPostSuccess, 
    finishLoading 
} from './index';
import { apiFetchPost, apiAddNewPost } from '../helpers/api'

function* watchFetchPosts() {
    yield takeEvery(REQUEST_POSTS, fetchPosts);
}

function* fetchPosts() {
    const data = yield call(apiFetchPost);
    yield put(recievePostsFromApi(data));
}

function* watchAddNewPost() {
    yield takeEvery(SUBMIT_POST, addNewPost);
}

function* addNewPost(action) {
    console.log(action)
    const { payload } = action;
    const response = yield call(apiAddNewPost, payload);
    yield put(createPostSuccess(response));
    yield put(finishLoading());
}

export default function* rootSaga() {
    yield all([
        watchFetchPosts(), 
        watchAddNewPost()
    ]);
}
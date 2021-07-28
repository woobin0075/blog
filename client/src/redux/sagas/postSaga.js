import axios from "axios";
import { call, fork, put, takeEvery, all } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import { 
    POST_LOADING_FAILURE, 
    POST_LOADING_REQUEST, 
    POST_LOADING_SUCCESS 
} from '../types'

//All Posts load

const loadPostAPI = () => {
    return axios.get("/api/post")
}

function* loadPosts() {
    try {
        const result = yield call(loadPostAPI)
        console.log(result, "loadPosts")
        yield put({
            type: POST_LOADING_SUCCESS,
            payload: result.data
        })
    } catch (e) {
        yield put({
            type: POST_LOADING_FAILURE,
            payload: e
        })
        yield push("/")
    }

 } 
 function* watcthLoadPosts() {
        yield takeEvery(POST_LOADING_REQUEST, loadPosts)
    }

export default function* postSaga() {
    yield all([fork(watcthLoadPosts)]);
}
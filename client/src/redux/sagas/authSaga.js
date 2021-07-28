import axios from 'axios'
import { all, call, put, takeEvery, fork } from 'redux-saga/effects'
import { 
    LOGIN_FAILURE, 
    LOGIN_REQUEST, 
    LOGIN_SUCCESS, 
    LOGOUT_SUCCESS, 
    LOGOUT_REQUEST, 
    LOGOUT_FAILURE, 
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    REGISTER_REQUEST,
    CLEAR_ERROR_REQUEST,
    CLEAR_ERROR_FAILURE,
    CLEAR_ERROR_SUCCESS,
    USER_LOADING_SUCCESS,
    USER_LOADING_REQUEST,
    USER_LOADING_FAILURE} from '../types'

//Login

const loginUserAPI = (loginData) => {
    console.log(loginData, "loginData");
    const config = {
        headers: {
            "Content-Type" : "application/json"
        }
    }
    return axios.post('api/auth', loginData, config)
}

function* loginUser(action) {
    try {
        const result = yield call(loginUserAPI, action.payload)
        console.log(result);
        yield put({
            type: LOGIN_SUCCESS,
            payload: result.data
        })
    } catch (e) {
        yield put({
            type: LOGIN_FAILURE,
            payload: e.response
        })
    }
}

function* watchLoginUser() {
    yield takeEvery(LOGIN_REQUEST, loginUser)
}

//LOGOUT
function* logout(action) {
    try {
      
        yield put({
            type: LOGOUT_SUCCESS,
        })
    } catch (e) {
        yield put({
            type: LOGOUT_FAILURE,
        })
        console.log(e);
    }
}

function* watchlogout() {
    yield takeEvery(LOGOUT_REQUEST, logout)
}

// Register
const registerUserAPI = (req) => {
    console.log(req, "req");
    const config = {
        headers: {
            "Content-Type" : "application/json"
        }
    }
    return axios.post("api/user", req, config);
  };
  
  function* registerUser(action) {
    try {
      const result = yield call(registerUserAPI, action.payload);
      console.log(result, "RegisterUser Data");
      yield put({
        type: REGISTER_SUCCESS,
        payload: result.data,
      });
    } catch (e) {
      yield put({
        type: REGISTER_FAILURE,
        payload: e.response,
      });
    }
  }
  
  function* watchregisterUser() {
    yield takeEvery(REGISTER_REQUEST, registerUser);
  }

// clear Error
function* clearError() {
    try {
      yield put({
        type: CLEAR_ERROR_SUCCESS,
      });
    } catch (e) {
      yield put({
        type: CLEAR_ERROR_FAILURE,
      });
      console.error(e);
    }
  }
  
  function* watchclearError() {
    yield takeEvery(CLEAR_ERROR_REQUEST, clearError);
  }

//USER LOADING
const userLoadingAPI = (data) => {
    const token = data.payload
    const config = {
        headers: {
            "Content-Type" : "application/json"
        }
    };
    if(token) {
        config.headers["x-auth-token"] = token
    }
    return axios.get('api/auth/user', config)
}

function* userLoading(action) {
    console.log(action, "userLoading");
    try {
        const result = yield call(userLoadingAPI, action.payload)
        console.log(result);
        yield put({
            type: USER_LOADING_SUCCESS,
            payload: result.data
        })
    } catch (e) {
        yield put({
            type: USER_LOADING_FAILURE,
            payload: e.response
        })
    }
}

function* watchuserLoading() {
    yield takeEvery(USER_LOADING_REQUEST, userLoading)
}

export default function* authsaga(){
    yield all([
      fork(watchLoginUser),
      fork(watchlogout),
      fork(watchregisterUser),
      fork(watchclearError),
      fork(watchuserLoading)
    ])
}
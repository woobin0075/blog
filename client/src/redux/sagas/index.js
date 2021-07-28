import {all, fork} from 'redux-saga/effects'
import axios from 'axios';

import authsaga from './authSaga';
import dotenv from 'dotenv'
import postSaga from './postSaga';
dotenv.config()

axios.defaults.baseURL = process.env.REACT_APP_BASIC_SERVER_URL

export default function* rootSaga(){
    yield all([fork(authsaga), fork(postSaga)]);
}
import { CLEAR_ERROR_FAILURE, 
    CLEAR_ERROR_REQUEST, 
    CLEAR_ERROR_SUCCESS, 
    LOGIN_FAILURE, 
    LOGIN_REQUEST, 
    LOGIN_SUCCESS, 
    LOGOUT_REQUEST, 
    LOGOUT_SUCCESS, 
    LOGOUT_FAILURE,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    USER_LOADING_FAILURE,
    USER_LOADING_REQUEST,
    USER_LOADING_SUCCESS } from "../types"

const initalState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: false,
    userId: "",
    userName: "",
    userRole: "",
    errorMsg: "",
    successMsg: ""
}

const authReducer = (state = initalState, action) => {
    switch(action.type) {
        case REGISTER_REQUEST:
        case LOGOUT_REQUEST:
        case LOGIN_REQUEST:
            return {
                ...state,
                errorMsg: "",
                isLoading: true
            }
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false,
                userId: action.payload.user.id,
                userRole: action.payload.user.role,
                errMsg: ""
            }
       
            case CLEAR_ERROR_REQUEST:
                return {
                    ...state,
                    errorMsg: null,
                }
            case CLEAR_ERROR_SUCCESS:
                return {
                    ...state,
                    errorMsg: null,
                }
            case CLEAR_ERROR_FAILURE:
                return {
                    ...state,
                    errorMsg: null,
                }
                
                case USER_LOADING_REQUEST:
                    return {
                        ...state,
                        isLoading: true
                    }
                case USER_LOADING_SUCCESS:
                    return {
                        ...state,
                        isAuthenticated: true,
                        isLoading: false,
                        user: action.payload,
                        userId: action.payload._id,
                        userName: action.payload.name,
                        userRole: action.payload.role
                    }
                case USER_LOADING_FAILURE:
                    return {
                        ...state,
                        user:null,
                        isAuthenticated: false,
                        isLoading: false,
                        userRole: ""
                    }

                case LOGOUT_SUCCESS:
                    localStorage.removetItem('token', action.payload.token)
                    return {
                        token: null,
                        user: null,
                        userId: null,
                        isAuthenticated: false,
                        isLoading: false,
                        userRole: null,
                        errMsg: ""
                    }
                case REGISTER_FAILURE:
                case LOGIN_FAILURE:
                case LOGOUT_FAILURE:
                    localStorage.removeItem('token')
                    return {
                        ...state,
                        ...action.payload,
                        token: null,
                        user: null,
                        userId: null,
                        isAuthenticated: false,
                        isLoading: false,
                        userRole: null,
                        errorMsg: action.payload.data.msg
                    }
            default:
                return state
    }
}

export default authReducer
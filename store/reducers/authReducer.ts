import {AuthActionTypes, IAction, IAuthState, LoadingStatuses} from "../../types";


let initialState:IAuthState = {
    user:null

}
export const authReducer = (state = initialState, action:IAction):IAuthState => {
    switch (action.type) {
        case AuthActionTypes.SET_USER:
            console.log('dlkfjl')
            return {...state, user:JSON.parse(action.data),status:LoadingStatuses.SUCCESS}
        case AuthActionTypes.AUTH_LOADING:
            return {...state, status:LoadingStatuses.LOADING}
        case AuthActionTypes.AUTH_ERROR:
            console.log('ERROR',action.data.message)
            return {...state, status:LoadingStatuses.ERROR,error:action.data}
        case AuthActionTypes.AUTH_SUCCESS:
            return {...state, user:action.data.user, status:LoadingStatuses.SUCCESS}
        case AuthActionTypes.AUTH_LOGOUT:
            //
            return {...state, user:null}
        default:
            return state
    }
}
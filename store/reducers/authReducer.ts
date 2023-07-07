import {AuthActionTypes, IAction, IAuthState, LoadingStatuses} from "../../types";
import AsyncStorage from "@react-native-async-storage/async-storage";

let user = {
    hren:''
}
let getMyObject = async () => {
    try {
        // @ts-ignore
        return await AsyncStorage.getItem('user')._j && await AsyncStorage.getItem('user')
    } catch(e:any) {
        console.log('AAA',e.message)
    }

    console.log('Done.')
}

//
let initialState:IAuthState = {
    // @ts-ignore
    user:null

}
// @ts-ignore
initialState.user = getMyObject()

export const authReducer = (state = initialState, action:IAction):IAuthState => {
    switch (action.type) {

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
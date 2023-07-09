import {IFormData} from "../pages/Form";
import {Dispatch} from "redux";
import {AuthActionTypes, IAction} from "../types";
import {NavigationProp} from "@react-navigation/native";
import {AuthService} from "../http/services/Auth.service";
import AsyncStorage from "@react-native-async-storage/async-storage";

export  const loginActionCreator =  (formData:IFormData,navigation:NavigationProp<any>) => {
    return async function(dispatch:Dispatch<IAction>) {
        try {
            dispatch({
                type:AuthActionTypes.AUTH_LOADING,
            })
            // const response = await AuthService.login(formData)

            // let response = {data: {user: formData}}
            // if( formData.password != 'andriy_hrin' || formData.username != 'andriy_hrinenko@gmail.com' )
            // return dispatch({
            //     type:AuthActionTypes.AUTH_ERROR,
            //     data: formData.username != 'andriy_hrinenko@gmail.com'
            //         ? 'There isn\'t such user '
            //         : 'Password is not correct'
            // })

            // await AsyncStorage.setItem('user',JSON.stringify({...formData,token:response.data.token}))
            setTimeout(()=>{
                dispatch({
                    type: AuthActionTypes.AUTH_SUCCESS,
                    data: { user: formData}
                })
            },4000)
        } catch (e:Error | any) {
            dispatch({
                type:AuthActionTypes.AUTH_ERROR,
                data:e
            })

        }
    }
}
export  const logoutActionCreator =  (navigation:NavigationProp<any>) => {
    return async function(dispatch:Dispatch<IAction>) {
        try {
            // await AsyncStorage.removeItem('user')
            dispatch({
                type:AuthActionTypes.AUTH_LOGOUT,
                data: {navigation}
            })
        } catch (e:Error | any) {
            dispatch({
                type:AuthActionTypes.AUTH_ERROR,
                data:e
            })

        }
    }
}
export const registration = (formData:IFormData) => {
    return async function(dispatch:Dispatch<IAction>){
        try {
            dispatch({
                type:AuthActionTypes.AUTH_LOADING,
            })
            const response = await AuthService.registration(formData)

            await AsyncStorage.setItem('user',JSON.stringify({token:response.data.token,user:response.data.user}))
            console.log(response)
            //
            dispatch({
                type:AuthActionTypes.AUTH_SUCCESS,
                data:response.data.user
            })
        } catch (e) {
            dispatch({
                type:AuthActionTypes.AUTH_ERROR,
                data:e
            })
        }
    }
}
export const fetchUser = () => {
    return async function(dispatch:Dispatch<IAction>){
        try {
            dispatch({type:AuthActionTypes.AUTH_LOADING})
            const user = await AsyncStorage.getItem('user')
            setTimeout(()=>dispatch({
                type:AuthActionTypes.SET_USER,
                data:user
            }),4000)
        } catch (e) {
            dispatch({
                type:AuthActionTypes.AUTH_ERROR,
                data:e
            })
        }
    }
}
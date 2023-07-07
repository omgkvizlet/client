import {applyMiddleware, combineReducers, createStore} from "redux";
import {mainReducer} from "./reducers/mainReducer";
import {authReducer} from "./reducers/authReducer";
import thunk from "redux-thunk";
//
const reducer = combineReducers({
    mainReducer,
    authReducer
})
export const store = createStore(reducer,applyMiddleware(thunk))
export type RootReducerType = ReturnType<typeof reducer>
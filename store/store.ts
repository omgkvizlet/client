import {combineReducers, createStore} from "redux";
import {mainReducer} from "./mainReducer";

const reducer = combineReducers({
    mainReducer
})
export const store = createStore(reducer)
export type RootReducerType = ReturnType<typeof reducer>
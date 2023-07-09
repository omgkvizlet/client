import {applyMiddleware, combineReducers, createStore} from "redux";
import {mainReducer} from "./reducers/mainReducer";
import {authReducer} from "./reducers/authReducer";
import storage from 'redux-persist/lib/storage'
import {persistReducer, persistStore} from 'redux-persist'
import thunk from "redux-thunk";
const persistConfig = {
    key:"root",
    storage
}
//
const reducer = combineReducers({
    mainReducer,
    authReducer
})
const persistedReducer = persistReducer(persistConfig,reducer)
export const store = createStore(reducer,applyMiddleware(thunk))
export const persistor = persistStore(store)
export type RootReducerType = ReturnType<typeof reducer>
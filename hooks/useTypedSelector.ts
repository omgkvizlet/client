import {TypedUseSelectorHook, useSelector} from "react-redux";
import {RootReducerType} from "../store/store";

export const useTypedSelector:TypedUseSelectorHook<RootReducerType> = useSelector
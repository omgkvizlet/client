import {useDispatch} from "react-redux";
import {bindActionCreators} from "redux";
import * as ActionCreators from '../store/actions'
export const useActions = () => {
    let dispatch = useDispatch()
    return bindActionCreators(ActionCreators,dispatch)
}
import { combineReducers } from "redux";
import {callTheFunctionReducer} from "../Reducer/Call.functio"
const reducers = combineReducers({
  callReducer:callTheFunctionReducer,
})
export default reducers;
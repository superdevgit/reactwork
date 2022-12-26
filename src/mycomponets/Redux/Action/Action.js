import {ActionTypes} from "./ActionType"
export const setloadUsers=(stateData)=>{
    // data come from ui in stateData
      return{
          type :ActionTypes.CALL,
          payload : stateData
      }
  }
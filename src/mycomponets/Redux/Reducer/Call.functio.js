import { ActionTypes } from "../Action/ActionType";
const intialState = {
  firstState: [],
};

 export const callTheFunctionReducer = (state = intialState, {type, payload}) => {
  switch (type) {
    case ActionTypes.CALL:
      return { ...state, firstState: payload };

    default:
      return state;
  }
};


  
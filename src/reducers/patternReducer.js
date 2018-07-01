import initialState from './initialState';
import { SET_LOCK_PATTERN, VALIDATE_PATTERN } from './../actions/actionTypes';

export default function pattern(state = initialState.pattern, action){
    // let newState;
    switch (action.type){
        case SET_LOCK_PATTERN:
            console.log('set_lock');
            let { codeSet = false } = action;
            let newState = {...state, codeSet };
            return newState;
        case VALIDATE_PATTERN:
            console.log('validate pattern');
            let { success = false } = action;
            let updatedState = {...state, success };
            return updatedState;
        default:
            return state;
    }
}
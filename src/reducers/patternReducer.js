import initialState from './initialState';
import { SET_LOCK_PATTERN, VALIDATE_PATTERN } from './../actions/actionTypes';

export default function pattern(state = initialState.pattern, action){
    // let newState;
    switch (action.type){
        case SET_LOCK_PATTERN:
            console.log('set_lock');
            let { success = false } = action;
            let newState = {...state, success };
            return newState;
        case VALIDATE_PATTERN:
            console.log('validate pattern');
            return action;
        default:
            return state;
    }
}
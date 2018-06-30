import * as types from './actionTypes';

function setLockPatternResponse(info){
    return {
      type: types.SET_LOCK_PATTERN,
      success: info.success
    }
  }
  

export function setLockPattern(data, callback) {
    return function (dispatch) {
        if(data){
            dispatch(setLockPatternResponse({success: true}));
            callback();
        }
        else{
            dispatch(setLockPatternResponse({success: false}));
            callback(); 
        }  
    }
}

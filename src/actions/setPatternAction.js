import * as types from './actionTypes';
import { createCookie, eraseCookie } from './../utils/cookie';

function setLockPatternResponse(info){
    return {
      type: types.SET_LOCK_PATTERN,
      codeSet: info.codeSet
    }
  }
  

export function setLockPattern(data, callback) {
    return function (dispatch) {
        if(data){
            createCookie("code", data, 730);
            dispatch(setLockPatternResponse({codeSet: true}));
            callback();
        }
        else{
            eraseCookie("code");
            dispatch(setLockPatternResponse({success: false}));
            callback(); 
        }  
    }
}

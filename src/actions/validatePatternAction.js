import * as types from './actionTypes';
import { createCookie, readCookie, eraseCookie } from './../utils/cookie';

function validatePatternResponse(info){
    return {
      type: types.VALIDATE_PATTERN,
      codeSet: info.codeSet
    }
  }
  

export function validatePattern(data, callback) {
    let setCodeVal = readCookie("code");
    return function (dispatch) {
        if(data === setCodeVal){   
            createCookie("A", true, 730); 
            dispatch(validatePatternResponse({success: true}));
            callback();
        }
        else{
            eraseCookie("A");
            dispatch(validatePatternResponse({success: false}));
            callback(); 
        }  
    }
}

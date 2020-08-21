import {
    SAVE_MESSAGE,
} from './types';

export function saveMessage(dataToSubmit) { // dataToSubmit : conversation 정보가 들어있음
   
    return {
        type: SAVE_MESSAGE,
        payload: dataToSubmit
    }
}

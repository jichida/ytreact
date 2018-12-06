/**
 * Created by wangxiaoqing on 2017/3/25.
 */
/**
 * Created by wangxiaoqing on 2017/3/20.
 */
import { createReducer } from 'redux-act';
import {
    wifi_getssidlist_result,
    wifi_setstatus,
    ui_setcurwifi,
} from '../../actions/index.js';

const initial = {
    wifi: {
        wifissid:'',
        wifiCipher:'',
        wifipassword: '',
        wifilist:[],
        wifiStatus:-1
    },
};


const wifi = createReducer({
    [wifi_getssidlist_result]:(state, payload)=>{
        let wifilist = [...payload];
        return { ...state,wifilist};
    },
    [wifi_setstatus]: (state, payload) => {
        const {wifiStatus} = payload;
        return { ...state,wifiStatus};
    },
    [ui_setcurwifi]: (state, payload) => {
        const {wifissid,wifipassword,wifiCipher} = payload;
        return { ...state,wifissid,wifipassword,wifiCipher};
    },
}, initial.wifi);

export default wifi;

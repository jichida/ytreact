/**
 * Created by wangxiaoqing on 2017/3/25.
 */
/**
 * Created by wangxiaoqing on 2017/3/20.
 */
import { createReducer } from 'redux-act';
import {
    wifi_getssidlist_result,
    ui_setcurwifi,
} from '../../actions/index.js';

const initial = {
    wifi: {
        wifissid:'',
        wifipassword: '',
        wifilist:[],
    },
};


const wifi = createReducer({
    [wifi_getssidlist_result]:(state, payload)=>{
        let wifilist = [...payload];
        return { ...state,wifilist};
    },
    [ui_setcurwifi]: (state, payload) => {
        const {wifissid,wifipassword} = payload;
        return { ...state,wifissid,wifipassword};
    },
}, initial.wifi);

export default wifi;

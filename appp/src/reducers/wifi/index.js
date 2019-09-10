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
    wifi_setcurwifi_result,
    ui_setcurwifi,
} from '../../actions/index.js';
import lodashget from 'lodash.get';

const initial = {
    wifi: {
        wifissid:'',
        wifiCipher:'',
        wifipassword: '',
        wifilist:[],
        wifiStatus:0//0为打开未连接  -1  未打开  1  已连接 2 密码错误}
    },
};


const wifi = createReducer({
    [wifi_getssidlist_result]:(state, payload)=>{
        let wifilist = [...payload];
        return { ...state,wifilist};
    },
    [wifi_setcurwifi_result]: (state, payload) => {
        const {wifiStatus} = payload;
        console.log(wifiStatus);
        if(wifiStatus !== undefined){
            return { ...state,wifiStatus};
        }
        return state;
        
    },
    [wifi_setstatus]: (state, payload) => {
        const {wifiStatus,wifiInfo} = payload;
        let wifissid = state.wifissid;
        if(wifiStatus === 1){
          wifissid = lodashget(wifiInfo,'ssid',wifissid);
        }
        return { ...state,wifiStatus,wifissid};
    },
    [ui_setcurwifi]: (state, payload) => {
        const {wifissid,wifipassword,wifiCipher} = payload;
        return { ...state,wifissid,wifipassword,wifiCipher};
    },
}, initial.wifi);

export default wifi;

import { createReducer } from 'redux-act';
import {
    getsystemconfig_result,
    ui_main_selindex,
    ui_home_selindex,
    ui_set_language,
    notify_socket_connected,
    settcp_connected,
    socket_setstatus
} from '../../actions/index.js';
// import moment from 'moment';

const initial = {
    app: {
        maintabindex: 0,
        hometabindex: 0,
        locale:'zh-cn',
        unit: 'cm',
        tcpconnected:false,
        issocketconnected:false,
        wifidirectmodesocketstatus:-1,
        //-1 socket 关闭 0 socket 发送消息成功 1 连接成功 2 发送消息失败
    },
};

const app = createReducer({
    [settcp_connected]:(state,payload)=>{
      //data { socketStatus:  -1 0 1 2 }
      return { ...state, tcpconnected:payload};
    },
    [socket_setstatus]:(state,payload)=>{
      //data { socketStatus:  -1 0 1 2 }
      const wifidirectmodesocketstatus = payload.data.socketStatus ;
      // let tcpconnected = false;
      // if(wifidirectmodesocketstatus === 0 || wifidirectmodesocketstatus === 1) {
      //     tcpconnected = true;
      // } else if(wifidirectmodesocketstatus === -1 || wifidirectmodesocketstatus === 2) {
      //     tcpconnected = false;
      // }
      return { ...state, wifidirectmodesocketstatus};
    },
    [notify_socket_connected]: (state, payload) => {
        return { ...state, issocketconnected:payload };
    },
    [getsystemconfig_result]: (state, payload) => {
        return { ...state, ...payload };
    },
    [ui_set_language]: (state, payload) => {
        let unit = ''
        if(payload === 'en') {
            unit = 'in'
        } else {
            unit ='cm'
        }
        return { ...state, locale:payload, unit };
    },
    [ui_main_selindex]: (state, payload) => {
        return { ...state, maintabindex:payload };
    },
    [ui_home_selindex]: (state, payload) => {
        return { ...state, hometabindex:payload };
    },

}, initial.app);

export default app;

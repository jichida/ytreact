/**
 * Created by wangxiaoqing on 2017/3/20.
 */
import { createReducer } from 'redux-act';
import {
    //登录
    login_result,
    logout_result,
    common_err
} from '../../actions/index.js';
import config from '../../env/config';

const initial = {
    userlogin: {
        loginflag:-1,
        loginsuccess:false,
        userid:'',
        token:'',
    },
};

const userlogin = createReducer({
    [logout_result]:(state, payload)=>{
        localStorage.removeItem(`ytreact_${config.softmode}_token`);
        return { ...initial.userlogin,loginflag:0};
    },
    [common_err]:(state,payload)=>{
      if(payload.type === 'login'){
        return { ...state, ...payload,loginflag:0 };
      }
      return state;
    },
    [login_result]: (state, payload) => {
        return { ...state, ...payload,loginsuccess:true,loginflag:1 };
    },
}, initial.userlogin);

export default userlogin;

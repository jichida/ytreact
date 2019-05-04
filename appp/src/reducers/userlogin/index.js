/**
 * Created by wangxiaoqing on 2017/3/20.
 */
import { createReducer } from 'redux-act';
import {
    //登录
    login_request,
    login_result,
    logout_result,
} from '../../actions/index.js';
import config from '../../env/config';
const username = localStorage.getItem(`ytreact_${config.softmode}_username`);
const password = localStorage.getItem(`ytreact_${config.softmode}_password`);
const initial = {
    userlogin: {
        loginsuccess:false,
        username:!!username?username:'',
        password:!!password?password:'',
        userid:'',
        token:'',
    },
};

const userlogin = createReducer({
    [login_request]:(state,payload)=>{
      const {username,password} = payload;
      return { ...state,username,password} ;
    },
    [logout_result]:(state, payload)=>{
        return { ...initial.userlogin};
    },
    [login_result]: (state, payload) => {
        return { ...state, ...payload,loginsuccess:true };
    },
}, initial.userlogin);

export default userlogin;

/**
 * Created by wangxiaoqing on 2017/3/20.
 */
import { createReducer } from 'redux-act';
import {
    //登录
    login_result,
    logout_result,
} from '../../actions/index.js';


const initial = {
    userlogin: {
        loginsuccess:false,
        token:'',
    },
};

const userlogin = createReducer({
    [logout_result]:(state, payload)=>{
        return { ...initial.userlogin};
    },
    [login_result]: (state, payload) => {
        return { ...state, ...payload,loginsuccess:true };
    },
}, initial.userlogin);

export default userlogin;

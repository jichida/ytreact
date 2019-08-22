/**
 * Created by wangxiaoqing on 2017/3/25.
 */
/**
 * Created by wangxiaoqing on 2017/3/20.
 */
import { createReducer } from 'redux-act';
import {
    getsurvey_result,
    savesurvey_result,
} from '../../actions/index.js';
// import lodashget from 'lodash.get';
const initial = {
    surveys: {
        surveys:{
            
        }
    },
};


const surveys = createReducer({
    [getsurvey_result]:(state, payload)=>{
        const list = payload;
        let surveys = state.surveys;
        for(let i =0 ;i < list.length;i++){
            surveys[list[i]._id] = {...list[i]};
        }
        // debugger;
        return { ...state,surveys};
    },
    [savesurvey_result]: (state, payload) => {
        const updateditem = payload;
        let surveys = state.surveys;
        surveys[updateditem._id] = {...updateditem};
        return { ...state,surveys};
    },
}, initial.surveys);

export default surveys;

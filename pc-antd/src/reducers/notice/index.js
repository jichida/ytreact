import { createReducer } from 'redux-act';
import {
  set_notice_db
} from '../../actions/index.js';
// import moment from 'moment';

const initial = {
    notice: {
        notices: {},
        distributors:{},
    },
};

const notice = createReducer({
    [set_notice_db]: (state, payload) => {
        let {notices,distributors} = payload;
        return { ...state, notices:{...notices},distributors:{...distributors} };
    },

}, initial.notice);

export default notice;

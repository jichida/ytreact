import { createReducer } from 'redux-act';
import {
    getsystemconfig_result,
    ui_main_selindex,
    ui_home_selindex,
    ui_set_language
} from '../../actions/index.js';
// import moment from 'moment';

const initial = {
    app: {
        maintabindex: 0,
        hometabindex: 0,
        locale:'zh-cn',

    },

};

const app = createReducer({
    [getsystemconfig_result]: (state, payload) => {
        return { ...state, ...payload };
    },
    [ui_set_language]: (state, payload) => {
        return { ...state, locale:payload };
    },
    [ui_main_selindex]: (state, payload) => {
        return { ...state, maintabindex:payload };
    },
    [ui_home_selindex]: (state, payload) => {
        return { ...state, hometabindex:payload };
    },

}, initial.app);

export default app;

import { createReducer } from 'redux-act';
import {
    getdistributorlist_result,
} from '../../actions/index.js';
// import moment from 'moment';

const initial = {
    distributor: {

    },

};

const distributor = createReducer({
    [getdistributorlist_result]: (state, payload) => {
        return { ...state, ...payload };
    },
}, initial.distributor);

export default distributor;

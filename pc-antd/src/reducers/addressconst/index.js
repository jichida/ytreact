import { createReducer } from 'redux-act';
import {
    getaddressconstlist_result,
} from '../../actions/index.js';
// import moment from 'moment';
import lodashmap from 'lodash.map';

const initial = {
    addressconst: {
      addressconsts:{}
    },

};

const addressconst = createReducer({
    [getaddressconstlist_result]: (state, payload) => {
        const {data} = payload;
        let addressconsts = {};
        lodashmap(data,(v,k)=>{
          addressconsts[v._id] = v;
        })
        return { ...state, addressconsts };
    },
}, initial.addressconst);

export default addressconst;

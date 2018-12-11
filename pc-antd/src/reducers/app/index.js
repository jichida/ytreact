import { createReducer } from 'redux-act';
import {
    getsystemconfig_result,
} from '../../actions/index.js';
import moment from 'moment';

const initial = {
    app: {
        curtabindex: 0,
        type: 'error',
        title: '',
        msg: '',
        ispop: false,

        //是否显示大图控件
        bigimgshow : false,
        bigimglist : [],
        bigimgindex : 0,

        //是否显示添加购物车控件
        addcartdilogshow : false,
        addcartdilogproid : '',
        addcartdilogpronumber : 1,
        addcartdilogtype : "",

        expressfee : 10,
        expressfeeforfree: 100,
        productid1: '',
        productid2: '',

        newmsgnumber:0,
        innerheight : 0,

        isweixininstalled:false,
        isqqstalled:false,

        maxleftpecent : 90,//净水器报警百分比
        sharesettingcur:{

        },
        srvdate:moment(),

        homeconfirmday : 1,
        homeconfirmvol : 95
    },

};

const app = createReducer({

    [getsystemconfig_result]: (state, payload) => {
        return { ...state, ...payload };
    },

}, initial.app);

export default app;

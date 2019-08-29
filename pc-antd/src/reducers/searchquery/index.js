import { createReducer } from 'redux-act'
import { search_setquery,logout_result } from '../../actions'

const initial = {
    searchquery : {
        selectedCountry: '',
        selectedArea: '',
        selectDistributor:'',
        customerName:'',
        deviceid:'',
        areasOptions:[],
        distributorOptions: [],
        query:{},
    }
}

const searchquery =  createReducer({
    [logout_result]:(state, payload)=>{
        return { ...initial.searchquery};
    },
    [search_setquery]: (state, payload)=> {
        return { ...state, ...payload  }
    },
}, initial.searchquery)

export default searchquery;

import { createReducer } from 'redux-act'
import { search_setquery } from '../../actions'

const defaultCountry = '5c11df1d34f6297e19e3bfbe';
const initial = {
    searchquery : {
        selectedCountry: defaultCountry,
        selectedArea: '',
        selectDistributor:'',
        customerName:'',
        areasOptions:[],
        distributorOptions: [],
        query:{},
    }
}

const searchquery =  createReducer({
    [search_setquery]: (state, payload)=> {
        return { ...state, ...payload  }
    },
}, initial.searchquery)

export default searchquery;

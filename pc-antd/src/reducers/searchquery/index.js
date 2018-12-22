import { createReducer } from 'redux-act'
import { search_setquery } from '../../actions'

const initial = {
    searchquery : {
        country: '',
        area: '',
        distributor: '',
        customer: '',
    }
}

const searchquery =  createReducer({
    [search_setquery]: (state, payload)=> {
        return { ...payload }
    },
}, initial.searchquery)

export default searchquery;
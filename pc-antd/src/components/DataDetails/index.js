import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Spin } from 'antd'
import lodashget from 'lodash.get'
import { callthen } from '../../sagas/pagination'
import { page_getdevice_request, page_getdevice_result} from '../../actions'
import DataDetails from './DataDetails'

const Index = ({curdevice, id, dispatch }) => {
    const [ device, setDevice ] = useState({})

    useEffect(() => {
        if(Object.keys(curdevice).length !== 0) {
            setDevice(curdevice)
        } else {
            dispatch(callthen(page_getdevice_request,page_getdevice_result,{query:{_id:`${id}`}}))
            .then((result) => {
                console.log('Get Result:', lodashget(result, 'result.docs[0]', {}))
                setDevice(lodashget(result, 'result.docs[0]', {}))
            })
        }
    }, [id])


    if(Object.keys(device).length !== 0)
        return <DataDetails curdevice={device} /> 
    return <div style={{minHeight: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}><Spin size="large" /></div>
}

const mapStateToProps = ({device: { devices}}, props) => {
    const id = props.match.params.id
    const curdevice = lodashget(devices,`${id}`,{})

    return {
        id,
        curdevice
    }
}

export default connect(mapStateToProps)(withRouter(Index))

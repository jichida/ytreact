import React from 'react'
import './Refresh.less'
import refresh_icon from '../../assets/refresh.png'
import { FormattedMessage } from 'react-intl'

const Index = (props) => {
    const handleClick = () => {
        props.handleRefresh();
    }
    return (
        <div className="Refresh" onClick={handleClick}>
            <div className="Refresh-region">
            <img src={refresh_icon} alt="" className="Refresh-icon"
                style={{width: '50px', height: '50px', marginTop: '20px'}}
                
            />
            <span className="tip"><FormattedMessage id="layout.get" /></span>
            </div>
        </div>
    )
}

export default Index;
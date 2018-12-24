import React from 'react'
import { FormattedMessage } from 'react-intl'
import './index.less'

class SpaceInput extends React.Component {

    handleChange = (index,e)=>{
        let newValue = { ...this.props.value };
        newValue[index] = e.target.value;
        this.props.onChange(newValue);
    }

    render() {
        const { value } = this.props; 
        return (
            <div className="space-input-container">
                <div className="space-input-item">
                    <FormattedMessage id="install.space.length" />
                    : <input name="length" value={value.length||''} onChange={(e)=>{this.handleChange('length',e)}} />
                </div>
                <div className="space-input-item">
                    <FormattedMessage id="install.space.width" />
                    : <input name="length" value={value.width||''} onChange={(e)=>{this.handleChange('width',e)}} />
                </div>
                <div className="space-input-item">
                    <FormattedMessage id="install.space.height" />
                    : <input name="length" value={value.height||''} onChange={(e)=>{this.handleChange('height',e)}} />
                </div>
            </div>
        )
    }
}

export default SpaceInput
import React from 'react'
import { FormattedMessage } from 'react-intl'
import { convertDecimal } from '../../util/convertDecimal'
import './index.less'

class SpaceInput extends React.Component {

    handleChange = (index,e)=>{
        let newValue = { ...this.props.value };
        newValue[index] = e.target.value;
        this.props.onChange(newValue);
    }

    render() {
        const { value, unit } = this.props; 

        const convertValue = unit === 'cm' ? value : {
            length: convertDecimal(value.length * 0.3937008),
            width: convertDecimal(value.width * 0.3937008),
            height: convertDecimal(value.height * 0.3937008)
        }

        return (
            <div className="space-input-container">
                <div className="space-input-item">
                    <FormattedMessage id="install.space.length" />
                    : <input name="length" value={convertValue.length} readOnly onChange={(e)=>{this.handleChange('length',e)}} />
                </div>
                <div className="space-input-item">
                    <FormattedMessage id="install.space.width" />
                    : <input name="length" value={convertValue.width} readOnly onChange={(e)=>{this.handleChange('width',e)}} />
                </div>
                <div className="space-input-item">
                    <FormattedMessage id="install.space.height" />
                    : <input name="length" value={convertValue.height} readOnly onChange={(e)=>{this.handleChange('height',e)}} />
                </div>
            </div>
        )
    }
}

export default SpaceInput
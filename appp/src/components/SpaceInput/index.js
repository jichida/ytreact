import React from 'react'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import './index.less'
import { InputItem } from 'antd-mobile';

class SpaceInput extends React.Component {

    handleChange = (index,e)=>{
        let newValue = { ...this.props.value };
        newValue[index] = e.target.value;
        this.props.onChange(newValue);
    }

    handleChange2 = (index,value)=>{
        let newValue = { ...this.props.value };
        newValue[index] = value;
        console.log('New Value', value)
        console.log(value)
        this.props.onChange(newValue);
    }

    render() {
        const { value, unit } = this.props; 
        return (
            <div className="space-input-container">
                <div className="space-input-item">
                    <FormattedMessage id="install.space.length" />
                    : <InputItem type="digit" value={value.length} onChange={(value)=>{this.handleChange2('length',value)}} />
                </div>
                {/* <input name="length" value={value.length||''} onChange={(e)=>{this.handleChange('length',e)}} /> */}
                <div className="space-input-item">
                    <FormattedMessage id="install.space.width" />
                    : <InputItem type="digit" value={value.width} onChange={(value)=>{this.handleChange2('width',value)}} />
                </div>
                {/* <input name="length" value={value.width||''} onChange={(e)=>{this.handleChange('width',e)}} /> */}
                <div className="space-input-item">
                    <FormattedMessage id="install.space.height" />
                    : <InputItem type="digit" value={value.height} onChange={(value)=>{this.handleChange2('height',value)}} />
                </div>
                {/* <input name="length" value={value.height||''} onChange={(e)=>{this.handleChange('height',e)}} /> */}
            </div>
        )
    }
}

const mapStateToProps = ({app: { unit }}) => ({
    unit
})


export default connect(mapStateToProps)(SpaceInput) 
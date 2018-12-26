import React from 'react'
import { Picker, InputItem, List } from 'antd-mobile'

class PickerAndInput extends React.Component {

    constructor(props){
        super(props);
        const { options, value } = this.props
        let optionsValues = [];

        for (let i = 0; i < options.length-1; i++){
            optionsValues.push(options[i].value)
        }

        console.log(optionsValues);

        if(!value[0]||optionsValues.includes(value[0])){
            this.state = { 
                isInput: false,
                optionsValues,
            }
        } else {
            this.state = {
                isInput: true,
                optionsValues,
            }
        }

    }

    handlePickerChange = (value)=> {
        const { onChange } = this.props
        const { optionsValues } = this.state
        if(optionsValues.includes(value[0])){
            onChange(value)
        } else {
            onChange([''])
            this.setState({ isInput: true })
        }
    }

    handleInputChange = (value)=> {
        const { onChange } = this.props
        onChange([value])
    }

    render() {
        const { options, value, inputPlaceholder, pickerExtra, cols } = this.props

        return (
            this.state.isInput ?
                (
                    <InputItem
                        placeholder={inputPlaceholder}
                        value={value[0]}
                        onChange={(value)=>{this.handleInputChange(value)}}
                    />
                )
                : (
                    <Picker
                        data={options}
                        cols={cols}
                        value={value}
                        extra={pickerExtra}
                        onChange={(value)=>this.handlePickerChange(value)}
                    >
                        <List.Item arrow="horizontal"></List.Item>
                    </Picker>
                )
        )
    }
}

export default PickerAndInput
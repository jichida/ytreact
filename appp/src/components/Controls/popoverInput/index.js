import React from 'react'
import { Popover, Icon } from 'antd-mobile'
import { FormattedMessage } from 'react-intl'
import './index.less'

const Item = Popover.Item

class Index extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
        }
    }

    onSelect = (opt) => {
        this.props.onChange(opt.props.value)
        this.setState({visible: false})
    }

    handleVisibleChange = (visible) => {
        this.setState({visible})
    }

    render() {
        const { value, type, up = false } = this.props
        const { visible } = this.state

        let label = 'form.no'
        if(value) {
            label = type === '1' ? "form.yes" : "form.have"
        } else {
            label = type === '1' ? "form.no" : "form.nothing"
        }

        return (
            <Popover mask
                overlayClassName="fortest"
                overlayStyle={{ color: 'currentColor' }}
                visible={visible}
                placement={up ? 'topRight' : 'bottomRight'}
                overlay={[
                  (<Item key="1" value={true} data-seed="logId"><FormattedMessage id={`${type === '1' ? "form.yes" : "form.have"}`} /></Item>),
                  (<Item key="2" value={false} ><FormattedMessage id={`${type === '1' ? "form.no" : "form.nothing"}`} /></Item>),
                ]}
                align={{
                  overflow: { adjustY: 0, adjustX: 0 },
                  offset: [-15, 0],
                }}
                onVisibleChange={this.handleVisibleChange}
                onSelect={this.onSelect}
            >
                <div>
                    <span style={{
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'flex-end'}}
                    ><FormattedMessage id={label} /><Icon type="right" /></span>
                </div>
            </Popover>
        )
    }
}

export default Index
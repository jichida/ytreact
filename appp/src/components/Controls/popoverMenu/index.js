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
        const { survey } = this.props
        if(opt.props.value === 'edit') {
            this.props.onEdit(survey._id)
        }
        if(opt.props.value === 'delete') {
            this.props.onDelete(survey)
        }
        this.setState({visible: false})
    }

    handleVisibleChange = (visible) => {
        this.setState({visible})
    }

    render() {
        const { up = false } = this.props
        const { visible } = this.state

        return (
            <Popover mask
                overlayClassName="fortest"
                overlayStyle={{ color: 'currentColor' }}
                visible={visible}
                placement={up ? 'topRight' : 'bottomRight'}
                overlay={[
                  (<Item key="1" value="edit" data-seed="logId"><FormattedMessage id="survey.edit" /></Item>),
                  (<Item key="2" value="delete" ><FormattedMessage id="survey.delete" /></Item>),
                ]}
                align={{
                  overflow: { adjustY: 0, adjustX: 0 },
                  offset: [-15, 0],
                }}
                onVisibleChange={this.handleVisibleChange}
                onSelect={this.onSelect}
            >
                <div style={{float: 'right'}}><Icon type="right" /></div>
            </Popover>
        )
    }
}

export default Index
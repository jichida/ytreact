import React, { PureComponent } from 'react';
import {  NavBar, Icon, List, InputItem } from 'antd-mobile';
import { createForm, createFormField } from 'rc-form';
import { withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import './index.less';

const Item = List.Item;
const Brief = Item.Brief;
 
const basicData = {
    frontfilter: {
        value: '',
    },
    host: {
        value: '',
    },
    afterfilter: {
        value: '',
    },
    configuration: { //其他配置
        value: [],
    },
    others: { //其他
        value: '',
    }
}


const RenderForm = createForm({
    mapPropsToFields(props) {
        return {
          frontfilter: createFormField({
            ...props.frontfilter,
            value: props.frontfilter.value,
          }),
          host: createFormField({
            ...props.host,
            value: props.host.value,
          }),
          afterfilter: createFormField({
            ...props.afterfilter,
            value: props.afterfilter.value,
          }),
          configuration: createFormField({
            ...props.configuration,
            value: props.configuration.value,
          }),
          others: createFormField({
              ...props.others,
              value: props.others.value,
          })
        };
    }
})(withRouter((props)=>{
    const { getFieldProps } = props.form;

    return (
        <React.Fragment>
        <form>
            <List>
                <InputItem
                    className="right-input"
                    editable={false}
                    {...getFieldProps('frontfilter')}
                ><FormattedMessage id="equipment.frontfilter" defaultMessage="前置滤芯" /></InputItem>
                <InputItem
                    className="right-input"
                    editable={false}
                    {...getFieldProps('host')}
                ><FormattedMessage id="equipment.host" defaultMessage="主机" /></InputItem>
                <InputItem
                    className="right-input"
                    editable={false}
                    {...getFieldProps('afterfilter')}
                ><FormattedMessage id="equipment.afterfilter" defaultMessage="后置滤芯" /></InputItem>
                <InputItem
                    className="right-input"
                    editable={false}
                    {...getFieldProps('configuration')}
                ><FormattedMessage id="equipment.configuration" defaultMessage="其他配置" /></InputItem>
                <Item><FormattedMessage id="equipment.others" defaultMessage="其他" />
                    <Brief>
                        <div className="item_children">
                            <InputItem
                                editable={false}
                                {...getFieldProps('others')}
                            />
                        </div>
                    </Brief>
                </Item>
            </List>
        </form>
        </React.Fragment>
    )
}))

class EquipmentList extends PureComponent{

    render () {
        const { history } = this.props;

        return (
            <div className="black_bg">
                <div className="setting">
                <NavBar
                    className="nav"
                    icon={<Icon type="left" />}
                    onLeftClick={() => history.goBack()}
                >
                    <FormattedMessage id="equipment.title" defaultMessage="设备清单" />
                </NavBar>
                <div className="sub_setting_bg">
                { <RenderForm {...basicData} {...this.props} />}
                </div>
                </div>
            </div>
        )
    }
}

export default withRouter(EquipmentList);

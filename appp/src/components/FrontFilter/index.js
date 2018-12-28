import React, { PureComponent } from 'react';
import {  NavBar, Icon, List, InputItem, Button, ActionSheet } from 'antd-mobile';
import { createForm, createFormField } from 'rc-form';
import { withRouter } from 'react-router-dom';
import { FormattedMessage, injectIntl } from 'react-intl';
import moment from 'moment';

import './index.less';

// const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
// let wrapProps;
// if (isIPhone) {
//   wrapProps = {
//     onTouchStart: e => e.preventDefault(),
//   };
// }

const Item = List.Item;
const Brief = Item.Brief;

const Filters = [
    'PP滤芯',
    'UF滤芯',
    'TAC滤芯',
    '无',
]

const basicData = {
    filter: {
        value: '',
    },
    replacedate: {
        value: moment.now(),
    },
}

const RenderForm = createForm({
    mapPropsToFields(props) {
        return {
          filter: createFormField({
            ...props.filter,
            value: props.filter.value,
          }),
          replacedate: createFormField({
            ...props.replacedate,
            value: props.replacedate.value,
        }),
        };
    }
})(injectIntl((props)=>{
    const { getFieldProps, validateFields, setFieldsValue } = props.form;
    const { intl: {formatMessage }} = props;
    const title = formatMessage({id: "filter.select"});


    const handleSubmit = (e)=>{
        //e.preventDefault();
        validateFields((err, values)=>{
            if(!err){
                props.onSubmit(values);
            }
        })
    }

    const showActionSheet = () => {
        const BUTTONS = Filters;
        ActionSheet.showActionSheetWithOptions({
          options: BUTTONS,
          cancelButtonIndex: BUTTONS.length - 1,
          message: title,
          maskClosable: true,
          // wrapProps,
        },
        (buttonIndex) => {
            if(buttonIndex!==BUTTONS.length -1){
                setFieldsValue({filter:BUTTONS[buttonIndex]})
            }
        });
    }

    return (
        <React.Fragment>
        <form>
            <List>
                <Item><FormattedMessage id="filter.filter" defaultMessage="选择滤芯" />
                        <Brief>
                            <div className="item_children">
                                <InputItem extra=">" onExtraClick={showActionSheet} editable={false}
                                    placeholder={formatMessage({id: "form.picker"})}
                                    {...getFieldProps('filter')}
                                />
                            </div>
                    </Brief>
                </Item>
                <Item><FormattedMessage id="filter.replacedate" defaultMessage="上一次更换时间" />
                        <Brief>
                            <div className="item_children">
                                <InputItem editable={false}
                                    placeholder={formatMessage({id: "form.input"})}
                                    {...getFieldProps('replacedate',{
                                        rules: [{
                                            required: true,
                                            message: <FormattedMessage id="filter.replacedate" defaultMessage="上一次更换时间" />,
                                        }],
                                    })}
                                />
                            </div>
                    </Brief>
                </Item>
            </List>
        </form>
        <div className="submit_zone">
            <div className="add_btn" >
                <Button type="ghost" className="btn" onClick={handleSubmit}>
                    <FormattedMessage id="form.reset" defaultMessage="重置" />
                </Button>
            </div>
        </div>
        </React.Fragment>
    )
}))

class FrontFilter extends PureComponent{

    handleSubmit = (values)=>{
        console.log(values);
    }

    render () {
        const { history } = this.props;

        return (
            <div className="fh_container black_bg">
            <div className="fp_container white_bg">
            <div className="sub_bg">
                <NavBar
                    className="nav"
                    icon={<Icon type="left" />}
                    onLeftClick={() => history.goBack()}
                >
                </NavBar>
                { <RenderForm {...basicData} onSubmit={this.handleSubmit} />}
            </div>
            </div>
            </div>
        )
    }
}

export default withRouter(FrontFilter);

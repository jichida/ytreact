import React, { PureComponent } from 'react';
import {  NavBar, Icon, List, InputItem, Picker, Button } from 'antd-mobile';
import { createForm, createFormField } from 'rc-form';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { FormattedMessage, injectIntl } from 'react-intl';
import {common_err,setuserdevice_result,ui_setuserdevice_request} from '../../actions';

import './index.less';

const Item = List.Item;
const Brief = Item.Brief;

// 阀门	valve
// 活接	connection
// 弯头	elbow
// 三通	triplet
// 对丝	silkpair
// 丝转	silkspin
// 其他	others

const basicData = {
    valve: '',
    connection: '',
    elbow: '',
    triplet: '',
    silkpair: '',
    silkspin: '',
    others: ''
}

// const triplet = [
//     {
//         label: <FormattedMessage id="form.equip.config.comm" />,
//         value: '商用',
//     },
//     {
//         label: <FormattedMessage id="form.equip.config.home" />,
//         value: '家用',
//     }
// ]

// const silkpair = [
//     {
//         label: <FormattedMessage id="form.equip.meter.cop" />,
//         value: '铜',
//     },
//     {
//         label: <FormattedMessage id="form.equip.meter.alum" />,
//         value: '铝',
//     }
// ]

// const silkspin = [
//     {
//         label: 'XXX型',
//         value: 'XXX型',
//     },
//     {
//         label: 'YYY型',
//         value: 'YYY型',
//     }
// ]

const RenderForm = createForm({
    mapPropsToFields(props) {
        return {
          valve: createFormField({value: props.valve}),
          connection: createFormField({value: props.connection}),
          elbow: createFormField({value: props.elbow}),
          triplet: createFormField({value: props.triplet}),
          silkpair: createFormField({value: props.silkpair}),
          silkspin: createFormField({value: props.silkspin}),
          others: createFormField({value: props.others})
        };
    }
})(injectIntl((props)=>{
    const { getFieldProps, validateFields } = props.form;
    const { intl: { formatMessage }} = props;

    const handleSubmit = (e)=>{
        //e.preventDefault();
        validateFields((err, values)=>{
            if(!err){
                props.onSubmit(values);
            }
        })
    }

    return (
        <React.Fragment>
        <form>
            <List renderHeader={() => <FormattedMessage id="equipment.fittingstitle" defaultMessage="主要管件数量（注意不同管径）" />}>
                <Item><FormattedMessage id="equipment.valve" defaultMessage="阀门" />
                    <Brief>
                        <div className="item_children">
                            <InputItem
                                placeholder= {formatMessage({id: "form.input"})}
                                {...getFieldProps('valve',{
                                    rules: [{
                                        required: true,
                                    message: <FormattedMessage id="equipment.valve" defaultMessage="阀门" />,
                                    }],
                                })}
                            />
                        </div>
                    </Brief>
                </Item>
                <Item><FormattedMessage id="equipment.connection" defaultMessage="活接" />
                    <Brief>
                        <div className="item_children">
                            <InputItem
                                placeholder={formatMessage({id: "form.input"})}
                                {...getFieldProps('connection',{
                                    rules: [{
                                        required: true,
                                        message: <FormattedMessage id="equipment.connection" defaultMessage="活接" />,
                                    }],
                                })}
                            />
                        </div>
                    </Brief>
                </Item>
                <Item><FormattedMessage id="equipment.elbow" defaultMessage="弯头" />
                    <Brief>
                        <div className="item_children">
                            <InputItem
                                placeholder={formatMessage({id: "form.input"})}
                                {...getFieldProps('elbow',{
                                    rules: [{
                                        required: true,
                                        message: <FormattedMessage id="equipment.elbow" defaultMessage="弯头" />,
                                    }],
                                })}
                            />
                        </div>
                    </Brief>
                </Item>
                <Item><FormattedMessage id="equipment.triplet" defaultMessage="三通" />
                    <Brief>
                        <div className="item_children">
                            <InputItem
                                placeholder={formatMessage({id: "form.input"})}
                                {...getFieldProps('triplet',{
                                    rules: [{
                                        required: true,
                                        message: <FormattedMessage id="equipment.triplet" defaultMessage="三通" />,
                                    }],
                                })}
                            />
                            {/* <Picker
                                data={triplet}
                                cols={1}
                                extra= {<FormattedMessage id="form.picker" defaultMessage="请选择" />}
                                {...getFieldProps('triplet')}
                                >
                                <List.Item arrow="horizontal"></List.Item>
                            </Picker> */}
                        </div>
                    </Brief>
                </Item>
                <Item><FormattedMessage id="equipment.silkpair" defaultMessage="对丝" />
                    <Brief>
                        <div className="item_children">
                            <InputItem
                                placeholder={formatMessage({id: "form.input"})}
                                {...getFieldProps('silkpair',{
                                    rules: [{
                                        required: true,
                                        message: <FormattedMessage id="equipment.silkpair" defaultMessage="对丝" />,
                                    }],
                                })}
                            />
                            {/* <Picker
                                data={silkpair}
                                cols={1}
                                extra= {<FormattedMessage id="form.picker" defaultMessage="请选择" />}
                                {...getFieldProps('silkpair')}
                                >
                                <List.Item arrow="horizontal"></List.Item>
                            </Picker> */}
                        </div>
                    </Brief>
                </Item>
                <Item><FormattedMessage id="equipment.silkspin" defaultMessage="丝转" />
                    <Brief>
                        <div className="item_children">
                            <InputItem
                                placeholder={formatMessage({id: "form.input"})}
                                {...getFieldProps('silkspin',{
                                    rules: [{
                                        required: true,
                                        message: <FormattedMessage id="equipment.silkspin" defaultMessage="丝转" />,
                                    }],
                                })}
                            />
                            {/* <Picker
                                data={silkspin}
                                cols={1}
                                extra= {<FormattedMessage id="form.picker" defaultMessage="请选择" />}
                                {...getFieldProps('silkspin')}
                                >
                                <List.Item arrow="horizontal"></List.Item>
                            </Picker> */}
                        </div>
                    </Brief>
                </Item>
                <Item><FormattedMessage id="equipment.others" defaultMessage="其他" />
                    <Brief>
                        <div className="item_children">
                            <InputItem
                                placeholder={formatMessage({id: "form.input"})}
                                {...getFieldProps('others',{
                                    rules: [{
                                        required: true,
                                        message: <FormattedMessage id="equipment.others" defaultMessage="其他" />,
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
                <Button type="gconnection" className="btn" onClick={handleSubmit}>
                    <FormattedMessage id="form.save" defaultMessage="保存" />
                </Button>
            </div>
        </div>
        </React.Fragment>
    )
}))

class PipeFittings extends PureComponent{

    handleSubmit = (values)=>{
        console.log(values);
        const { _id, devicelist, dispatch, history } = this.props;
        const pipefittings = {...values}

        console.log('PipeFittings:', {...devicelist, pipefittings})

        dispatch(setuserdevice_result({devicelist:{...devicelist, pipefittings}}))
  
        // dispatch(ui_setuserdevice_request({_id,data:{devicelist:filters}}));
        history.goBack()
    }

    render () {
        const { history, dispatch, devicelist } = this.props;
        const formData = {...basicData, ...devicelist['pipefittings']}

        return (
            <div className="fp_container black_bg">
            <div className="sub_bg">
                <NavBar
                    className="nav"
                    icon={<Icon type="left" />}
                    onLeftClick={() => history.goBack()}
                >
                    <FormattedMessage id="equipment.pipefittings" defaultMessage="主要管件" />
                </NavBar>
                { <RenderForm {...formData} {...this.props} onSubmit={this.handleSubmit} />}
            </div>
            </div>
        )
    }
}

const mapStateToProps =  ({device:{devicelist,_id}}) =>{
    console.log('Devicelist:', devicelist)
  return {devicelist,_id};
}

export default connect(mapStateToProps)(withRouter(PipeFittings));
// export default withRouter(injectIntl(silkspin));

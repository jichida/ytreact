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

const RenderForm = createForm({
    mapPropsToFields(props) {
        return {
          valve: createFormField({value: typeof(props.valve) === 'string' ? props.valve : ''}),
          connection: createFormField({value: typeof(props.connection) === 'string' ? props.connection : ''}),
          elbow: createFormField({value: typeof(props.elbow) === 'string' ? props.elbow : ''}),
          triplet: createFormField({value: typeof(props.triplet) === 'string' ? props.triplet : ''}),
          silkpair: createFormField({value: typeof(props.silkpair) === 'string' ? props.silkpair : ''}),
          silkspin: createFormField({value: typeof(props.silkspin) === 'string' ? props.silkspin : ''}),
          others: createFormField({value: typeof(props.others) === 'string' ? props.others : ''})
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
                                {...getFieldProps('valve')}
                            />
                        </div>
                    </Brief>
                </Item>
                <Item><FormattedMessage id="equipment.connection" defaultMessage="活接" />
                    <Brief>
                        <div className="item_children">
                            <InputItem
                                placeholder={formatMessage({id: "form.input"})}
                                {...getFieldProps('connection')}
                            />
                        </div>
                    </Brief>
                </Item>
                <Item><FormattedMessage id="equipment.elbow" defaultMessage="弯头" />
                    <Brief>
                        <div className="item_children">
                            <InputItem
                                placeholder={formatMessage({id: "form.input"})}
                                {...getFieldProps('elbow')}
                            />
                        </div>
                    </Brief>
                </Item>
                <Item><FormattedMessage id="equipment.triplet" defaultMessage="三通" />
                    <Brief>
                        <div className="item_children">
                            <InputItem
                                placeholder={formatMessage({id: "form.input"})}
                                {...getFieldProps('triplet')}
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
                                {...getFieldProps('silkpair')}
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
                                {...getFieldProps('silkspin')}
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
                                {...getFieldProps('others')}
                            />
                        </div>
                    </Brief>
                </Item>
            </List>
        </form>
        <div className="submit_zone">
            {/* <div className="add_btn" >
                <Button type="gconnection" className="btn" onClick={handleSubmit}>
                    <FormattedMessage id="form.save" defaultMessage="保存" />
                </Button>
            </div> */}
            <div className="add_btn" >
                <Button type="ghost" className="btn" onClick={handleSubmit}>
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
        const { devicelist, dispatch, history } = this.props;
        const pipefittings = {...values}

        console.log('PipeFittings:', {...devicelist, pipefittings})

        dispatch(setuserdevice_result({devicelist:{...devicelist, pipefittings}}))
  
        history.goBack()
    }

    render () {
        const { history, devicelist } = this.props;
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
                <div className="sub_device_bg">{ <RenderForm {...formData} {...this.props} onSubmit={this.handleSubmit} />}</div>
                
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

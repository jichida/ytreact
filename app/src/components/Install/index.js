import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {  NavBar, Icon, List, InputItem } from 'antd-mobile';
import { createForm, createFormField } from 'rc-form';
import { withRouter } from 'react-router-dom';
import {setuserdevice_request} from '../../actions';
import lodashget from 'lodash.get';
import { FormattedMessage, injectIntl } from 'react-intl';
import SpaceInput from '../SpaceInput'

import './index.less';

const Item = List.Item;
const Brief = Item.Brief;

// 安装地点		position
// 是否避光		avoidlight
// 墙体材料		wall
// 主机安装方式	method
// 安装空间		space
// 进水管径大小	pipe
// 排水距离		drainage
// 管路材质		pipematerials
// 有无WIFI		wifi
// 有无电源		power
//
// const basicData = {
//     position: {
//         value: '',
//     },
//     avoidlight: {
//         value: '',
//     },
//     wall: {
//         value: '',
//     },
//     method: {
//         value: '',
//     },
//     space: {
//         value: '',
//     },
//     pipe: {
//         value: '',
//     },
//     drainage: {
//         value: '',
//     },
//     pipematerials: {
//         value: '',
//     },
//     wifi: {
//         value: '',
//     },
//     power: {
//         value: '',
//     },
// }

const RenderForm = createForm({
    mapPropsToFields(props) {
        return {
          position: createFormField({
            ...props.position,
            value: props.position.value,
          }),
          avoidlight: createFormField({
            ...props.avoidlight,
            value: props.avoidlight.value,
        }),
          wall: createFormField({
            ...props.wall,
            value: props.wall.value,
          }),
          method: createFormField({
            ...props.method,
            value: props.method.value,
          }),
          space: createFormField({
            ...props.space,
            value: props.space.value,
          }),
          pipe: createFormField({
              ...props.pipe,
              value: props.pipe.value,
          }),
          drainage: createFormField({
            ...props.drainage,
            value: props.drainage.value,
          }),
          pipematerials: createFormField({
            ...props.pipematerials,
            value: props.pipematerials.value,
          }),
          wifi: createFormField({
            ...props.wifi,
            value: props.wifi.value,
          }),
          power: createFormField({
            ...props.power,
            value: props.power.value,
          }),
        };
    }
})(injectIntl((props)=>{
    const { getFieldProps } = props.form;

    return (
        <React.Fragment>
        <form>
            <List>
                <InputItem
                    className="right-input"
                    editable={false}
                    extra=""
                    {...getFieldProps('position')}
                ><FormattedMessage id="install.position" defaultMessage="安装地点" /></InputItem>
                <InputItem
                    className="right-input"
                    editable={false}
                    {...getFieldProps('avoidlight')}
                ><FormattedMessage id="install.avoidlight" defaultMessage="是否避光" /></InputItem>
                <InputItem
                    className="right-input"
                    editable={false}
                    {...getFieldProps('wall')}
                ><FormattedMessage id="install.wall" defaultMessage="墙体材料" /></InputItem>
                <InputItem
                    className="right-input"
                    editable={false}
                    {...getFieldProps('method')}
                ><FormattedMessage id="install.method" defaultMessage="主机安装方式" /></InputItem>
                {/* <InputItem
                    className="right-input"
                    editable={false}
                    {...getFieldProps('space')}
                ><FormattedMessage id="install.space" defaultMessage="安装空间" /></InputItem> */}
                <Item><FormattedMessage id="install.space" defaultMessage="安装空间" />
                    <Brief>
                        <div className="item_children">
                            <SpaceInput
                            {...getFieldProps('space',{
                                rules: [],
                            })}
                            // onChange={handleSpaceInput}
                            />
                        </div>
                    </Brief>
                </Item>
                <InputItem
                    className="right-input"
                    editable={false}
                    {...getFieldProps('pipe')}
                ><FormattedMessage id="install.pipe" defaultMessage="进水管径大小" /></InputItem>
                <InputItem
                    className="right-input"
                    editable={false}
                    extra="m"
                    {...getFieldProps('drainage')}
                ><FormattedMessage id="install.drainage" defaultMessage="排水距离" /></InputItem>
                <InputItem
                    className="right-input"
                    editable={false}
                    {...getFieldProps('pipematerials')}
                ><FormattedMessage id="install.pipematerials" defaultMessage="管路材质" /></InputItem>
                <InputItem
                    className="right-input"
                    editable={false}
                    {...getFieldProps('wifi')}
                ><FormattedMessage id="install.wifi" defaultMessage="有无WIFI" /></InputItem>
                <InputItem
                    className="right-input"
                    editable={false}
                    {...getFieldProps('power')}
                ><FormattedMessage id="install.power" defaultMessage="有无电源" /></InputItem>
            </List>
        </form>
        </React.Fragment>
    )
}))

class DeviceInstall extends PureComponent{

    render () {

        const { history,install, intl: { formatMessage}}  = this.props;

         const basicData = {
           position: {
               value: lodashget(install,'position',''),
           },
           avoidlight: {
               value: lodashget(install,'avoidlight',false) ? formatMessage({id: 'form.yes1'}) : formatMessage({id: 'form.no1'}),
           },
           wall: {
               value: lodashget(install,'wall',''),
           },
           method: {
               value: lodashget(install,'method',''),
           },
           space: {
               value: lodashget(install,'space',''),
           },
           pipe: {
               value: lodashget(install,'pipe',''),
           },
           drainage: {
               value: lodashget(install,'drainage',''),
           },
           pipematerials: {
               value: lodashget(install,'pipematerials',''),
           },
           wifi: {
               value: lodashget(install,'wifi',false)? formatMessage({id: 'form.yes2'}) : formatMessage({id: 'form.no2'}),
           },
           power: {
               value: lodashget(install,'power',false)? formatMessage({id: 'form.yes2'}) : formatMessage({id: 'form.no2'}),
           },
         }
         console.log(basicData);
        return (
            <div className="fp_container black_bg">
                <div className="setting">
                <NavBar
                    className="nav"
                    icon={<Icon type="left" />}
                    onLeftClick={() => history.goBack()}
                >
                    <FormattedMessage id="device.install" />
                </NavBar>
                <div className="sub_setting_bg">
                { <RenderForm {...basicData} onSubmit={this.handleSubmit} />}
                </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps =  ({device:{install,_id}}) =>{
  return {install,_id};
};
DeviceInstall = connect(mapStateToProps)(DeviceInstall);
export default withRouter(injectIntl(DeviceInstall));

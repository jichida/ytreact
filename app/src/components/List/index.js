import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import {  NavBar, Icon, List, Accordion } from 'antd-mobile';
import { createForm, createFormField } from 'rc-form';
import { withRouter } from 'react-router-dom';
import { FormattedMessage, injectIntl } from 'react-intl';
import lodashMap from 'lodash.map'
import loadshGet from 'lodash.get'

import './index.less';

const Item = List.Item;
const Brief = Item.Brief;
 
// const basicData = {
//     prev0: '',
//     prev1: '',
//     prev2: '',
//     host: '',
//     post0: '',
//     post1: '',
//     post2: '',
//     configuration: '',
//     materials: '',
//     others: ''
// }


// const RenderForm = createForm({
//     mapPropsToFields(props) {
//         return {
//           prev0: createFormField({value: props.prev0}),
//           prev1: createFormField({value: props.prev1}),
//           prev2: createFormField({value: props.prev2}),
//           host: createFormField({value: props.host}),
//           post0: createFormField({value: props.post0}),
//           post1: createFormField({value: props.post1}),
//           post2: createFormField({value: props.post2}),
//           configuration: createFormField({value: props.configuration}),
//           others: createFormField({value: props.others})
//         };
//     }
// })(withRouter((props)=>{
//     const { getFieldProps } = props.form;

//     return (
//         <React.Fragment>
//         <form>
//             <List>
//                 <InputItem
//                     className="right-input"
//                     editable={false}
//                     {...getFieldProps('prev0')}
//                 ><FormattedMessage id="form.equip.prevfilter1" defaultMessage="前置滤芯1" /></InputItem>
//                 <InputItem
//                     className="right-input"
//                     editable={false}
//                     {...getFieldProps('prev1')}
//                 ><FormattedMessage id="form.equip.prevfilter1" defaultMessage="前置滤芯2" /></InputItem>
//                 <InputItem
//                     className="right-input"
//                     editable={false}
//                     {...getFieldProps('prev2')}
//                 ><FormattedMessage id="form.equip.prevfilter1" defaultMessage="前置滤芯3" /></InputItem>
//                 <InputItem
//                     className="right-input"
//                     editable={false}
//                     {...getFieldProps('host')}
//                 ><FormattedMessage id="equipment.host" defaultMessage="主机" /></InputItem>
//                 <InputItem
//                     className="right-input"
//                     editable={false}
//                     {...getFieldProps('post0')}
//                 ><FormattedMessage id="form.equip.postfilter1" defaultMessage="后置滤芯1" /></InputItem>
//                 <InputItem
//                     className="right-input"
//                     editable={false}
//                     {...getFieldProps('post1')}
//                 ><FormattedMessage id="form.equip.postfilter2" defaultMessage="后置滤芯2" /></InputItem>
//                 <InputItem
//                     className="right-input"
//                     editable={false}
//                     {...getFieldProps('post2')}
//                 ><FormattedMessage id="form.equip.postfilter3" defaultMessage="后置滤芯3" /></InputItem>
//                 <InputItem
//                     className="right-input"
//                     editable={false}
//                     {...getFieldProps('configuration')}
//                 ><FormattedMessage id="equipment.configuration" defaultMessage="其他配置" /></InputItem>
//                 <InputItem
//                     className="right-input"
//                     editable={false}
//                     {...getFieldProps('materials')}
//                 ><FormattedMessage id="install.pipematerials" defaultMessage="管路材质" /></InputItem>
//                 <InputItem
//                     className="right-input"
//                     editable={false}
//                     {...getFieldProps('others')}
//                 ><FormattedMessage id="equipment.others" defaultMessage="其他" /></InputItem>
//             </List>
//         </form>
//         </React.Fragment>
//     )
// }))

const EquipmentPer = {
    prev0: <FormattedMessage id="form.equip.prevfilter1" defaultMessage="前置滤镜1" />,
    prev1: <FormattedMessage id="form.equip.prevfilter2" defaultMessage="前置滤镜2" />,
    prev2: <FormattedMessage id="form.equip.prevfilter3" defaultMessage="前置滤镜3" />,
    post0: <FormattedMessage id="form.equip.postfilter1" defaultMessage="前置滤镜1" />,
    post1: <FormattedMessage id="form.equip.postfilter2" defaultMessage="前置滤镜2" />,
    post2: <FormattedMessage id="form.equip.postfilter3" defaultMessage="前置滤镜3" />,
    none: <FormattedMessage id="form.equip.nonefilter" defaultMessage="无" />,
    comm: <FormattedMessage id="form.equip.config.comm" />,
    home: <FormattedMessage id="form.equip.config.home" />,
    cop: <FormattedMessage id="form.equip.meter.cop" />,
    alum: <FormattedMessage id="form.equip.meter.alum" />,
    host: <FormattedMessage id="equipment.host" defaultMessage="主机" />,
    configuration: <FormattedMessage id="equipment.configuration" defaultMessage="其他配置" />,
    materials: <FormattedMessage id="equipment.materials" defaultMessage="管路材质" />,
    pipefittings: <FormattedMessage id="equipment.pipefittings" defaultMessage="主要管件" />,
    others: <FormattedMessage id="equipment.others" defaultMessage="其他" />
}


class EquipmentList extends PureComponent{

    render () {
        const { history, prevlist, postlist, devicelist, host, others } = this.props;

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
                {/* { <RenderForm {...basicData} {...this.props} />} */}
                <div className="equipment">
                    <List className="equipment-list">
                        <Item extra={loadshGet(prevlist, '0.life', '0') === '0' ? '无' : <FormattedMessage id="setting.system.PP" values={{value: loadshGet(prevlist, '0.life', '0')}} />}>{EquipmentPer['prev0']}</Item>
                        <Item extra={loadshGet(prevlist, '1.life', '0') === '0' ? '无' : <FormattedMessage id="setting.system.carbon" values={{value: loadshGet(prevlist, '1.life', '0')}} />}>{EquipmentPer['prev1']}</Item>
                        <Item extra={loadshGet(prevlist, '2.life', '0') === '0' ? '无' : <FormattedMessage id="setting.system.TAC" values={{value: loadshGet(prevlist, '2.life', '0')}} />}>{EquipmentPer['prev2']}</Item>
                        <Item extra={`${loadshGet(devicelist, 'host', '')}`}>{EquipmentPer['host']}</Item>
                        <Item extra={loadshGet(postlist, '0.life', '0') === '0' ? '无' : <FormattedMessage id="setting.system.LED" values={{value: loadshGet(postlist, '0.life', '0')}} />}>{EquipmentPer['post0']}</Item>
                        <Item extra={loadshGet(postlist, '1.life', '0') === '0' ? '无' : <FormattedMessage id="setting.system.AFC" values={{value: loadshGet(postlist, '1.life', '0')}} />}>{EquipmentPer['post1']}</Item>
                        <Item extra={'无'}>{EquipmentPer['post2']}</Item>
                        <Item extra={EquipmentPer[loadshGet(devicelist, 'configuration', 'none')]}>{EquipmentPer['configuration']}</Item>
                        <Item extra={EquipmentPer[loadshGet(devicelist, 'materials', 'none')]}>{EquipmentPer['materials']}</Item>
                    </List>
                </div>
                <div className="equipment">
                    <Accordion accordion className="equipment-accordion">
                        <Accordion.Panel header={<FormattedMessage id="equipment.pipefittings" defaultMessage="主要管件" />}>
                            <div className="pipe">
                                <div className="pipe-item">
                                    <FormattedMessage id="equipment.valve" defaultMessage="阀门" />
                                    {`: ${loadshGet(devicelist, 'pipefittings.valve', '')}`}
                                </div>
                                <div className="pipe-item">
                                    <FormattedMessage id="equipment.connection" defaultMessage="活接" />
                                    {`: ${loadshGet(devicelist, 'pipefittings.connection', '')}`}
                                </div>
                                <div className="pipe-item">
                                    <FormattedMessage id="equipment.elbow" defaultMessage="弯头" />
                                    {`: ${loadshGet(devicelist, 'pipefittings.elbow', '')}`}
                                </div>
                                <div className="pipe-item">
                                    <FormattedMessage id="equipment.triplet" defaultMessage="三通" />
                                    {`: ${loadshGet(devicelist, 'pipefittings.triplet', '')}`}
                                </div>
                                <div className="pipe-item">
                                    <FormattedMessage id="equipment.silkpair" defaultMessage="对丝" />
                                    {`: ${loadshGet(devicelist, 'pipefittings.silkpair', '')}`}
                                </div>
                                <div className="pipe-item">
                                    <FormattedMessage id="equipment.silkspin" defaultMessage="丝转" />
                                    {`: ${loadshGet(devicelist, 'pipefittings.silkspin', '')}`}
                                </div>
                                <div className="pipe-item">
                                    <FormattedMessage id="equipment.others" defaultMessage="其他" />
                                    {`: ${loadshGet(devicelist, 'pipefittings.others', '')}`}
                                </div>
                            </div>
                        </Accordion.Panel>
                    </Accordion>
                </div>
                <div className="equipment">
                    <List className="equipment-list">
                        <Item>{EquipmentPer['others']}<Brief>{`${loadshGet(devicelist, 'others', '')}`}</Brief></Item>
                    </List>
                </div>
                </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ device: { devicelist }}) => {
    const { filterlist } = devicelist
    const prevlist = {}
    const postlist = {}

    lodashMap(filterlist, (item, index) => {
        if(item.isprev) {
            prevlist[index] = item
        } else {
            postlist[index-Object.keys(prevlist).length] = item
        }
    })

    return {
        prevlist,
        postlist,
        devicelist
    }

    
}


export default connect(mapStateToProps)(withRouter(EquipmentList));

import React, { PureComponent } from 'react';
import {  NavBar, Icon, List, InputItem, Picker, Button, Modal, WingBlank, DatePicker, WhiteSpace } from 'antd-mobile';
import { createForm, createFormField } from 'rc-form';
import lodashMap from 'lodash.map'
import { withRouter } from 'react-router-dom';
import { FormattedMessage, injectIntl } from 'react-intl';

import './index.less';

const Item = List.Item;
const Brief = Item.Brief;

const basicData = {
    prev0: {
        isprev: true,
        idname: '',
        lastchangedate: new Date()
    },
    prev1: {
        isprev: true,
        idname: '',
        lastchangedate: new Date()
    },
    prev2: {
        isprev: true,
        idname: '',
        lastchangedate: new Date()
    },
    post0: {
        isprev: false,
        idname: '',
        lastchangedate: new Date()
    },
    post1: {
        isprev: false,
        idname: '',
        lastchangedate: new Date()
    },
    post2: {
        isprev: false,
        idname: '',
        lastchangedate: new Date()
    },
    // host: {
    //     value: '',
    // },
    // configuration: { //其他配置
    //     value: [],
    // },
    // materials: { // 管路材质
    //     value: [],
    // },
    // pipefittings: { // 主要管件
    //     value: {},
    // },
    // others: { //其他
    //     value: '',
    // }
}

// const configuration = [
//     {
//         label: <FormattedMessage id="form.equip.config.comm" />,
//         value: 'comm',
//     },
//     {
//         label: <FormattedMessage id="form.equip.config.home" />,
//         value: 'home',
//     }
// ]

// const materials = [
//     {
//         label: <FormattedMessage id="form.equip.meter.cop" />,
//         value: 'cop',
//     },
//     {
//         label: <FormattedMessage id="form.equip.meter.alum" />,
//         value: 'alum',
//     }
// ]


// 
// const others = [
//     {
//         label: 'XXX型',
//         value: 'XXX型',
//     },
//     {
//         label: 'YYY型',
//         value: 'YYY型',
//     }
// ]

const prevFilter = [
    {
        label: <FormattedMessage id="form.equip.prevfilter1" defaultMessage="前置滤镜1" />,
        value:'prev0',
    },
    {
        label: <FormattedMessage id="form.equip.prevfilter2" defaultMessage="前置滤镜2" />,
        value:'prev1',
    },
    {
        label: <FormattedMessage id="form.equip.prevfilter3" defaultMessage="前置滤镜3" />,
        value:'prev2',
    },
    {
        label: <FormattedMessage id="form.equip.nonefilter" defaultMessage="无" />,
        value:'',
    },
]

const FilterPer = {
    prev0: <FormattedMessage id="form.equip.prevfilter1" defaultMessage="前置滤镜1" />,
    prev1: <FormattedMessage id="form.equip.prevfilter2" defaultMessage="前置滤镜2" />,
    prev2: <FormattedMessage id="form.equip.prevfilter3" defaultMessage="前置滤镜3" />,
    post0: <FormattedMessage id="form.equip.postfilter1" defaultMessage="前置滤镜1" />,
    post1: <FormattedMessage id="form.equip.postfilter2" defaultMessage="前置滤镜2" />,
    post2: <FormattedMessage id="form.equip.postfilter3" defaultMessage="前置滤镜3" />,
    none: <FormattedMessage id="form.equip.nonefilter" defaultMessage="无" />
}

const postFilter = [
    {
        label: <FormattedMessage id="form.equip.postfilter1" defaultMessage="前置滤镜1" />,
        value:'post0',
    },
    {
        label: <FormattedMessage id="form.equip.postfilter2" defaultMessage="前置滤镜2" />,
        value:'post1',
    },
    {
        label: <FormattedMessage id="form.equip.postfilter3" defaultMessage="前置滤镜3" />,
        value:'post2',
    },
    {
        label: <FormattedMessage id="form.equip.nonefilter" defaultMessage="无" />,
        value:'',
    },
]

const RenderForm = createForm({
    mapPropsToFields(props) {
        return {
        //   host: createFormField({
        //     ...props.host,
        //     value: props.host.value,
        //   }),
        //   configuration: createFormField({
        //     ...props.configuration,
        //     value: props.configuration.value,
        //   }),
        //   materials: createFormField({
        //       ...props.materials,
        //       value: props.materials.value,
        //   }),
        //   pipefittings: createFormField({
        //       ...props.pipefittings,
        //       value: props.pipefittings.value,
        //   }),
        //   others: createFormField({
        //       ...props.others,
        //       value: props.others.value,
        //   })
        };
    }
})(injectIntl(withRouter((props)=>{
    const { getFieldProps, validateFields } = props.form;
    const { history,  intl: { formatMessage }} = props;

    console.log('Form Porps:', props)

    const handleSubmit = (e)=>{
        //e.preventDefault();
        validateFields((err, values)=>{
            if(!err){
                props.onSubmit(values);
            }
        })
    }


    // const handleFillClick = ()=>{
    //     history.push('pipefitting');
    // }

    return (
        <React.Fragment>
        <form>
            <List renderHeader={() => <FormattedMessage id="equipment.filtertitle" defaultMessage="产品明细" />}>
                <Item
                    arrow="horizontal"
                    multipleLine
                    onClick={()=>props.onSelectFilter('prev0')}
                    platform="android"
                ><FormattedMessage id="form.equip.prevfilter1" defaultMessage="前置滤芯1" />
                    <Brief>
                        <div className="item_children">
                            {props.prev0.idname === '' ? FilterPer['none'] : FilterPer[props.prev0.idname]}
                        </div>
                    </Brief>
                </Item>
                <Item
                    arrow="horizontal"
                    multipleLine
                    onClick={()=>props.onSelectFilter('prev1')}
                    platform="android"
                ><FormattedMessage id="form.equip.prevfilter2" defaultMessage="前置滤芯2" />
                    <Brief>
                        <div className="item_children">
                            {props.prev1.idname === '' ? FilterPer['none'] : FilterPer[props.prev1.idname]}
                        </div>
                    </Brief>
                </Item>
                <Item
                    arrow="horizontal"
                    multipleLine
                    onClick={()=>props.onSelectFilter('prev2')}
                    platform="android"
                ><FormattedMessage id="form.equip.prevfilter3" defaultMessage="前置滤芯3" />
                    <Brief>
                        <div className="item_children">
                            {props.prev2.idname === '' ? FilterPer['none'] : FilterPer[props.prev2.idname]}
                        </div>
                    </Brief>
                </Item>
                {/* <Item><FormattedMessage id="equipment.host" defaultMessage="主机" />
                    <Brief>
                        <div className="item_children">
                            <InputItem
                                placeholder={formatMessage({id: "form.input"})}
                                {...getFieldProps('host',{
                                    rules: [{
                                        required: true,
                                        message: <FormattedMessage id="equipment.host" defaultMessage="主机" />,
                                    }],
                                })}
                            />
                        </div>
                    </Brief>
                </Item> */}
                <Item
                    arrow="horizontal"
                    multipleLine
                    onClick={()=>props.onSelectFilter('post0')}
                    platform="android"
                ><FormattedMessage id="equipment.afterfilter" defaultMessage="后置滤芯" />
                    <Brief>
                        <div className="item_children">
                            {props.post0.idname === '' ? FilterPer['none'] : FilterPer[props.post0.idname]}
                        </div>
                    </Brief>
                </Item>
                <Item
                    arrow="horizontal"
                    multipleLine
                    onClick={()=>props.onSelectFilter('post1')}
                    platform="android"
                ><FormattedMessage id="equipment.afterfilter" defaultMessage="后置滤芯" />
                    <Brief>
                        <div className="item_children">
                            {props.post1.idname === '' ? FilterPer['none'] : FilterPer[props.post1.idname]}
                        </div>
                    </Brief>
                </Item>
                <Item
                    arrow="horizontal"
                    multipleLine
                    onClick={()=>props.onSelectFilter('post2')}
                    platform="android"
                ><FormattedMessage id="equipment.afterfilter" defaultMessage="后置滤芯" />
                    <Brief>
                        <div className="item_children">
                            {props.post2.idname === '' ? FilterPer['none'] : FilterPer[props.post2.idname]}
                        </div>
                    </Brief>
                </Item>
                {/* <Item><FormattedMessage id="equipment.configuration" defaultMessage="其他配置" />
                    <Brief>
                        <div className="item_children">
                            <Picker
                                data={configuration}
                                cols={1}
                                extra= {<FormattedMessage id="form.picker" defaultMessage="请选择" />}
                                {...getFieldProps('configuration')}
                                >
                                <List.Item arrow="horizontal"></List.Item>
                            </Picker>
                        </div>
                    </Brief>
                </Item>
                <Item><FormattedMessage id="equipment.materials" defaultMessage="管路材质" />
                    <Brief>
                        <div className="item_children">
                            <Picker
                                data={materials}
                                cols={1}
                                extra= {<FormattedMessage id="form.picker" defaultMessage="请选择" />}
                                {...getFieldProps('materials')}
                                >
                                <List.Item arrow="horizontal"></List.Item>
                            </Picker>
                        </div>
                    </Brief>
                </Item> */}
            </List>
            {/* <List renderHeader={() => <FormattedMessage id="equipment.fittingstitle" defaultMessage="主要管件数量（注意不同管径）" />}>
                <Item><FormattedMessage id="equipment.pipefittings" defaultMessage="主要管件" />
                    <Brief>
                        <div className="item_children">
                            <InputItem
                                editable={false}
                                onClick={handleFillClick}
                                extra=">"
                                placeholder={formatMessage({id: "equipment.fillin"})}
                                // {...getFieldProps('pipefittings',{
                                //     rules: [{
                                //         required: true,
                                //         message: <FormattedMessage id="equipment.pipefittings" defaultMessage="楼层高度" />,
                                //     }],
                                // })}
                                // extra="楼"
                            />
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
            </List> */}
        </form>
        <div className="submit_zone">
            <div className="add_btn" >
                <Button type="ghost" className="btn" onClick={handleSubmit}>
                    <FormattedMessage id="form.save" defaultMessage="保存" />
                </Button>
            </div>
        </div>
        </React.Fragment>
    )
})))

const dataInput = (data) => {
    const filters = {}
    const prevs = []
    const posts = []
    lodashMap(data, (item, index) => {
        if(item.isprev) {
            prevs.push(item)
        } else {
            posts.push(item)
        }
    })

    lodashMap(data, (item, index)=> {
        if(item.isprev) {
            filters[`prev${index}`] = item
        } else {
            filters[`post${index-prevs.length}`] = item
        }
    })

    return filters
}

const dataOutput = (data) => {
    const { prev0, prev1, prev2, post0, post1, post2 } = data
    const filters = []

    if(prev0.idname !== '' && prev0.idname !== []) {
        filters.push({...prev0, idname: prev0.idname[0]})
        if(prev1.idname !== '' && prev1.idname !== []) {
            filters.push({...prev1, idname: prev1.idname[0]})
            if(prev2.idname !== '' && prev2.idname !== []) {
                filters.push({...prev2, idname: prev2.idname[0]})
            }
        }
    }

    if(post0.idname !== '' && post0.idname !== []) {
        filters.push({...post0, idname: post0.idname[0]})
        if(post1.idname !== '' && post1.idname !== []) {
            filters.push({...post1, idname: post1.idname[0]})
            if(post2.idname !== '' && post2.idname !== []) {
                filters.push({...post2, idname: post2.idname[0]})
            }
        }
    }

    return filters
}

class EquipmentList extends PureComponent{

    state = {
        filterModal: false,
        curKey: 'prev0',
        isprev: true,
        idname: '',
        lastchangedate: new Date(),
        formData: basicData
    }

    handleSubmit = (values)=>{
        const filters = dataOutput(this.state.formData)

        console.log('Filters:', filters)
    }

    onCloseFilter = () => {
        this.setState({filterModal: false})
    }

    onShowFilter = (curKey) => {
        const { formData } = this.state
        const { isprev, idname, lastchangedate } = formData[curKey]
        this.setState({
            curKey,
            isprev,
            idname,
            lastchangedate,
            filterModal: true
        })
    }

    onFilterSubmit = () => {
        console.log('Current State:', this.state)
        const { formData, curKey, idname, lastchangedate } = this.state
        formData[curKey] = { ...formData[curKey], idname: idname, lastchangedate }
        this.setState({ 
            formData,
            filterModal: false 
        })
    }

    render () {
        const { history } = this.props;

        return (
            <div className="fp_container black_bg">
            <div className="sub_bg">
                <NavBar
                    className="nav"
                    icon={<Icon type="left" />}
                    onLeftClick={() => history.goBack()}
                >
                    <FormattedMessage id="device.equipmentlist" defaultMessage="设备清单" />
                </NavBar>
                { <RenderForm {...this.state.formData} {...this.props} onSelectFilter={this.onShowFilter} onSubmit={this.handleSubmit} />}
                <Modal
                    popup
                    visible={this.state.filterModal}
                    animationType="slide-up"
                    >
                    <div className="setting-modal">
                        <WingBlank className="wb_margin">
                            <List>
                                <Item><FormattedMessage id="filter.select" defaultMessage="选择滤芯" />
                                    <Brief>
                                        <div className="item_children">
                                            <Picker
                                                data={this.state.isprev ? prevFilter : postFilter}
                                                cols={1}
                                                extra={<FormattedMessage id="form.picker" defaultMessage="请选择" />}
                                                value={this.state.idname}
                                                onChange={(val) => {
                                                    console.log(val);
                                                    this.setState({idname: val})
                                                    }
                                                }
                                                >
                                                <List.Item arrow="horizontal"></List.Item>
                                            </Picker>
                                        </div>
                                    </Brief>
                                </Item>
                                <Item><FormattedMessage id="filter.replacedate" defaultMessage="上一次更换时间" />
                                    <Brief>
                                        <div className="item_children">
                                            <DatePicker
                                                mode="date"
                                                title=""
                                                extra="Optional"
                                                value={this.state.lastchangedate}
                                                onChange={date => this.setState({ lastchangedate: date })}
                                                >
                                                <List.Item arrow="horizontal"></List.Item>
                                            </DatePicker>
                                        </div>
                                    </Brief>
                                </Item>
                                <WingBlank  className="submit_zone dual_btn wb_margin">
                                    <div className="add_btn_left" style={{display: 'inline-block'}} >
                                        <Button type="ghost" className="btn" onClick={this.onCloseFilter}>
                                            <FormattedMessage id="form.cancel" defaultMessage="取消" />
                                        </Button>
                                    </div>
                                <WhiteSpace style={{display: 'inline-block', minWidth:20}} />
                                    <div className="add_btn_right" style={{display: 'inline-block', float: 'right'}} >
                                        <Button type="ghost" className="btn" onClick={this.onFilterSubmit}>
                                            <FormattedMessage id="form.ok" defaultMessage="确认" />
                                        </Button>
                                    </div>
                                </WingBlank>
                            </List>
                        </WingBlank>
                    </div>
                </Modal>
            </div></div>
        )
    }
}

export default withRouter(EquipmentList);
// export default withRouter(injectIntl(EquipmentList));

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {  NavBar, Icon, List, InputItem, Picker, Button, Modal, WingBlank, DatePicker, WhiteSpace } from 'antd-mobile';
import { createForm, createFormField } from 'rc-form';
import lodashMap from 'lodash.map'
import lodashGet from 'lodash.get'
import moment from 'moment'
import { withRouter } from 'react-router-dom';
import { FormattedMessage, injectIntl } from 'react-intl';
import {common_err,setuserdevice_result,ui_setuserdevice_request} from '../../actions';
import { prev0Options, prev1Options, prev2Options, post0Options, post1Options, convertfromfilterlist } from '../SettingFilter/config'
import './index.less';

const Item = List.Item;
const Brief = Item.Brief;

const basicData = {
    prev0: {
        isprev: true,
        idname: 'prev0',
        life: [0],
    },
    prev1: {
        isprev: true,
        idname: 'prev1',
        life: [0],
    },
    prev2: {
        isprev: true,
        idname: 'prev2',
        life: [0],
    },
    post0: {
        isprev: false,
        idname: 'post0',
        life: [0],
    },
    post1: {
        isprev: false,
        idname: 'post1',
    },
    post2: {
        isprev: false,
        idname: 'post2',
        life: [0],
    },
    host: '', //主机
    configuration: [], //其他配置
    materials: [], // 管路材质
    // pipefittings: { // 主要管件
    //     value: {},
    // },
    others: '', //其他
}

const configuration = [
    {
        label: <FormattedMessage key={0} id="form.equip.config.comm" />,
        value: 'comm',
    },
    {
        label: <FormattedMessage key={1} id="form.equip.config.home" />,
        value: 'home',
    }
]

const materials = [
    {
        label: <FormattedMessage key={0} id="form.equip.meter.cop" />,
        value: 'cop',
    },
    {
        label: <FormattedMessage key={1} id="form.equip.meter.alum" />,
        value: 'alum',
    }
]

const others = [
    {
        label: 'XXX型',
        value: 'XXX型',
    },
    {
        label: 'YYY型',
        value: 'YYY型',
    }
]


// const prevFilter = [
//     {
//         label: <FormattedMessage key={0} id="form.equip.prevfilter1" defaultMessage="前置滤镜1" />,
//         value:'prev0',
//     },
//     {
//         label: <FormattedMessage key={1} id="form.equip.prevfilter2" defaultMessage="前置滤镜2" />,
//         value:'prev1',
//     },
//     {
//         label: <FormattedMessage key={2} id="form.equip.prevfilter3" defaultMessage="前置滤镜3" />,
//         value:'prev2',
//     },
//     {
//         label: <FormattedMessage key={3} id="form.equip.nonefilter" defaultMessage="无" />,
//         value:'',
//     },
// ]

const FilterPer = {
    prev0: <FormattedMessage id="form.equip.prevfilter1" defaultMessage="前置滤镜1" />,
    prev1: <FormattedMessage id="form.equip.prevfilter2" defaultMessage="前置滤镜2" />,
    prev2: <FormattedMessage id="form.equip.prevfilter3" defaultMessage="前置滤镜3" />,
    post0: <FormattedMessage id="form.equip.postfilter1" defaultMessage="前置滤镜1" />,
    post1: <FormattedMessage id="form.equip.postfilter2" defaultMessage="前置滤镜2" />,
    post2: <FormattedMessage id="form.equip.postfilter3" defaultMessage="前置滤镜3" />,
    none: <FormattedMessage id="form.equip.nonefilter" defaultMessage="无" />,
    select: <FormattedMessage id="filter.select" defaultMessage="选择滤芯" />
}

// const postFilter = [
//     {
//         label: <FormattedMessage key={0} id="form.equip.postfilter1" defaultMessage="前置滤镜1" />,
//         value:'post0',
//     },
//     {
//         label: <FormattedMessage key={1} id="form.equip.postfilter2" defaultMessage="前置滤镜2" />,
//         value:'post1',
//     },
//     {
//         label: <FormattedMessage key={2} id="form.equip.postfilter3" defaultMessage="前置滤镜3" />,
//         value:'post2',
//     },
//     {
//         label: <FormattedMessage key={3} id="form.equip.nonefilter" defaultMessage="无" />,
//         value:'',
//     },
// ]

const RenderForm = createForm({
    mapPropsToFields(props) {
        return {
          host: createFormField({value: props.host}),
          configuration: createFormField({value: props.configuration}),
          materials: createFormField({value: props.materials}),
          pipefittings: createFormField({value: props.pipefittings}),
          others: createFormField({value: props.others})
        };
    }
})(injectIntl(withRouter((props)=>{
    const { getFieldProps, validateFields } = props.form;
    const { history,  intl: { formatMessage }} = props;

    const handleSubmit = (e)=>{
        //e.preventDefault();
        validateFields((err, values)=>{
            if(!err){
                props.onSubmit(values);
            }
        })
    }


    const handleFillClick = () => {
        validateFields((err, values)=>{
            if(!err){
                props.onFillPipeFitting(values)
            }
        })
    }

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
                            { lodashGet(props, 'prev0.life', [0])[0] === 0 ? FilterPer['none'] : <FormattedMessage id="setting.system.PP" values={{value: props.prev0.life}} />}
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
                            {lodashGet(props, 'prev1.life', [0])[0] === 0 ? FilterPer['none'] : <FormattedMessage id="setting.system.carbon" values={{value: props.prev1.life}} />}
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
                            {lodashGet(props, 'prev2.life', [0])[0] === 0 ? FilterPer['none'] : <FormattedMessage id="setting.system.TAC" values={{value: props.prev2.life}} />}
                        </div>
                    </Brief>
                </Item>
                <Item><FormattedMessage id="equipment.host" defaultMessage="主机" />
                    <Brief>
                        <div className="item_children">
                            <InputItem
                                placeholder={formatMessage({id: "form.input"})}
                                editable={false}
                                {...getFieldProps('host')}
                            />
                        </div>
                    </Brief>
                </Item>
                <Item
                    arrow="horizontal"
                    multipleLine
                    onClick={()=>props.onSelectFilter('post0')}
                    platform="android"
                ><FormattedMessage id="form.equip.postfilter1" defaultMessage="后置滤芯1" />
                    <Brief>
                        <div className="item_children">
                            {lodashGet(props, 'post0.life', [0])[0] === 0 ? FilterPer['none'] : <FormattedMessage id="setting.system.LED" values={{value: props.post0.life}} />}
                        </div>
                    </Brief>
                </Item>
                <Item
                    arrow="horizontal"
                    multipleLine
                    onClick={()=>props.onSelectFilter('post1')}
                    platform="android"
                ><FormattedMessage id="form.equip.postfilter2" defaultMessage="后置滤芯2" />
                    <Brief>
                        <div className="item_children">
                            {lodashGet(props, 'post1.life', [0])[0] === 0 ? FilterPer['none'] : <FormattedMessage id="setting.system.AFC" values={{value: props.post1.life}} />}
                        </div>
                    </Brief>
                </Item>
                <Item
                    // arrow="horizontal"
                    multipleLine
                    // onClick={()=>props.onSelectFilter('post2')}
                    platform="android"
                ><FormattedMessage id="form.equip.postfilter3" defaultMessage="后置滤芯3" />
                    <Brief>
                        <div className="item_children">
                        {lodashGet(props, 'post2.life', [0])[0] === 0 ? FilterPer['none'] : <FormattedMessage id="setting.system.AFC" values={{value: props.post2.life}} />}
                        </div>
                    </Brief>
                </Item>
                <Item><FormattedMessage id="equipment.configuration" defaultMessage="其他配置" />
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
                </Item>
            </List>
            <List renderHeader={() => <FormattedMessage id="equipment.fittingstitle" defaultMessage="主要管件数量（注意不同管径）" />}>
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
            </List>
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

// const dataInput = (device) => {
//     const { filterlist: data } = device
//     const filters = {}
//     const prevs = []
//     const posts = []
//     const configuration = [device.configuration]
//     const materials = [device.materials]
//     if(data === []) {
//         console.log('data:', data)
//         for(let i = 0; i++; i<3) {
//             data.push({isprev: true})
//             prevs.push({isprev: true})
//         }
//         for(let i = 0; i++; i<3) {
//             data.push({isprev: false})
//             posts.push({isprev: false})
//         }
//     } else {
//         lodashMap(data, (item, index) => {
//             if(item.isprev) {
//                 prevs.push(item)
//             } else {
//                 posts.push(item)
//             }
//         })
//     }
    

//     lodashMap(data, (item, index)=> {
//         if(item.isprev) {
//             filters[`prev${index}`] = {
//                 ...item, 
//                 // idname: `${lodashGet(item, 'idname', `prev${index}`)}`, 
//                 life: [`${lodashGet(item, 'life', 0)}`], 
//                 lastchangedate: moment(lodashGet(item, 'lastchangedate', moment())).toDate()
//             }
//         } else {
//             filters[`post${index-prevs.length}`] = {
//                 ...item, 
//                 // idname: `${lodashGet(item, 'item', `post${index-prevs.length}`)}`, 
//                 life: [`${lodashGet(item, 'life', 0)}`], 
//                 lastchangedate: moment(lodashGet(item, 'lastchangedate', moment())).toDate()
//             }
//         }

//     })

//     return {
//         ...filters,
//         configuration,
//         materials

//     }
// }

class EquipmentList extends PureComponent{

    state = {
        filterModal: false,
        curKey: 'prev0',
        isprev: true,
        curOptions: prev0Options,
        idname: '',
        life: 0,
        lastchangedate: new Date(),
        formData: {
            ...basicData, 
            ...this.props.initData,
            // ...this.props.devicelist, 
            // ...dataInput(this.props.devicelist), 
            host: lodashGet(this.props.basicinfo, 'model', '')
        }
    }

    handleSubmit = (values)=>{
        const configuration = lodashGet(values, 'configuration', [''])[0]
        const materials = lodashGet(values, 'materials', [''])[0]

        const { prev0, prev1, prev2, post0, post1, post2 } = this.state.formData
        const prev0lastchangedate = prev0.lastchangedate
        const prev1lastchangedate = prev1.lastchangedate
        const prev2lastchangedate = prev2.lastchangedate
        const post0lastchangedate = post0.lastchangedate
        const post1lastchangedate = post1.lastchangedate
        const post2lastchangedate = post2.lastchangedate

        //yield put(setuserdevice_request({_id,data}));
        // 考虑到没网的条件,先设置一下
        //输出:devicelist
        let devicelist = {
            ...this.props.devicelist, 
            ...values, 
            prev0lastchangedate, 
            prev1lastchangedate, 
            prev2lastchangedate, 
            post0lastchangedate,
            post1lastchangedate,
            post2lastchangedate,
            configuration, 
            materials
        }

        console.log('Submit DeviseList:', devicelist)

        const {dispatch,_id} = this.props;
        dispatch(setuserdevice_result({devicelist}))

        dispatch(ui_setuserdevice_request({_id,data:{devicelist}}));
    }

    handleFillPipeFittings = (values) => {
        this.handleSubmit(values)
        this.props.history.push('pipefitting');
    }

    onCloseFilter = () => {
        this.setState({filterModal: false})
    }

    onShowFilter = (curKey) => {
        const { formData } = this.state
        const { isprev, idname, life, lastchangedate } = formData[curKey]
        if(life[0] !== 0) {
            let curOptions = []
            switch (curKey) {
                case 'prev0':
                    curOptions = prev0Options
                    break;
                case 'prev1':
                    curOptions = prev1Options
                    break;
                case 'prev2':
                    curOptions = prev2Options
                    break;
                case 'post0':
                    curOptions = post0Options
                    break;
                case 'post1':
                    curOptions = post1Options
                    break;
                default:
                    break;
            }
            this.setState({
                curKey,
                isprev,
                curOptions,
                idname,
                life,
                lastchangedate,
                filterModal: true
            })
        }
        
    }

    onFilterSubmit = () => {

        const { formData, curKey, idname, life, lastchangedate } = this.state
        formData[curKey] = { ...formData[curKey], idname, life, lastchangedate }
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
                { <RenderForm 
                    {...this.state.formData} 
                    {...this.props} 
                    onSelectFilter={this.onShowFilter} 
                    onSubmit={this.handleSubmit} 
                    onFillPipeFitting={this.handleFillPipeFittings}
                />}
                <Modal
                    popup
                    visible={this.state.filterModal}
                    animationType="slide-up"
                    >
                    <div className="setting-modal">
                        <WingBlank className="wb_margin">
                            <List>
                                {/* <Item><FormattedMessage id="filter.select" defaultMessage="选择滤芯" />
                                    <Brief>
                                        <div className="item_children">
                                            <Picker
                                                data={this.state.curOptions}
                                                cols={1}
                                                extra={<FormattedMessage id="form.picker" defaultMessage="请选择" />}
                                                value={this.state.life}
                                                onChange={(val) => {
                                                    console.log(val);
                                                    this.setState({life: val})
                                                    }
                                                }
                                                >
                                                <List.Item arrow="horizontal"></List.Item>
                                            </Picker>
                                        </div>
                                    </Brief>
                                </Item> */}
                                <Item><FormattedMessage id="filter.replacedate" defaultMessage="上一次更换时间" />
                                    <Brief>
                                        <div className="item_children">
                                            <DatePicker
                                                mode="date"
                                                title=""
                                                extra={<FormattedMessage id="form.picker" defaultMessage="请选择" />}
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
const mapStateToProps =  ({device:{ basicinfo, devicelist,  _id}, devicedata: { filterlist }}) =>{

    const { prev0lastchangedate, prev1lastchangedate, prev2lastchangedate, post0lastchangedate, post1lastchangedate, post2lastchangedate } = devicelist

    const initData = convertfromfilterlist(filterlist)

    initData['prev0'] = {...initData['prev0'], lastchangedate: prev0lastchangedate }
    initData['prev1'] = {...initData['prev1'], lastchangedate: prev1lastchangedate }
    initData['prev2'] = {...initData['prev2'], lastchangedate: prev2lastchangedate }
    initData['post0'] = {...initData['post0'], lastchangedate: post0lastchangedate }
    initData['post1'] = {...initData['post1'], lastchangedate: post1lastchangedate }
    initData['post2'] = {...initData['post2'], lastchangedate: post2lastchangedate }

    return { basicinfo, initData, _id};
};
EquipmentList = connect(mapStateToProps)(EquipmentList);
export default withRouter(EquipmentList);
// export default withRouter(injectIntl(EquipmentList));

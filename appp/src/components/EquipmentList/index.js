import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {  NavBar, Icon, List, Button, Modal, WingBlank, DatePicker, WhiteSpace } from 'antd-mobile';
import lodashGet from 'lodash.get'
import moment from 'moment'
import RenderForm from './renderForm'
import { withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { setuserdevice_result,ui_setuserdevice_request} from '../../actions';
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

class EquipmentList extends React.Component{

    constructor(props) {
        super(props)
        this.state = {
            filterModal: false,
            curKey: 'prev0',
            isprev: true,
            curOptions: prev0Options,
            idname: '',
            life: 0,
            lastchangedate: new Date(),
            formData: {
                ...basicData, 
                ...this.props.devicelist, 
                ...this.props.initData,
                host: lodashGet(this.props.basicinfo, 'model', '')
            }
        }
    }    

    handleSubmit = (values = {})=>{
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
        this.props.history.goBack()
    }

    handleFillPipeFittings = (values) => {
        console.log('Will Fill:', values)
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
                <RenderForm 
                    {...this.state.formData} 
                    // {...this.props} 
                    onSelectFilter={this.onShowFilter} 
                    onSubmit={this.handleSubmit} 
                    onFillPipeFitting={this.handleFillPipeFittings}
                />
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
    // 
    const { prev0lastchangedate, prev1lastchangedate, prev2lastchangedate, post0lastchangedate, post1lastchangedate, post2lastchangedate } = devicelist
    const initData = convertfromfilterlist(filterlist)

    initData['prev0'] = {...initData['prev0'], lastchangedate: moment(prev0lastchangedate).toDate() }
    initData['prev1'] = {...initData['prev1'], lastchangedate: moment(prev1lastchangedate).toDate() }
    initData['prev2'] = {...initData['prev2'], lastchangedate: moment(prev2lastchangedate).toDate() }
    initData['post0'] = {...initData['post0'], lastchangedate: moment(post0lastchangedate).toDate() }
    initData['post1'] = {...initData['post1'], lastchangedate: moment(post1lastchangedate).toDate() }
    initData['post2'] = {...initData['post2'], lastchangedate: moment(post2lastchangedate).toDate() }

    return { basicinfo, devicelist, initData, _id};
};
EquipmentList = connect(mapStateToProps)(EquipmentList);
export default withRouter(EquipmentList);

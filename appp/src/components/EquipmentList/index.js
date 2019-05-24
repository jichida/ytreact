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
        const { prev0lastchangedate, prev1lastchangedate, prev2lastchangedate, post0lastchangedate, post1lastchangedate, post2lastchangedate } = this.props.devicelist
        this.state = {
            filterModal: false,
            curKey: 'prev0',
            prev0lastchangedate: moment(prev0lastchangedate).toDate(),
            prev1lastchangedate: moment(prev1lastchangedate).toDate(),
            prev2lastchangedate: moment(prev2lastchangedate).toDate(),
            post0lastchangedate: moment(post0lastchangedate).toDate(),
            post1lastchangedate: moment(post1lastchangedate).toDate(),
            post2lastchangedate: moment(post2lastchangedate).toDate(),
            curOptions: prev0Options,
            lastchangedate: new Date(),
        }
    }    

    handleSubmit = (values)=>{
        this.handleSave(values)
        this.props.history.goBack()
    }

    handleSave = (values = {}) => {
        const configuration = lodashGet(values, 'configuration', [''])[0]
        const materials = lodashGet(values, 'materials', [''])[0]
        const { prev0lastchangedate, prev1lastchangedate, prev2lastchangedate, post0lastchangedate, post1lastchangedate, post2lastchangedate } = this.state

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
        this.handleSave(values)
        this.props.history.push('pipefitting');
    }

    onCloseFilter = () => {
        this.setState({filterModal: false})
    }

    onShowFilter = (curKey) => {
        console.log(lodashGet(this.props, `initData.${curKey}.life`, [0]))

        if(lodashGet(this.props, `initData.${curKey}.life`, [0])[0] !== 0) {
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
                curOptions,
                lastchangedate: this.state[`${curKey}lastchangedate`],
                filterModal: true
            })
        }
        
    }

    onFilterSubmit = () => {
        let newState = {...this.state}
        newState[`${this.state.curKey}lastchangedate`] = this.state.lastchangedate
        newState[`filterModal`] = false
        this.setState(newState)
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
                    {...this.props.devicelist} 
                    {...this.props.initData}
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
    const initData = convertfromfilterlist(filterlist)
    return { basicinfo, devicelist, initData, _id};
};
EquipmentList = connect(mapStateToProps)(EquipmentList);
export default withRouter(EquipmentList);

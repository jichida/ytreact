import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {  List, InputItem, Button, Modal, WingBlank, WhiteSpace, Picker  } from 'antd-mobile';//
import { withRouter } from 'react-router-dom';
import { wifi_sendcmd_request,set_weui} from '../../actions';
import lodashMap from 'lodash.map'
import lodashGet from 'lodash.get'
import moment from 'moment'
import RenderForm from './FilterForm'
import { FormattedMessage, injectIntl } from 'react-intl';
import { prev0Options, prev1Options, prev2Options, post0Options, post1Options ,convertfilterlist,convertfromfilterlist} from './config'

import './index.less';

const Item = List.Item;
const Brief = Item.Brief;

const basicData = {
    prev0: {
        isprev: true,
        idname: '',
        // lastchangedate: new Date()
    },
    prev1: {
        isprev: true,
        idname: '',
        // lastchangedate: new Date()
    },
    prev2: {
        isprev: true,
        idname: '',
        // lastchangedate: new Date()
    },
    post0: {
        isprev: false,
        idname: '',
        // lastchangedate: new Date()
    },
    post1: {
        isprev: false,
        idname: '',
        // lastchangedate: new Date()
    },
    post2: {
        isprev: false,
        idname: '',
        // lastchangedate: new Date()
    },
    // host: '', //主机
}

const dataInput = (device) => {
    const { filterlist: data } = device
    const filters = {}
    const prevs = []
    const posts = []
    if(data === []) {
        console.log('data:', data)
        for(let i = 0; i++; i<3) {
            data.push({isprev: true})
            prevs.push({isprev: true})
        }
        for(let i = 0; i++; i<3) {
            data.push({isprev: false})
            posts.push({isprev: false})
        }
    } else {
        lodashMap(data, (item, index) => {
            if(item.isprev) {
                prevs.push(item)
            } else {
                posts.push(item)
            }
        })
    }


    lodashMap(data, (item, index)=> {
        if(item.isprev) {
            filters[`prev${index}`] = {
                ...item,
                idname: [`${lodashGet(item, 'idname', `prev${index}`)}`],
                life: [`${lodashGet(item, 'life', '0')}`],
                lastchangedate: moment(lodashGet(item, 'lastchangedate', moment())).toDate()
            }
        } else {
            filters[`post${index-prevs.length}`] = {
                ...item,
                idname: [`${lodashGet(item, 'item', `post${index-prevs.length}`)}`],
                life: [`${lodashGet(item, 'life', '0')}`],
                lastchangedate: moment(item.lastchangedate).toDate()
            }
        }

    })

    console.log('Input filters:', filters)
    return {
        ...filters,
    }
}

const dataOutput = (data) => {
    const { prev0, prev1, prev2, post0, post1, post2 } = data
    const filters = []

    if(!!prev0.life) {
        filters.push({...prev0, life: prev0.life[0], idname: prev0.idname === '' ? 'prev0' : prev0.idname[0]})
    }
    if(!!prev1.life) {
        filters.push({...prev1, life: prev1.life[0], idname: prev1.idname === '' ? 'prev1' : prev1.idname[0]})
    }
    if(!!prev2.life) {
        filters.push({...prev2, life: prev2.life[0], idname: prev2.idname === '' ? 'prev2' : prev2.idname[0]})
    }
    if(!!post0.life) {
        filters.push({...post0, life: post0.life[0], idname: post0.idname === '' ? 'post0' : post0.idname[0]})
    }
    if(!!post1.life) {
        filters.push({...post1, life: post1.life[0], idname: post1.idname === '' ? 'post1' : post1.idname[0]})
    }

    return filters
}


class Inlet extends PureComponent{
    constructor(props) {
        super(props)
        this.state = {
            filterModal: false,
            // modalHost: false,
            curKey: 'prev0',
            isprev: true,
            curOptions: prev0Options,
            idname: '',
            life: 0,
            lastchangedate: new Date(),
            formData: {
                // ...basicData,
                // ...this.props.devicelist,
                ...this.props.devicelist,
                // host: lodashGet(this.props.basicinfo, 'model', '')
            }
        }
    }

    // handleSetHostSubmit =() => {
    //     // 发送host至设备
    //     console.log('New Host:', this.state.formData.host)
    // }

    handleSubmit = () => {
        // 发送至硬件并保存至reducer
        const filterlist = dataOutput(this.state.formData)
        console.log('Submit DeviseList:', filterlist)
        // --->
        const payload = convertfilterlist(filterlist);
        console.log(payload);
        // this.props.dispatch(setfilterlist(payload));

        this.props.dispatch(wifi_sendcmd_request({cmd:`$filtertype ${payload.prev0}.${payload.prev1}.${payload.prev2}.${payload.post0}.${payload.post1}%`,cmdstring:'设置滤芯',target:{
          fieldname:'filterlist',
          value:payload
        }}));
    }

    onFilterSubmit = () => {
        const { formData, curKey, idname, life } = this.state

        formData[curKey] = { ...formData[curKey], idname, life }
        this.setState({
            formData,
            filterModal: false
        })
    }

    onShowFilter = (curKey) => {
        const { formData } = this.state
        const { isprev, idname, life, lastchangedate } = formData[curKey]
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

    onCloseFilter = () => {
        this.setState({filterModal: false})
    }

    // onSetHost = () => {
    //     this.setState({modalHost: true})
    // }

    // handleHostChange = (val) => {
    //     const { formData } = this.state
    //     formData.host = val
    //     this.setState({formData})
    // }

    // handleSetHostClose = () => {
    //     this.setState({ modalHost: false })
    // }


    render () {

        return (
            <div className="sub_setting_bg">
                <RenderForm
                    {...this.state.formData}
                    {...this.props}
                    onSelectFilter={this.onShowFilter}
                    onSetHost={this.onSetHost}
                    onSubmit={this.handleSubmit}
                />
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
                {/* <Modal
                    popup
                    visible={this.state.modalHost}
                    animationType="slide-up"
                    >
                    <div className="setting-modal">
                        <WingBlank className="wb_margin">
                            <List>
                            <Item><FormattedMessage id="equipment.host" defaultMessage="主机" />
                                <Brief>
                                    <div className="item_children">
                                    <InputItem
                                        placeholder={formatMessage({id: "form.input"})}
                                        value={this.state.formData.host}
                                        onChange={(val)=>this.handleHostChange(val)}
                                    />
                                    </div>
                                </Brief>
                            </Item>
                            </List>
                            <WingBlank  className="submit_zone dual_btn">
                                <div className="add_btn_left" style={{display: 'inline-block'}} >
                                    <Button type="ghost" className="btn" onClick={this.handleSetHostClose}>
                                        <FormattedMessage id="form.cancel" defaultMessage="取消" />
                                    </Button>
                                </div>
                                <WhiteSpace style={{display: 'inline-block', minWidth:20}} />
                                <div className="add_btn_right" style={{display: 'inline-block', float: 'right'}} >
                                    <Button type="ghost" className="btn" onClick={this.handleSetHostSubmit}>
                                        <FormattedMessage id="setting.system.send" defaultMessage="发送" />
                                    </Button>
                                </div>
                            </WingBlank>
                        </WingBlank>
                    </div>
                </Modal> */}
            </div>

        )
    }
}

const mapStateToProps =  ({devicedata}) =>{

    const filterlist = devicedata.filterlist;
    console.log('Filter List:', filterlist)
    const devicelist = convertfromfilterlist(filterlist);
    console.log('Device List:', devicelist);
    // const basicinfo = {}
    return { devicelist };
};

Inlet = connect(mapStateToProps)(Inlet);
export default withRouter(injectIntl(Inlet));

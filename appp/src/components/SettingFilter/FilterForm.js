import React from 'react';
import { List, Button } from 'antd-mobile';
import lodashGet from 'lodash.get'
import { withRouter } from 'react-router-dom';
import { FormattedMessage, injectIntl } from 'react-intl';
import './index.less';

const Item = List.Item;
const Brief = Item.Brief;

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

const Index = (props) => {
    return (
        <React.Fragment>
        <form>
            <List>
                <Item className="item_switch"
                    extra={<div className="add_btn" style={{width: 65, display: 'inline-block'}} >
                            <Button size="small" type="ghost" className="btn" onClick={()=>{props.onSelectFilter('prev0')}} >
                                <FormattedMessage id="setting.system.setup" defaultMessage="设置" />
                            </Button>
                            </div>
                        }
                ><FormattedMessage id="form.equip.prevfilter1" defaultMessage="前置滤芯1" />
                    <Brief>
                        <div className="item_children">
                            { lodashGet(props, 'prev0.life', [0])[0] === 0 ? FilterPer['select'] : <FormattedMessage id="setting.system.PP" values={{value: props.prev0.life}} />}
                        </div>
                    </Brief>
                </Item>
                <Item className="item_switch"
                    extra={<div className="add_btn" style={{width: 65, display: 'inline-block'}} >
                            <Button size="small" type="ghost" className="btn" onClick={()=>{props.onSelectFilter('prev1')}} >
                                <FormattedMessage id="setting.system.setup" defaultMessage="设置" />
                            </Button>
                            </div>
                        }
                ><FormattedMessage id="form.equip.prevfilter2" defaultMessage="前置滤芯2" />
                    <Brief>
                        <div className="item_children">
                            {lodashGet(props, 'prev1.life', [0])[0] === 0 ? FilterPer['select'] : <FormattedMessage id="setting.system.carbon" values={{value: props.prev1.life}} />}
                        </div>
                    </Brief>
                </Item>
                <Item className="item_switch"
                    extra={<div className="add_btn" style={{width: 65, display: 'inline-block'}} >
                            <Button size="small" type="ghost" className="btn" onClick={()=>{props.onSelectFilter('prev2')}} >
                                <FormattedMessage id="setting.system.setup" defaultMessage="设置" />
                            </Button>
                            </div>
                        }
                ><FormattedMessage id="form.equip.prevfilter3" defaultMessage="前置滤芯3" />
                    <Brief>
                        <div className="item_children">
                            {lodashGet(props, 'prev2.life', [0])[0] === 0 ? FilterPer['select'] : <FormattedMessage id="setting.system.TAC" values={{value: props.prev2.life}} />}
                        </div>
                    </Brief>
                </Item>
                {/* <Item className="item_switch"
                    extra={<div className="add_btn" style={{width: 65, display: 'inline-block'}} >
                            <Button size="small" type="ghost" className="btn" onClick={()=>{props.onSetHost()}} >
                                <FormattedMessage id="setting.system.setup" defaultMessage="设置" />
                            </Button>
                            </div>
                        }
                ><FormattedMessage id="equipment.host" defaultMessage="主机" />
                    <Brief>
                        <div className="item_children">
                            {lodashGet(props, 'host', '')}
                        </div>
                    </Brief>
                </Item> */}
                <Item className="item_switch"
                    extra={<div className="add_btn" style={{width: 65, display: 'inline-block'}} >
                            <Button size="small" type="ghost" className="btn" onClick={()=>{props.onSelectFilter('post0')}} >
                                <FormattedMessage id="setting.system.setup" defaultMessage="设置" />
                            </Button>
                            </div>
                        }
                ><FormattedMessage id="form.equip.postfilter1" defaultMessage="后置滤芯1" />
                    <Brief>
                        <div className="item_children">
                            {lodashGet(props, 'post0.life', [0])[0] === 0 ? FilterPer['select'] : <FormattedMessage id="setting.system.LED" values={{value: props.post0.life}} />}
                        </div>
                    </Brief>
                </Item>
                <Item className="item_switch"
                    extra={<div className="add_btn" style={{width: 65, display: 'inline-block'}} >
                            <Button size="small" type="ghost" className="btn" onClick={()=>{props.onSelectFilter('post1')}} >
                                <FormattedMessage id="setting.system.setup" defaultMessage="设置" />
                            </Button>
                            </div>
                        }
                ><FormattedMessage id="form.equip.postfilter2" defaultMessage="后置滤芯2" />
                    <Brief>
                        <div className="item_children">
                            {lodashGet(props, 'post1.life', [0])[0] === 0 ? FilterPer['select'] : <FormattedMessage id="setting.system.AFC" values={{value: props.post1.life}} />}
                        </div>
                    </Brief>
                </Item>
                <Item className="item_switch"
                    // extra={<div className="add_btn" style={{width: 65, display: 'inline-block'}} >
                    //         <Button size="small" type="ghost" className="btn"> onClick={()=>{props.onSelectFilter('post2')}} 
                    //             <FormattedMessage id="setting.system.setup" defaultMessage="设置" />
                    //         </Button>
                    //         </div>
                    //     }
                ><FormattedMessage id="form.equip.postfilter3" defaultMessage="后置滤芯3" />
                    <Brief>
                        <div className="item_children">
                            {lodashGet(props, 'post2.life', [0])[0] === 0 ? FilterPer['none'] : <FormattedMessage id="setting.system.AFC" values={{value: props.post2.life}} />}
                        </div>
                    </Brief>
                </Item>
            </List>
        </form>
        <div className="submit_zone">
            <div className="add_btn" >
                <Button type="ghost" className="btn" onClick={() => props.onSubmit()}>
                    <FormattedMessage id="form.save" defaultMessage="保存" />
                </Button>
            </div>
        </div>
        </React.Fragment>
    )
}

export default injectIntl(withRouter(Index))



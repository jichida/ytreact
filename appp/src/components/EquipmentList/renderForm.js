import React from 'react'
import { createForm, createFormField } from 'rc-form'
import lodashGet from 'lodash.get'
import { Button, Picker, InputItem, List, Icon } from 'antd-mobile'
import { FormattedMessage, injectIntl } from 'react-intl'

const Item = List.Item;
const Brief = Item.Brief;

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
    const { getFieldProps, validateFields } = props.form;
    const { intl: { formatMessage }} = props;

    console.log('From Props:', props)

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
                console.log('Form Will Fill:', values)
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
                            {String(lodashGet(props, 'prev0.life', [0])[0]) === '0' ? FilterPer['none'] : <FormattedMessage id="setting.system.PP" values={{value: props.prev0.life}} />}
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
                            {String(lodashGet(props, 'prev1.life', [0])[0]) === '0' ? FilterPer['none'] : <FormattedMessage id="setting.system.carbon" values={{value: props.prev1.life}} />}
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
                            {String(lodashGet(props, 'prev2.life', [0])[0]) === '0' ? FilterPer['none'] : <FormattedMessage id="setting.system.FOF" values={{value: props.prev2.life}} />}
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
                            {String(lodashGet(props, 'post0.life', [0])[0]) === '0' ? FilterPer['none'] : <FormattedMessage id="setting.system.AFC" values={{value: props.post0.life}} />}
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
                            {String(lodashGet(props, 'post1.life', [0])[0]) === '0' ? FilterPer['none'] : <FormattedMessage id="setting.system.DCF" values={{value: props.post1.life}} />}
                        </div>
                    </Brief>
                </Item>
                <Item
                    arrow="horizontal"
                    multipleLine
                    onClick={()=>props.onSelectFilter('post2')}
                    platform="android"
                ><FormattedMessage id="form.equip.postfilter3" defaultMessage="后置滤芯3" />
                    <Brief>
                        <div className="item_children">
                        {String(lodashGet(props, 'post2.life', [0])[0]) === '0' ? FilterPer['none'] : <FormattedMessage id="setting.system.LED" values={{value: props.post2.life}} />}
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
                                extra={<Icon type="right" />}
                                onExtraClick={handleFillClick}
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
                                {...getFieldProps('others')}
                                // {...getFieldProps('others',{
                                //     rules: [{
                                //         required: true,
                                //         message: <FormattedMessage id="equipment.others" defaultMessage="其他" />,
                                //     }],
                                // })}
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
}

const createFormOption = {
    mapPropsToFields(props) {
        return {
          host: createFormField({value: props.host}),
          configuration: createFormField({value: [props.configuration]}),
          materials: createFormField({value: [props.materials]}),
          pipefittings: createFormField({value: props.pipefittings}),
          others: createFormField({value: props.others})
        };
    }
}

export default createForm(createFormOption)(injectIntl(Index))
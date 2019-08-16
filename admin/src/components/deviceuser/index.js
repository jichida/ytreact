import React from 'react';
import { List } from 'react-admin';

import {
  BooleanField,
  BooleanInput,
  NullableBooleanInput,
  Edit,
  TabbedForm,
  FormTab,
  TextInput,
  Datagrid,
  TextField,
  EditButton,
  SelectInput,
  Filter,
  ReferenceInput,
  ReferenceField,
  DateInput
} from 'react-admin';
import TextFieldBool from '../controls/TextFieldBool';
import ImageArrayField from '../controls/imagearrayfield';
import InputSpaceField from '../controls/InputSpaceField';
import DeviceShow from './deviceshow';
import moment from 'moment';
import _ from 'lodash';

export const DeviceFilter = props => (
    <Filter {...props}>
        <TextInput label="搜索设备id" source="deviceid_q" />
        <ReferenceInput label="用户" source="creator" reference="user" addLabel={false}>
           <SelectInput optionText="username" />
       </ReferenceInput>
    </Filter>
);

const DeviceuserTitle = ({ record }) => {
    console.log("record=>" + JSON.stringify(record));
   return <span>编辑 设备</span>;
};

const TextFieldDate = ({ source, record = {} }) => <span>{
  moment(record[source]).format('YYYY-MM-DD')
}</span>;
TextFieldDate.defaultProps = {
    addLabel: true,
};

const DeviceuserEdit = (props) => {
      return (<Edit title={<DeviceuserTitle />} {...props}>
        <TabbedForm>
          <FormTab label="设备设置">
            <TextInput label="设备编号" source="syssettings.deviceid" />
            <DateInput label="购买日期" source="syssettings.buydate" />
            <DateInput label="安装日期" source="syssettings.installdate"  />
            <TextInput label="安装人员" source="syssettings.installer"  />
            <TextField label="时区" source="syssettings.timezone"  />
          </FormTab>
          <FormTab label="基本信息">
            <ReferenceInput label="经销商" source="distributorid" reference="distributor" allowEmpty>
                <SelectInput optionText="name" />
            </ReferenceInput>
            <TextInput label="用户名" source="basicinfo.username" />
            <TextInput label="联系方式" source="basicinfo.userphone" />
            <TextInput label="用户地址" source="basicinfo.useraddress"  />
            <TextInput label="使用性质" source="basicinfo.useproperty"  />
            <TextInput label="房屋类型" source="basicinfo.building"  />
            <TextInput label="楼层高度" source="basicinfo.floor"  />
            <TextInput label="预装型号" source="basicinfo.model"  />
            <TextInput label="储水桶型号" source="basicinfo.bucket"  />
          </FormTab>
          <FormTab label="用水信息">
            <TextInput label="月用水量（吨）" source="usewater.quantity" />
            <TextInput label="用水人数（人）" source="usewater.persons" />
            <TextInput label="直饮水点（个）" source="usewater.spot"  />
            <TextInput label="水压" source="usewater.watergage"  />
            <NullableBooleanInput label="需装增压泵" source="usewater.booster"  />
            <SelectInput label="进水水源"  source="usewater.source" choices={[
                { id: '地下水', name: '地下水' },
                { id: '市政水', name: '市政水' },
            ]} />
            <TextInput label="卫浴间数量" source="usewater.bathrooms"  />
            <NullableBooleanInput label="是否分流" source="usewater.shunt"  />
            <TextInput label="用户需求出水TDS值" source="usewater.usertds"  />
          </FormTab>
          <FormTab label="安装环境">
            <TextInput label="安装地点" source="install.position" />
            {/* <TextInput label="是否避光" source="install.avoidlight" /> */}
            <NullableBooleanInput label="是否避光" source="install.avoidlight" />
            <TextInput label="墙体材料" source="install.wall"  />
            <TextInput label="主机安装方式" source="install.method"  />
            <InputSpaceField label="安装空间" source="install.space"  />
            <TextInput label="进水管径大小" source="install.pipe"  />
            <TextInput label="排水距离" source="install.drainage"  />
            <TextInput label="管路材质" source="install.pipematerials"  />
            {/* <TextInput label="有无WIFI" source="install.wifi"  /> */}
            <NullableBooleanInput label="有无WIFI" source="install.wifi"  />
            {/* <TextInput label="有无电源" source="install.power"  /> */}
            <NullableBooleanInput label="有无电源" source="install.power"  />
        </FormTab>
          <FormTab label="安装检查表">
            <TextFieldBool label="滤芯已冲洗" source="checklist.washed" />
            <TextFieldBool label="进水压力已符合标准" source="checklist.uptostandard" />
            <TextFieldBool label="旁通已关闭" source="checklist.bypassclosed"  />
            <TextFieldBool label="系统无泄漏" source="checklist.noleakage"  />
            <TextFieldBool label="WIFI已连接" source="checklist.wificonnected"  />
            <TextFieldBool label="是否启用" source="checklist.appset" />
            <TextFieldBool label="进水流量正常" source="checklist.discharge" />
            <TextFieldBool label="设备已调试" source="checklist.debugged" />
            <TextFieldBool label="出水水质正常" source="checklist.quality"  />
            <TextFieldBool label="设备已交付使用" source="checklist.delivered"  />
            <ImageArrayField label="拍摄安装图" source="checklist.pictures"  />
          </FormTab>
          <FormTab label="设备清单">
          <SelectInput label="前置滤芯1"  source="appdata.filterlist.prev0" choices={[
                { id: 0, name: '无' },
                { id: 1, name: 'PP滤芯(30天)' },
                { id: 2, name: 'PP滤芯(60天)' },
                { id: 3, name: 'PP滤芯(90天)' }
            ]} />
             <SelectInput label="前置滤芯2"  source="appdata.filterlist.prev1" choices={[
                { id: 0, name: '无' },
                { id: 1, name: '活性炭(30天)' },
                { id: 2, name: '活性炭(60天)' }
            ]} />
             <SelectInput label="前置滤芯3"  source="appdata.filterlist.prev2" choices={[
                { id: 0, name: '无' },
                { id: 1, name: 'TAC滤芯(180天)' },
                { id: 2, name: 'TAC滤芯(360天)' }
            ]} />
           <SelectInput label="后置滤芯1"  source="appdata.filterlist.post0" choices={[
                { id: 0, name: '无' },
                { id: 1, name: 'LED UVC(180天)' },
                { id: 2, name: 'LED UVC(360天)' },
                { id: 3, name: 'LED UVC(540天)' }
            ]} />
            <SelectInput label="后置滤芯2"  source="appdata.filterlist.post1" choices={[
                { id: 0, name: '无' },
                { id: 1, name: 'AFC滤芯(180天)' }
            ]} />
             <SelectInput label="后置滤芯3"  source="appdata.filterlist.post2" choices={[
                { id: 0, name: '无' }
            ]} />
          <DateInput label="前置1安装日期" source="devicelist.prev0lastchangedate"  />
          <DateInput label="前置2安装日期" source="devicelist.prev1lastchangedate"  />
          <DateInput label="前置3安装日期" source="devicelist.prev2lastchangedate"  />
          <DateInput label="后置1安装日期" source="devicelist.post0lastchangedate"  />
          <DateInput label="后置2安装日期" source="devicelist.post1lastchangedate"  />
          <DateInput label="后置3安装日期" source="devicelist.post2lastchangedate"  />
          <TextInput label="主机" source="devicelist.host"  />
          <TextInput label="其他" source="devicelist.others"  />
          <TextInput label="阀门" source="devicelist.pipefittings.valve"  />
          <TextInput label="活接" source="devicelist.pipefittings.connection"  />
          <TextInput label="弯头" source="devicelist.pipefittings.elbow"  />
          <TextInput label="三通" source="devicelist.pipefittings.triplet"  />
          <TextInput label="对丝" source="devicelist.pipefittings.silkpair"  />
          <TextInput label="丝转" source="devicelist.pipefittings.silkspin"  />
          <TextInput label="其他" source="devicelist.pipefittings.others"  />
          <TextInput label="其他配置" source="devicelist.configuration"  />
          <TextInput label="管路材质" source="devicelist.materials"  />
          </FormTab>
        </TabbedForm>
      </Edit>);

};
// <FormTab label="网络">
//   <TextInput label="wifissid" source="wifisettings.ssid" />
//   <TextInput label="wifi密码" source="wifisettings.password" />
//   <TextInput label="动态主机协议" source="wifisettings.dhcp"  />
//   <TextInput label="IP地址" source="wifisettings.ip"  />
//   <TextInput label="网关" source="wifisettings.gateway"  />
//   <TextInput label="局域网" source="wifisettings.lan"  />
//   <TextInput label="主域服务器" source="wifisettings.dns"  />
// </FormTab>

const TextDeviceId = ({ source, record = {} }) => <span>{
   _.get(record,"deviceid") || _.get(record,"syssettings.deviceid") || ''
}</span>;


const DeviceuserList = (props) => (//
     <List title="设备列表" {...props} filters={<DeviceFilter />} bulkActionButtons={false}
      sort={{ field: 'created_at', order: 'DESC' }}>
      <Datagrid>
          <TextDeviceId label="设备id" source="deviceid" />
          <TextField label="设备ID" source="syssettings.deviceid" />
          <ReferenceField label="经销商" source="distributorid" reference="distributor" allowEmpty>
              <TextField source="name" />
          </ReferenceField>
          <TextField label="用户名" source="basicinfo.username" />
          <EditButton />
          </Datagrid>
    </List>
);


export  {DeviceuserList,DeviceuserEdit};

import React from 'react';
import { List } from 'react-admin';

import {
  BooleanField,
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
  DateField
} from 'react-admin';


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

const DeviceuserEdit = (props) => {
      return (<Edit title={<DeviceuserTitle />} {...props}>
        <TabbedForm>
          <FormTab label="基本信息">
            <ReferenceInput label="经销商" source="distributorid" reference="distributor" allowEmpty>
                <SelectInput optionText="name" />
            </ReferenceInput>
            <TextInput label="用户名" source="basicinfo.username" />
            <TextInput label="联系方式" source="basicinfo.phone" />
            <TextInput label="用户地址" source="basicinfo.useraddress"  />
            <TextInput label="使用性质" source="basicinfo.useproperty"  />
            <TextInput label="房屋类型" source="basicinfo.building"  />
            <TextInput label="楼层高度" source="basicinfo.floor"  />
            <TextInput label="预装型号" source="basicinfo.model"  />
          </FormTab>
          <FormTab label="用水信息">
            <TextInput label="月用水量（吨）" source="usewater.quantity" />
            <TextInput label="用水人数（人）" source="usewater.persons" />
            <TextInput label="直饮水点（个）" source="usewater.spot"  />
            <TextInput label="水压" source="usewater.watergage"  />
            <TextInput label="需装增压泵" source="usewater.booster"  />
            <TextInput label="卫浴间数量" source="usewater.bathrooms"  />
            <TextInput label="是否分流" source="usewater.shunt"  />
            <TextInput label="原水TDS值" source="usewater.tds"  />
            <TextInput label="原水导电率" source="usewater.conductivity"  />
            <TextInput label="原水硬度(ppm)" source="usewater.hardness"  />
            <TextInput label="原水碱度(ppm)" source="usewater.alkalinity"  />
            <TextInput label="ph值" source="usewater.ph"  />
            <TextInput label="用户需求出水TDS值" source="usewater.usertds"  />
          </FormTab>
          <FormTab label="安装信息">
            <TextInput label="安装地点" source="install.position" />
            <TextInput label="是否避光" source="install.avoidlight" />
            <TextInput label="墙体材料" source="install.wall"  />
            <TextInput label="主机安装方式" source="install.method"  />
            <TextInput label="安装空间" source="install.space"  />
            <TextInput label="进水管径大小" source="install.pipe"  />
            <TextInput label="排水距离" source="install.drainage"  />
            <TextInput label="管路材质" source="install.pipematerials"  />
            <TextInput label="有无WIFI" source="install.wifi"  />
            <TextInput label="有无电源" source="install.power"  />
        </FormTab>
          <FormTab label="系统设置">
            <TextInput label="设备编号" source="syssettings.deviceid" />
            <TextField label="购买日期" source="syssettings.buydate" />
            <TextField label="安装日期" source="syssettings.installdate"  />
            <TextField label="安装人员" source="syssettings.installer"  />
            <TextField label="时区" source="syssettings.timezone"  />
            <TextField label="复位日期" source="syssettings.sdate"  />
            <TextField label="复位时间" source="syssettings.stime"  />
            <TextInput label="语言" source="syssettings.language"  />
          </FormTab>
          <FormTab label="进水设定">
            <TextInput label="PH值" source="inwatersettings.ph" />
            <TextInput label="进水导电率" source="inwatersettings.conductivity" />
            <TextInput label="进水TDS值" source="inwatersettings.tds"  />
            <TextInput label="进水硬度" source="inwatersettings.hardness"  />
            <TextField label="时区" source="inwatersettings.alkalinity"  />
            <TextInput label="储水桶型号" source="inwatersettings.bucket"  />
          </FormTab>
          <FormTab label="安装检查表">
            <TextField label="滤芯已冲洗" source="checklist.washed" />
            <TextField label="进水压力已符合标准" source="checklist.uptostandard" />
            <TextField label="旁通已关闭" source="checklist.bypassclosed"  />
            <TextField label="系统无泄漏" source="checklist.noleakage"  />
            <TextField label="WIFI已连接" source="checklist.wificonnected"  />
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


const DeviceuserList = (props) => (//
     <List title="设备列表" {...props} filters={<DeviceFilter />} sort={{ field: 'created_at', order: 'DESC' }}>
        <Datagrid>
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

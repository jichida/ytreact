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
            <TextField label="用户名" source="basicinfo.username" />
            <TextField label="联系方式" source="basicinfo.phone" />
            <TextField label="用户地址" source="basicinfo.useraddress"  />
            <TextField label="使用性质" source="basicinfo.useproperty"  />
            <TextField label="房屋类型" source="basicinfo.building"  />
            <TextField label="楼层高度" source="basicinfo.floor"  />
            <TextField label="预装型号" source="basicinfo.model"  />
          </FormTab>
          <FormTab label="用水信息">
            <TextField label="月用水量（吨）" source="usewater.quantity" />
            <TextField label="用水人数（人）" source="usewater.persons" />
            <TextField label="直饮水点（个）" source="usewater.spot"  />
            <TextField label="水压" source="usewater.watergage"  />
            <TextField label="需装增压泵" source="usewater.booster"  />
            <TextField label="卫浴间数量" source="usewater.bathrooms"  />
            <TextField label="是否分流" source="usewater.shunt"  />
            <TextField label="原水TDS值" source="usewater.tds"  />
            <TextField label="原水导电率" source="usewater.conductivity"  />
            <TextField label="原水硬度(ppm)" source="usewater.hardness"  />
            <TextField label="原水碱度(ppm)" source="usewater.alkalinity"  />
            <TextField label="ph值" source="usewater.ph"  />
            <TextField label="用户需求出水TDS值" source="usewater.usertds"  />
          </FormTab>
          <FormTab label="安装信息">
            <TextField label="安装地点" source="install.position" />
            <TextField label="是否避光" source="install.avoidlight" />
            <TextField label="墙体材料" source="install.wall"  />
            <TextField label="主机安装方式" source="install.method"  />
            <TextField label="安装空间" source="install.space"  />
            <TextField label="进水管径大小" source="install.pipe"  />
            <TextField label="排水距离" source="install.drainage"  />
            <TextField label="管路材质" source="install.pipematerials"  />
            <TextField label="有无WIFI" source="install.wifi"  />
            <TextField label="有无电源" source="install.power"  />
        </FormTab>
          <FormTab label="系统设置">
            <TextField label="设备编号" source="syssettings.deviceid" />
            <TextField label="购买日期" source="syssettings.buydate" />
            <TextField label="安装日期" source="syssettings.installdate"  />
            <TextField label="安装人员" source="syssettings.installer"  />
            <TextField label="时区" source="syssettings.timezone"  />
            <TextField label="复位日期" source="syssettings.sdate"  />
            <TextField label="复位时间" source="syssettings.stime"  />
            <TextField label="语言" source="syssettings.language"  />
          </FormTab>
          <FormTab label="进水设定">
            <TextField label="PH值" source="inwatersettings.ph" />
            <TextField label="进水导电率" source="inwatersettings.conductivity" />
            <TextField label="进水TDS值" source="inwatersettings.tds"  />
            <TextField label="进水硬度" source="inwatersettings.hardness"  />
            <TextField label="时区" source="inwatersettings.alkalinity"  />
            <TextField label="储水桶型号" source="inwatersettings.bucket"  />
          </FormTab>
          <FormTab label="网络">
            <TextField label="wifissid" source="wifisettings.ssid" />
            <TextField label="wifi密码" source="wifisettings.password" />
            <TextField label="动态主机协议" source="wifisettings.dhcp"  />
            <TextField label="IP地址" source="wifisettings.ip"  />
            <TextField label="网关" source="wifisettings.gateway"  />
            <TextField label="局域网" source="wifisettings.lan"  />
            <TextField label="主域服务器" source="wifisettings.dns"  />
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



const DeviceuserList = (props) => (//
     <List title="设备列表" {...props} filters={<DeviceFilter />} sort={{ field: 'created_at', order: 'DESC' }}>
        <Datagrid>
          <TextField source="syssettings.deviceid" />
           <TextField source="wifisettings.ssid" />
           <DateField source="inwatersettings.ph" />
           <BooleanField source="checklist.discharge" />
           <TextField source="basicinfo.username" />
           <DateField source="usewater.quantity" />
           <TextField source="install.position" />
           <DateField source="username" />
          <EditButton />
        </Datagrid>
    </List>
);


export  {DeviceuserList,DeviceuserEdit};

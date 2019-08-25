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
// import TextFieldBool from '../controls/TextFieldBool';
// import ImageArrayField from '../controls/imagearrayfield';
import InputSpaceField from '../controls/InputSpaceField';
// import DeviceShow from './deviceshow';
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

const SurveyTitle = ({ record }) => {
    console.log("record=>" + JSON.stringify(record));
   return <span>编辑 调研</span>;
};

const TextFieldDate = ({ source, record = {} }) => <span>{
  moment(record[source]).format('YYYY-MM-DD')
}</span>;
TextFieldDate.defaultProps = {
    addLabel: true,
};

const SurveyEdit = (props) => {
      return (<Edit title={<SurveyTitle />} {...props}>
        <TabbedForm>
          <FormTab label="设备设置">
            <TextInput label="设备编号" source="name" />
            <TextField label="时间" source="create_at" />
            <ReferenceInput label="安装人员" source="installerid" reference="installer">
                <SelectInput optionText="username" />
            </ReferenceInput>
          </FormTab>
          <FormTab label="基本信息">
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



const SurveyList = (props) => (//
     <List title="调研列表" {...props} filters={<DeviceFilter />} bulkActionButtons={false}
      sort={{ field: 'created_at', order: 'DESC' }}>
      <Datagrid>
          <TextField label="调研名" source="name" />
          <TextField label="时间" source="create_at" />
          <ReferenceField label="安装人员" source="installerid" reference="installer">
              <TextField source="username" />
          </ReferenceField>
          <EditButton />
          </Datagrid>
    </List>
);


export  {SurveyList,SurveyEdit};

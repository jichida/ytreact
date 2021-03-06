import React from 'react';
import { List } from 'react-admin';

import {

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
  moment(record[source]).format('YYYY-MM-DD HH:mm:ss')
}</span>;
TextFieldDate.defaultProps = {
    addLabel: true,
};

const SurveyEdit = (props) => {
      return (<Edit title={<SurveyTitle />} {...props}>
        <TabbedForm>
          <FormTab label="设备设置">
            <TextInput label="调研名称" source="name" />
            <TextFieldDate label="调研新建时间" source="create_at" />
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
            <TextInput label="月用水量（吨）（中）" source="usewater.quantity_en" />
            <TextInput label="月用水量（GAL）（英）" source="usewater.quantity_cn" />
            <TextInput label="用水人数（人）" source="usewater.persons" />
            <TextInput label="直饮水点（个）" source="usewater.spot"  />
            <TextInput label="水压" source="usewater.watergage"  />
            <SelectInput label="需装增压泵"  source="usewater.booster" choices={[
                { id: false, name: '不需要' },
                { id: true, name: '需要' }            ]} />
            <SelectInput label="进水水源"  source="usewater.source" choices={[
                { id: 'ground', name: '地下水' },
                { id: 'municipal', name: '市政水' },
            ]} />
            <TextInput label="卫浴间数量" source="usewater.bathrooms"  />
            <SelectInput label="是否分流"  source="usewater.shunt" choices={[
                { id: false, name: '否' },
                { id: true, name: '是' }            ]} />
            <TextInput label="用户需求出水TDS值" source="usewater.usertds"  />
          </FormTab>
          <FormTab label="安装环境">
            <TextInput label="安装地点" source="install.position" />
            {/* <TextInput label="是否避光" source="install.avoidlight" /> */}
            <SelectInput label="是否避光"  source="install.avoidlight" choices={[
                { id: false, name: '否' },
                { id: true, name: '是' }            ]} />
            <TextInput label="墙体材料" source="install.wall"  />
            <TextInput label="主机安装方式" source="install.method"  />
            <InputSpaceField label="安装空间(中)" source="install.space_cn"  />
            <InputSpaceField label="安装空间(英)" source="install.space_en"  />
            <TextInput label="进水管径大小" source="install.pipe"  />
            <TextInput label="排水距离" source="install.drainage"  />
            <TextInput label="管路材质" source="install.pipematerials"  />
            {/* <TextInput label="有无WIFI" source="install.wifi"  /> */}
            <SelectInput label="有无WIFI"  source="install.wifi" choices={[
                { id: false, name: '无' },
                { id: true, name: '有' }            ]} />
            {/* <TextInput label="有无电源" source="install.power"  /> */}
            <SelectInput label="有无电源"  source="install.power" choices={[
                { id: false, name: '无' },
                { id: true, name: '有' }            ]} />
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
          <TextField label="调研名称" source="name" />
          <TextFieldDate label="调研新建时间" source="create_at" />
          <ReferenceField label="安装人员" source="installerid" reference="installer">
              <TextField source="username" />
          </ReferenceField>
          <EditButton />
          </Datagrid>
    </List>
);


export  {SurveyList,SurveyEdit};

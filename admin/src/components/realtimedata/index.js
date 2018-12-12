import React from 'react';
import { List } from 'react-admin';
import {
  Edit,
  SimpleForm,
  DisabledInput,
  TextInput,
  Datagrid,
  TextField,
  DateField,
  EditButton,
  BooleanInput,
  Filter,
} from 'react-admin';


export const DataFilter = props => (
    <Filter {...props}>
        <TextInput label="搜索设备id" source="deviceid_q" />
    </Filter>
);


const RealtimedatalistTitle = ({ record }) => {
    console.log("record=>" + JSON.stringify(record));
   return <span>设备数据</span>;
};

const RealtimedatalistEdit = (props) => {
      return (<Edit title={<RealtimedatalistTitle />} {...props}>
          <SimpleForm>
            <DisabledInput label="Id" source="id" />
            <DisabledInput label="IP地址" source="ipaddr" />
            <DisabledInput label="省" source="provice" />
            <DisabledInput label="市" source="city" />

            <DisabledInput label="结果" source="name" />
            <DateField label="更新时间" source="updated_at" showTime />
            <BooleanInput label="是否获取到数据" source="getdata" defaultValue={true} />
          </SimpleForm>
      </Edit>);
};



const RealtimedatalistList = (props) => (//
     <List title="设备数据列表" {...props} filters={<DataFilter />} sort={{ field: 'updated_at', order: 'DESC' }}>
        <Datagrid>
            <TextField label="结果" source="name" />
            <TextField label="设备ID" source="deviceid" />
            <DateField label="更新时间" source="updated_at" showTime />
            <TextField label="IP地址" source="ipaddr" />
          <EditButton />
        </Datagrid>
    </List>
);


export  {RealtimedatalistList,RealtimedatalistEdit};

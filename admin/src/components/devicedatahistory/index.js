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
  ReferenceField,
  DateInput,
  Filter,
  SimpleForm
} from 'react-admin';
import DeviceShow from './deviceshow';
import moment from 'moment';
import _ from 'lodash';


export const DataFilter = props => (
    <Filter {...props}>
        <TextInput label="搜索设备id" source="deviceid_q" />
        <DateInput label="起始时间" source="updated_at_gte" />
        <DateInput label="结束时间" source="updated_at_lte" />
    </Filter>
);


const DevicedatahistoryTitle = ({ record }) => {
    console.log("record=>" + JSON.stringify(record));
   return <span>设备历史数据</span>;
};

const DevicedatahistoryEdit = (props) => {
      return (<Edit title={<DevicedatahistoryTitle />} {...props}>
        <SimpleForm>
        <TextDeviceId label="设备id" source="deviceid" />
        <TextFieldDate label="最新数据" source="updated_at" />
        <TextField label="这个下面填充数据" source="srvdata.Pressure3" />

        </SimpleForm>
      </Edit>);
};

const TextDeviceId = ({ source, record = {} }) => <span>{
  _.get(record,"deviceid")
}</span>;

const TextFieldDate = ({ source, record = {} }) => <span>{
  moment(record[source]).format('YYYY-MM-DD HH:mm:ss')
}</span>;
const DevicedatahistoryList = (props) => (//
     <List title="设备历史数据列表" {...props} filters={<DataFilter /> } bulkActionButtons={false}
     sort={{ field: 'updated_at', order: 'DESC' }}>
     <Datagrid>
       <TextDeviceId label="设备id" source="deviceid" />
       <TextFieldDate label="最新数据" source="updated_at" />
       <EditButton />
       </Datagrid>
    </List>
);


export  {DevicedatahistoryList,DevicedatahistoryEdit};

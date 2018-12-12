import React from 'react';
import { List } from 'react-admin';

import {
  Edit,
  SimpleForm,
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
          <SimpleForm>
               <TextField label="设备名字" source="devicename" />
               <ReferenceField label="用户" source="creator" reference="user"  addLabel={true} allowEmpty>
                  <TextField source="username" />
               </ReferenceField>
               <TextField label="设备ID" source="deviceid" />
               <TextField label="设备型号" source="devicemodel" />
               <TextField label="设备品牌" source="devicebrand" />

               <TextField label="当前总量(lr)" source="lr" />
               <TextField label="当前原水" source="cu_y" />
               <TextField label="当前净水" source="cu_j" />
               <TextField label="cleanCount(l0)" source="cleanCount.fv_l0" />
               <TextField label="cleanCount(lx)" source="cleanCount.fv_lx" />

               <ReferenceField label="设备实时数据" source="realtimedata" reference="realtimedata" addLabel={true}  allowEmpty>
                  <DateField label="最后更新时间" source="updated_at" showTime />
               </ReferenceField>
              <DateField label="新建时间" source="created_at" showTime />
          </SimpleForm>
      </Edit>);

};



const DeviceuserList = (props) => (//
     <List title="设备列表" {...props} filters={<DeviceFilter />} sort={{ field: 'created_at', order: 'DESC' }}>
        <Datagrid>
            <TextField label="设备名字" source="devicename" />
            <TextField label="是否获取到数据" source="getdata" />
            <ReferenceField label="用户" source="creator" reference="user" addLabel={false} allowEmpty>
              <TextField source="username" />
            </ReferenceField>
            <TextField label="设备ID" source="deviceid" />
            <ReferenceField label="设备实时数据" source="realtimedata" reference="realtimedata" addLabel={false}  allowEmpty>
               <DateField label="最后更新时间" source="updated_at" showTime />
            </ReferenceField>
            <DateField label="新建时间" source="created_at" showTime />
          <EditButton />
        </Datagrid>
    </List>
);


export  {DeviceuserList,DeviceuserEdit};

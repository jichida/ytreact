import React from 'react';
import { List } from 'react-admin';

import {

  Edit,
  SimpleForm,
  Create,
  TextInput,
  // Show,
  // SimpleShowLayout,

  Datagrid,
  TextField,
  // DateField,
  EditButton,

  // ImageField,
  Filter
} from 'react-admin';

// import {Titlewithimage} from '../controls/Titlewithimage';



export const UserFilter = props => (
    <Filter {...props}>
         <TextInput label="搜索用户" source="username_q" />
    </Filter>
);

const UserriderlistTitle = ({ record }) => {
   return <span>显示 用户</span>;
};

const InstallerCreate = (props) => {
      return (<Create {...props} >
           <SimpleForm redirect="list">
            <TextInput label="手机号"  source="username" />
           </SimpleForm>
       </Create>);
};

const InstallerEdit = (props) => {
      return (<Edit title={<UserriderlistTitle />} {...props}>
          <SimpleForm>
              <TextInput label="手机号"  source="username" />
          </SimpleForm>
      </Edit>);

};


const InstallerList = (props) => (//
     <List title="用户列表" {...props}  filters={<UserFilter />} sort={{ field: 'created_at', order: 'DESC' }}>
        <Datagrid>
          <TextField source="username"  label="登录名"/>
        <EditButton />
        </Datagrid>
    </List>
);


export  {InstallerList,InstallerEdit,InstallerCreate};

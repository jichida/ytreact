import React from 'react';
import { List } from 'react-admin';
// import { CardActions } from '@material-ui/Card';
// import FlatButton from '@material-ui/FlatButton';
//import NavigationRefresh from '@material-ui/svg-icons/navigation/refresh';
import {

  ReferenceInput,
  Create,
  Edit,
  SimpleForm,

  TextInput,
  // Show,
  // SimpleShowLayout,
  SelectField,
  Datagrid,
  // DeleteButton,
  TextField,
  ReferenceField,
  EditButton,
  SelectInput,
  // BooleanInput,
  // BooleanField,
  // ImageField
} from 'react-admin';
// import { NodeActions } from 'ra-tree-ui-materialui';

// const AddressconstActions = props => (
//     <NodeActions {...props}>
//         <EditButton />
//         <DeleteButton />
//     </NodeActions>
// );

const AddressconstcreateTitle = ({ record }) => {
   return <span>新建 城市</span>;
};
const AddressconstCreate = (props) => (
       <Create {...props} title={<AddressconstcreateTitle />} >
           <SimpleForm>
             <TextInput label="编码" source="adcode" validation={{ required: true }}/>
             <TextInput label="名字" source="name" validation={{ required: true }}/>
             <ReferenceInput label="上级" source="parent_id" reference="addressconst" allowEmpty>
                 <SelectInput optionText="name" />
             </ReferenceInput>
             <SelectInput label="类型"  source="type" choices={[
                 { id: 'province', name: '省' },
                 { id: 'city', name: '市' },
                 { id: 'county', name: '区' },
             ]} />
             <TextInput label="层级" source="level" validation={{ required: true }}/>
           </SimpleForm>
       </Create>
);


const AddressconstTitle = ({ record }) => {
   return <span>编辑 城市信息</span>;
};

const AddressconstEdit = (props) => {
      return (<Edit title={<AddressconstTitle />} {...props}>
          <SimpleForm>
            <TextInput label="编码" source="adcode" validation={{ required: true }}/>
            <TextInput label="名字" source="name" validation={{ required: true }}/>
            <ReferenceInput  label="上级"  source="parent_id" reference="addressconst" allowEmpty>
                <SelectInput optionText="name" />
            </ReferenceInput>
            <SelectInput label="类型"  source="type" choices={[
                { id: 'province', name: '省' },
                { id: 'city', name: '市' },
                { id: 'county', name: '区' },
            ]} />
             <TextInput label="层级" source="level" validation={{ required: true }}/>
          </SimpleForm>
      </Edit>);

};


const AddressconstList = (props) => (//
     <List {...props} >
       <Datagrid>
       <TextField label="编码" source="adcode" />
       <TextField label="名字" source="name" />
       <SelectField label="类型"  source="type" choices={[
           { id: 'province', name: '省' },
           { id: 'city', name: '市' },
           { id: 'county', name: '区' },
       ]} />
       <ReferenceField label="上级" source="parent_id" reference="addressconst" addLabel={false} allowEmpty>
          <TextField source="name" />
       </ReferenceField>
       <EditButton />
       </Datagrid>
    </List>
);


//
// const AddressconstList = (props) => (//
//      <List {...props} perPage={10000}>
//        <Tree>
//            <NodeView actions={<AddressconstActions />}>
//                <TextField source="name" />
//            </NodeView>
//        </Tree>
//     </List>
// );


export  {AddressconstCreate,AddressconstList,AddressconstEdit};

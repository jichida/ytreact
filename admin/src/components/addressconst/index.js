import React from 'react';
import { List } from 'react-admin';
import _ from 'lodash';
// import { CardActions } from '@material-ui/Card';
// import FlatButton from '@material-ui/FlatButton';
//import NavigationRefresh from '@material-ui/svg-icons/navigation/refresh';
import {

  ReferenceInput,
  Create,
  Edit,
  SimpleForm,

  TextInput,
  FormDataConsumer,
  // Show,
  // SimpleShowLayout,
  // SelectField,
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
             <TextInput label="名字" source="name" validation={{ required: true }}/>
             <ReferenceInput label="上级" source="parent_id" reference="addressconst" allowEmpty>
                 <SelectInput optionText="name" />
             </ReferenceInput>
           </SimpleForm>
       </Create>
);


const AddressconstTitle = ({ record }) => {
   return <span>编辑 城市信息</span>;
};

const AddressconstEdit = (props) => {
      return (<Edit title={<AddressconstTitle />} {...props}>
          <SimpleForm>
            <TextInput label="名字" source="name" validation={{ required: true }}/>
            <ReferenceInput  label="上级"  source="parent_id" reference="addressconst" allowEmpty>
                <SelectInput optionText="name" />
            </ReferenceInput>
            <FormDataConsumer>
               {({ formData, ...rest }) => formData.parent_id === '5c11e0d340dc7d07eacf33a6' &&
                  [
                    <TextInput label="高"  source="top" {...rest} />,
                    <TextInput label="左"  source="left" {...rest} />
                  ]
               }
           </FormDataConsumer>
          </SimpleForm>
      </Edit>);

};

const EditBtnif = (props)=>{
  const {record} = props;
  return _.get(record,'id',false) !== "5c11e0d340dc7d07eacf33a6" ?<EditButton {...props}/>:null;
}

const rowStyle = (record, index) => ({
    backgroundColor: _.get(record,'id',false) === "5c11e0d340dc7d07eacf33a6" ? '#efe' : 'white',
});


const AddressconstList = (props) => (//
     <List {...props} bulkActionButtons={false} >
       {/* bodyOptions={{ showRowHover: true }} */}
       <Datagrid  rowStyle={rowStyle}>
       <TextField label="名字" source="name" />
       <ReferenceField label="上级" source="parent_id" reference="addressconst" addLabel={false} allowEmpty>
          <TextField source="name" />
       </ReferenceField>
       <EditBtnif />
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

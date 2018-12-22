import React from 'react';
import { List } from 'react-admin';

import {

  Edit,
  SimpleForm,
  ReferenceInput,
  ReferenceField,
  TextInput,
  Create,
  FormDataConsumer,
  Datagrid,
  TextField,
  // DateField,
  EditButton,
  SelectInput,
  // ImageField,
  Filter
} from 'react-admin';

// import {Titlewithimage} from '../controls/Titlewithimage';



export const UserFilter = props => (
    <Filter {...props}>
         <TextInput label="搜索用户" source="name_q" />
    </Filter>
);


const DistributorCreate = (props) => {
      return (<Create {...props} >
           <SimpleForm redirect="list">
             <TextInput label="登录名" source="username" validation={{ required: true }}/>
             <TextInput label="名字" source="name" validation={{ required: true }}/>
             <TextInput label="简称" source="logname" validation={{ required: true }}/>
             <ReferenceInput label="所属区域" source="addresslevel1" reference="addressconst" allowEmpty
               filter={{ parent_id: "5c11e0d340dc7d07eacf33a6" }}>
                 <SelectInput optionText="name" />
             </ReferenceInput>

             <FormDataConsumer>
                {({ formData, ...rest }) =>
                    <ReferenceInput label="所属子区域" source="addresslevel2" reference="addressconst" allowEmpty
                      filter={{ parent_id: formData.addresslevel1 }} {...rest}>
                        <SelectInput optionText="name" />
                    </ReferenceInput>
                }
            </FormDataConsumer>
           </SimpleForm>
       </Create>);
};

const DistributorEdit = (props) => {
      return (<Edit {...props}>
          <SimpleForm>
            <TextInput label="登录名" source="username" validation={{ required: true }}/>
            <TextInput label="名字" source="name" validation={{ required: true }}/>
            <TextInput label="简称" source="logname" validation={{ required: true }}/>
            <ReferenceInput label="所属区域" source="addresslevel1" reference="addressconst" allowEmpty
                filter={{ parent_id: "5c11e0d340dc7d07eacf33a6" }}>
                  <SelectInput optionText="name" />
              </ReferenceInput>

              <FormDataConsumer>
                 {({ formData, ...rest }) =>
                     <ReferenceInput label="所属子区域" source="addresslevel2" reference="addressconst" allowEmpty
                       filter={{ parent_id: formData.addresslevel1 }} {...rest}>
                         <SelectInput optionText="name" />
                     </ReferenceInput>
                 }
             </FormDataConsumer>
          </SimpleForm>
      </Edit>);

};


const DistributorList = (props) => (//
     <List title="经销商列表" {...props}  filters={<UserFilter />} sort={{ field: 'created_at', order: 'DESC' }}>
        <Datagrid>
        <TextField label="登录名" source="username"/>
        <TextField label="名字" source="name"/>
        <TextField label="简称" source="logname"/>
        <ReferenceField label="所属区域" source="addresslevel1" reference="addressconst" allowEmpty>
            <TextField source="name" />
        </ReferenceField>
        <ReferenceField label="所属子区域" source="addresslevel2" reference="addressconst" allowEmpty>
            <TextField source="name" />
        </ReferenceField>
        <EditButton />
        </Datagrid>
    </List>
);


export  {DistributorList,DistributorEdit,DistributorCreate};

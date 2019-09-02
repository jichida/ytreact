import React from 'react';
import { List } from 'react-admin';
import _ from 'lodash';
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
  TabbedForm,
  FormTab,
  EditButton,
  SelectInput,
  // ImageField,
  Filter
} from 'react-admin';
import { BooleanInput } from 'react-admin';
import ResestPassword from './resetpassword';
// import {Titlewithimage} from '../controls/Titlewithimage';
import MarkdownInput from '../controls/MarkDownInputWithField';


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
             <TextInput label="初始密码" source="password" validation={{ required: true }}/>
             <TextInput label="手机" source="phone" validation={{ required: true }}/>
             <TextInput label="email" source="email" validation={{ required: true }}/>
             <TextInput label="简称" source="logname" validation={{ required: true }}/>
             <ReferenceInput label="所属区域(*)" source="addresslevel1" reference="addressconst"
               filter={{ parent_id: "5c11e0d340dc7d07eacf33a6" }} validation={{ required: true }}>
                 <SelectInput optionText="name" />
             </ReferenceInput>
             <BooleanInput label="是否管理员" source="is_admin" validation={{ required: true }} default={false}/>
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
        <TabbedForm>
          <FormTab label="基本信息">
            <TextInput label="登录名" source="username" validation={{ required: true }}/>
            <TextInput label="手机" source="phone" validation={{ required: true }}/>
            <TextInput label="email" source="email" validation={{ required: true }}/>
            <TextInput label="名字" source="name" validation={{ required: true }}/>
            <TextInput label="简称" source="logname" validation={{ required: true }}/>
            <ReferenceInput label="所属区域(*)" source="addresslevel1" reference="addressconst"
                filter={{ parent_id: "5c11e0d340dc7d07eacf33a6" }} validation={{ required: true }}>
                  <SelectInput optionText="name" />
              </ReferenceInput>
              <BooleanInput label="是否管理员" source="is_admin" validation={{ required: true }} default={false}/>

              <FormDataConsumer>
                 {({ formData, ...rest }) =>
                     <ReferenceInput label="所属子区域" source="addresslevel2" reference="addressconst" allowEmpty
                       filter={{ parent_id: formData.addresslevel1 }} {...rest}>
                         <SelectInput optionText="name" />
                     </ReferenceInput>
                 }
             </FormDataConsumer>
             </FormTab>
             <FormTab label="详细信息">
              <MarkdownInput label="内容" source="intro" />
             </FormTab>
              {/* <FormTab label="报警设置">
             <BooleanInput label="接受设备离线报警" source="alarmsettings.isrecvalaram_deviceoffline" validation={{ required: true }}/>
             <BooleanInput label="接受设备错误报警" source="alarmsettings.isrecvalaram_deviceerr" validation={{ required: true }}/>
             <BooleanInput label="接受滤芯到期报警" source="alarmsettings.isrecvalaram_filterexp" validation={{ required: true }}/>
             </FormTab> */}

             </TabbedForm>
      </Edit>);

};
const EditBtnif = (props)=>{
  const {record} = props;
  //如果是admin，OK
  if(_.get(record,'username','')!=='admin'){
    return <EditButton {...props}/>;
  }
  //如果是系统管理员
  return  _.get(record,'username','')!=='admin' ?<EditButton {...props}/>:null;
}

const rowStyle = (record, index) => ({
    backgroundColor: _.get(record,'username','')==='admin' ? '#efe' : 'white',
});


const DistributorList = (props) => (//
     <List title="经销商列表" {...props}  filters={<UserFilter />} sort={{ field: 'created_at', order: 'DESC' }}
     bulkActionButtons={false} >
       {/* bodyOptions={{ showRowHover: true }} */}
        <Datagrid  rowStyle={rowStyle}>
        <TextField label="登录名" source="username"/>
        <TextField label="名字" source="name"/>
        <TextField label="简称" source="logname"/>
        <ReferenceField label="所属区域" source="addresslevel1" reference="addressconst" allowEmpty>
            <TextField source="name" />
        </ReferenceField>
        <ReferenceField label="所属子区域" source="addresslevel2" reference="addressconst" allowEmpty>
            <TextField source="name" />
        </ReferenceField>
        <ResestPassword />
        <EditBtnif />
        </Datagrid>
    </List>
);


export  {DistributorList,DistributorEdit,DistributorCreate};

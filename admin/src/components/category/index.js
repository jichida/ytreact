import React from 'react';
import { List } from 'react-admin';
// import { CardActions } from '@material-ui/Card';
// import FlatButton from '@material-ui/FlatButton';
//import NavigationRefresh from '@material-ui/svg-icons/navigation/refresh';
import {

  NumberInput,
  Create,
  Edit,
  SimpleForm,

  TextInput,
  // Show,
  // SimpleShowLayout,

  Datagrid,
  TextField,

  EditButton,
  SelectInput,
  BooleanInput,
  // BooleanField,
  // ImageField,
  // DisabledInput,
  ReferenceInput,
  ReferenceField
} from 'react-admin';


import {ImageInputUpload} from '../controls/imageupload.js';
// import LinkToRelatedProducts from './LinkToRelatedProducts';
import config from '../../env/config';

const CategorycreateTitle = ({ record }) => {
   return <span>新建 类别</span>;
};
const CategoriesCreate = (props) => {
      return (<Create {...props} title={<CategorycreateTitle />} >
           <SimpleForm defaultValue={{ shopid:config.shopid }} redirect="list">
             <TextInput label="名字" source="name" validation={{ required: true }}/>
             <ReferenceInput label="父类别" source="parent_id" reference="category" allowEmpty>
                 <SelectInput optionText="name" />
             </ReferenceInput>
             <NumberInput label="排序字段"  source="sortflag" />
             <ImageInputUpload label="图片"  source="picurl" />
             <BooleanInput label="是否启用" source="isenabled" defaultValue={true} />
           </SimpleForm>
       </Create>);
};


const CategorylistTitle = ({ record }) => {
   return <span>编辑 类别信息</span>;
};

const CategoriesEdit = (props) => {
      console.log(props);
      return (<Edit title={<CategorylistTitle />} {...props}>
          <SimpleForm>
             <TextInput label="名字" source="name" validation={{ required: true }}/>
             <ReferenceField label="店铺" source="shopid" reference="shop" addLabel={true}>
                <TextField source="name" />
             </ReferenceField>
             <ReferenceInput label="父类别" source="parent_id" reference="category" allowEmpty>
                 <SelectInput optionText="name" />
             </ReferenceInput>
             <NumberInput label="排序字段"  source="sortflag" />
             <ImageInputUpload label="图片"  source="picurl" />
             <BooleanInput label="是否启用" source="isenabled" defaultValue={true} />
          </SimpleForm>
      </Edit>);

};

//
// const CategorylistShow = (props) => (
//        <Show title={<CategorylistTitle />} {...props}>
//            <SimpleShowLayout>
//                <TextField label="显示位置" source="showflag" />
//                 <ImageField source="picurl" label="图片"/>
//                 <TextField label="名字" source="name" />
//                <TextField label="排序字段" source="sortflag" />
//                <BooleanField label="是否启用" source="isenabled" />
//            </SimpleShowLayout>
//        </Show>
// );
//


const CategoriesList = (props) => (//
     <List title="类别信息列表" {...props} >
        <Datagrid>
          <ReferenceField label="店铺" source="shopid" reference="shop" allowEmpty>
             <TextField source="name" />
          </ReferenceField>
          <ReferenceField label="父类别" source="parent_id" reference="category" allowEmpty>
              <TextField source="name" />
          </ReferenceField>
          <TextField label="名字" source="name" />
        <EditButton />
        </Datagrid>
    </List>
);


export  {CategoriesList,CategoriesCreate,CategoriesEdit};

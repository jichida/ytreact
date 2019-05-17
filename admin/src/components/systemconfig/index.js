import React from "react";
import {
  required,
  FormTab,
  NumberInput,
  ReferenceInput,
  BooleanInput,
  SelectInput,
  TabbedForm,
  TextInput,
} from "react-admin";
import SingleRecordPage from "../singlerecordpage/index.js";
import {SaveButton, Toolbar } from 'react-admin';
// import ShowPageOne from '../singledocumentpage/index.js';
//
// const SystemconfigTitle = ({ record }) => <span>系统设置</span>;
//
// const SystemconfigCreateTitle = ({ record }) => {
//   return <span>新建 系统配置</span>;
// };
//
// const SystemconfigCreate = props => (
//   <Create {...props} title={<SystemconfigCreateTitle />}>
//     <TabbedForm>
//       <FormTab label="系统设置">
//         <NumberInput
//           label="每日积分额度"
//           source="pointlimitperday"
//           validate={required()}
//           style={{ width: "100%" }}
//         />
//       <ReferenceInput source="productcategoryid_hardware" reference="category" allowEmpty>
//           <SelectInput optionText="name" />
//       </ReferenceInput>
//       <ReferenceInput source="productcategoryid_point" reference="category"  allowEmpty>
//           <SelectInput optionText="name" />
//       </ReferenceInput>
//       </FormTab>
//       <FormTab label="resources.systemconfig.tabs.express">
//           <TextInput  label="快递查询URL" source="expressapiurl" />
//           <TextInput  label="快递查询用户号" source="expressapicustomer" />
//           <TextInput  label="快递查询APIKEY" source="expressapikey" />
//     </FormTab>
//     </TabbedForm>
//   </Create>
// );
//
// const SystemconfigEdit = props => (
//   <EditPage {...props} title={<SystemconfigTitle />}>
//   <TabbedForm>
//       <FormTab label="系统设置">
//         <NumberInput
//           label="每日积分额度"
//           source="pointlimitperday"
//           validate={required()}
//           style={{ width: "100%" }}
//         />
//       <ReferenceInput source="productcategoryid_hardware" reference="category" allowEmpty>
//           <SelectInput optionText="name" />
//       </ReferenceInput>
//       <ReferenceInput source="productcategoryid_point" reference="category"  allowEmpty>
//           <SelectInput optionText="name" />
//       </ReferenceInput>
//       </FormTab>
//       <FormTab label="resources.systemconfig.tabs.shop">
//         <TextInput  label="快递查询URL" source="expressapiurl" />
//         <TextInput  label="快递查询用户号" source="expressapicustomer" />
//         <TextInput  label="快递查询APIKEY" source="expressapikey" />
//     </FormTab>
//     </TabbedForm>
//   </EditPage>
// );
//
// export const SystemconfigList = props => (
//   <ShowPageOne Create={SystemconfigCreate} Edit={SystemconfigEdit} {...props} />
// );
const EditToolbar = props => (
    <Toolbar {...props} >
        <SaveButton />
    </Toolbar>
);

const SystemconfigTitle = ({ record }) => {
  return <span>系统配置</span>;
};

const SystemconfigList = (props) => (//
        <SingleRecordPage {...props}  title={<SystemconfigTitle />}>
          <TabbedForm toolbar={<EditToolbar />}>
              <FormTab label="邮件发送参数">
              <TextInput  label="邮件服务" source="mailopts.service" />
              <NumberInput  label="端口号" source="mailopts.port" />
              <BooleanInput  label="开启安全选项" source="mailopts.secureConnection" />
              <TextInput  label="发送账号" source="mailopts.auth.user" />
              <TextInput  label="发送密码" source="mailopts.auth.pass" />
          </FormTab>
            <FormTab label="邮件发送模版">
              <TextInput  label="设备离线报警发送模版" source="mailtempl.subject_deviceoffline" />
              <TextInput  label="设备错误报警发送模版" source="mailtempl.subject_deviceerr" />
              <TextInput  label="滤芯到期报警发送模版" source="mailtempl.subject_filterexp" />
          </FormTab>
          <FormTab label="滤芯发送配置">
          <TextInput  label="每天发送时间" source="mailsettings.sendmailtime_filterexp" />
          <NumberInput  label="到期提前发送天数" source="mailsettings.sendmailtime_aheaddays" />
        </FormTab>
          </TabbedForm>
        </SingleRecordPage>
);


export  {SystemconfigList};

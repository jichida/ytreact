import React from 'react';
import { List } from 'react-admin';

import {

  NullableBooleanInput,
  Edit,
  TabbedForm,
  FormTab,
  TextInput,
  Datagrid,
  TextField,
  EditButton,
  SelectInput,
  Filter,
  ReferenceInput,
  ReferenceField,
  
} from 'react-admin';
import TextFieldBool from '../controls/TextFieldBool';
import ImageArrayField from '../controls/imagearrayfield';
import InputSpaceField from '../controls/InputSpaceField';


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

const DeviceEdit = (props) => {
      return (<Edit title={<DeviceuserTitle />} {...props}>
        <TabbedForm>
          <FormTab label="基本信息">
            <ReferenceField label="用户设备" source="deviceuserid" reference="deviceuser" allowEmpty>
                <TextField source="syssettings.deviceid" />
            </ReferenceField>
            <TextField label="出水水质" source="homedata.main_outwater_quality" />
            <TextField label="出水等级" source="homedata.main_outwater_grade" />
            <TextField label="进水水质" source="homedata.main_inwater_quality"  />
            <TextField label="总产水量" source="homedata.main_totalwatervol"  />
            <TextField label="运行时间" source="homedata.main_runtime"  />
            <TextField label="浓水出水量" source="homedata.main_outcwatervol"  />
            <TextField label="电离子膜寿命剩余流量" source="homedata.filterelements_modlife_leftvol"  />
            <TextField label="前置PP寿命剩余流量" source="homedata.filterelements_prefilter1_leftvol"  />
            <TextField label="前置2滤芯寿命剩余流量" source="homedata.filterelements_prefilter2_leftvol"  />
            <TextField label="前置3滤芯寿命剩余流量" source="homedata.filterelements_prefilter3_leftvol"  />
            <TextField label="后置活性炭寿命剩余流量" source="homedata.filterelements_posfilter1_leftvol"  />
            <TextField label="电离子膜寿命剩余流量" source="homedata.filterelements_posfilter2_leftvol"  />
            <TextField label="电离子膜寿命剩余流量" source="homedata.filterelements_posfilter3_leftvol"  />
            <TextField label="电离子膜寿命剩余流量" source="homedata.filterelements_posfilter3_leftvol"  />
            <TextField label="电离子膜寿命剩余天数" source="homedata.filterelements_modlife_leftday"  />
            <TextField label="前置PP寿命剩余天数" source="homedata.filterelements_prefilter1_leftday"  />
            <TextField label="前置2寿命剩余天数" source="homedata.filterelements_prefilter2_leftday"  />
            <TextField label="前置3寿命剩余天数" source="homedata.filterelements_prefilter3_leftday"  />
            <TextField label="后置活性炭寿命剩余天数" source="homedata.filterelements_posfilter1_leftday"  />
            <TextField label="后置2滤芯寿命剩余天数" source="homedata.filterelements_posfilter2_leftday"  />
            <TextField label="后置2滤芯寿命剩余天数" source="homedata.filterelements_posfilter3_leftday"  />
          </FormTab>
          <FormTab label="异常数据">
          <TextField label="零件故障" source="errordata.error_partsfailure"  />
          <TextField label="泵故障" source="errordata.error_pumpfailure"  />
          <TextField label="程序故障" source="errordata.error_programfailure"  />
          <TextField label="流量故障" source="errordata.error_flowfailure"  />
          <TextField label="漏水故障" source="errordata.error_leakagefault"  />
          <TextField label="EDI电流" source="errordata.error_edicurrent"  />
          <TextField label="膜的去除效率" source="errordata.error_modout"  />
          <TextField label="进水传感器故障" source="errordata.error_intakesensorfault"  />
          <TextField label="出水传感器故障" source="errordata.error_outflowsensorfault"  />
          <TextField label="浓水传感器故障" source="errordata.error_cwatersensorfault"  />
          <TextField label="废水传感器故障" source="errordata.error_outflowflowmeterfailure"  />
          <TextField label="废水流量计故障" source="errordata.error_wastewaterflowmeterfailure"  />
          <TextField label="时钟故障" source="errordata.error_clockfailure"  />
          <TextField label="压力1传感器故障" source="errordata.error_pressuresensor1failure"  />
          <TextField label="压力2传感器故障" source="errordata.error_pressuresensor2failure"  />
          <TextField label="压力3传感器故障" source="errordata.error_pressuresensor3failure"  />
          <TextField label="压力4传感器故障" source="errordata.error_pressuresensor4failure"  />
          </FormTab>
        <FormTab label="性能数据">
        <TextField label="平均电流@600" source="performancedata.averagecurrent_600"  />
        <TextField label="300电导率时的电流" source="performancedata.averagecurrent_300"  />
        <TextField label="平均cut@600" source="performancedata.averagecut_600"  />
        <TextField label="平均cut@300" source="performancedata.averagecut_300"  />
        <TextField label="净水率" source="performancedata.waterpurificationrate"  />
        <TextField label="最大电流@600" source="performancedata.max_averagecurrent_600"  />
        <TextField label="最大300电导率时的电流" source="performancedata.max_averagecurrent_300"  />
        <TextField label="最大电流@600" source="performancedata.max_averagecut_600"  />
        <TextField label="最大电流@300" source="performancedata.max_averagecut_300"  />
        <TextField label="最大净水率" source="performancedata.max_waterpurificationrate"  />
        <TextField label="最小电流@600" source="performancedata.min_averagecurrent_600"  />
        <TextField label="最小300电导率时的电流" source="performancedata.min_averagecurrent_300"  />
        <TextField label="最小电流@600" source="performancedata.min_averagecut_600"  />
        <TextField label="最小电流@300" source="performancedata.min_averagecut_300"  />
        <TextField label="最小净水率" source="performancedata.min_waterpurificationrate"  />
        </FormTab>
          <FormTab label="进水设定">
          <TextField label="进水TDS" source="inwatersettings.tds"  />
          <TextField label="进水电导率" source="inwatersettings.conductivity"  />
          <TextField label="进水硬度" source="inwatersettings.hardness"  />
          <TextField label="进水碱度" source="inwatersettings.alkalinity"  />
          <TextField label="进水PH" source="inwatersettings.ph"  />
          </FormTab>
          <FormTab label="系统设置">
            <TextField label="水质" source="syssettings.quality" />
            <TextField label="是否休眠" source="syssettings.dormancy" />
            <TextField label="休眠开始时间" source="syssettings.dormancystart"  />
            <TextField label="休眠结束时间" source="syssettings.dormancyend"  />
            <TextField label="语言" source="syssettings.language"  />
          </FormTab>
        </TabbedForm>
      </Edit>);

};

const DeviceList = (props) => (//
     <List title="设备列表" {...props} filters={<DeviceFilter />} sort={{ field: 'updated_at', order: 'DESC' }}>
        <Datagrid>
          <ReferenceField label="用户设备" source="deviceuserid" reference="deviceuser" allowEmpty>
              <TextField source="syssettings.deviceid" />
          </ReferenceField>
          <TextField label="最新数据" source="updated_at" />
          <EditButton />
        </Datagrid>
    </List>
);


export  {DeviceList,DeviceEdit};

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import EditTable from './material-ui-table-edit.js';
import { Fields } from 'redux-form';
import Divider from 'material-ui/Divider';
import _ from 'lodash';

const renderAlaramRuleEdit = ({ meta: { touched, error } = {}, input: { ...inputProps }, ...props }) =>{
  console.log(`renderAlaramRuleEdit form ==>inputProps:${JSON.stringify(inputProps)},props:${JSON.stringify(props)}`);
  let vsz = inputProps.value;
  if(typeof vsz === 'string'){
    vsz = [];
  }
  let onDelete =(values)=>{
    console.log(`onDelete :${JSON.stringify(values)}`);
    let index = _.get(values,'rowId',-1);

    console.log(`onDelete index:${index}`);

    let newv = [];
    if(index !== -1 && index < vsz.length ){
      for(let i = 0;i < vsz.length; i++){
        if(i !== index){
          newv.push(vsz[i]);
        }
      }
    }
    else{
      newv = _.clone(vsz);
    }
    console.log(`onDelete newv:${JSON.stringify(newv)}`);
    inputProps.onChange(newv);
    // onDelete :{"rowId":0,"row":{"columns":[{"value":"GPS信息","selected":false,"rowId":0,"id":0,"width":150},{"value":["ChargeACVoltage","AL_Under_Ucell","AL_Over_Tcell"],"selected":false,"rowId":0,"id":1,"width":150}],"id":0}}
  };
  let onChange = (values)=>{
    console.log(`onChange :${JSON.stringify(values)}`);
    console.log(`onChange :${typeof vsz}`);
    let newv = _.clone(vsz);
    let index = _.get(values,'id',-1);
    if(index != -1 && index < vsz.length ){
      let name = values["columns"][0].value;
      let op = values["columns"][1].value;
      let value = values["columns"][2].value;
      let content = values["columns"][3].value;
      newv[index] = {name,op,value,content};
    }
    else if(index >= vsz.length){
      let name = values["columns"][0].value;
      let op = values["columns"][1].value;
      let value = values["columns"][2].value;
      let content = values["columns"][3].value;
      newv.push( {name,op,value,content});
    }
    else{
      return;
    }

    console.log(`onChange newv:${JSON.stringify(newv)}`);
    inputProps.onChange(newv);
  }
  let rows = [];
  let headers = [
     {value: '字段名', type: 'Select', width: 400,multi:false,options:[
       { value: 'temperature', label: '温度' },
       { value: 'rainfall', label: '降雨量' },
       { value: 'humidity', label: '湿度' },
       { value: 'windspeed', label: '风力' },
       { value: 'winddirection', label: '风向' },
       { value: 'pressure', label: '大气压' },
     ]},
     {value: '操作符', type: 'Select', width: 200,multi:false,options:[
       { value: '>', label: '大于' },
       { value: '=', label: '等于' },
       { value: '<', label: '小于' },
     ]},
     {value: '值', type: 'TextField', width: 200},
     {value: '报警信息', type: 'TextField', width: 'auto'},
  ];

  _.map(vsz,(v)=>{
    rows.push(
      {columns: [
        {value: v.name},
        {value: v.op},
        {value: v.value},
        {value: v.content},
      ]}
    );
  });

  return (<EditTable
    enableNew={true}
    onDelete={onDelete}
    onChange={onChange}
    rows={rows}
    enableDelete={true}
    headerColumns={headers}
  />);
};

export default renderAlaramRuleEdit;

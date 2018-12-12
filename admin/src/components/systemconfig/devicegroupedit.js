import React, { Component } from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import EditTable from './material-ui-table-edit.js';
import { Fields } from 'redux-form';
import Divider from 'material-ui/Divider';
import _ from 'lodash';

const renderGroupEdit = ({ meta: { touched, error } = {}, input: { ...inputProps }, ...props }) =>{
  console.log(`renderGroupEdit form ==>inputProps:${JSON.stringify(inputProps)},props:${JSON.stringify(props)}`);
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
    let newv = _.clone(vsz);
    let index = _.get(values,'id',-1);
    if(index != -1 && index < vsz.length ){
      let groupname = values["columns"][0].value;
      let fieldslist = values["columns"][1].value;
      newv[index] = {groupname,fieldslist};
    }
    else if(index >= vsz.length){
      let groupname = values["columns"][0].value;
      let fieldslist = values["columns"][1].value;
      newv.push({groupname,fieldslist});
    }
    else{
      return;
    }

    console.log(`onChange newv:${JSON.stringify(newv)}`);
    inputProps.onChange(newv);
  }
  let rows = [];
  let headers = [
     {value: '分组名', type: 'TextField', width: 200},
     {value: '字段列表', type: 'ReactSelect', width: 'auto'},
  ];

  _.map(vsz,(v)=>{
    rows.push(
      {columns: [
      {value: v.groupname},
      {value: v.fieldslist},
      ]}
    );
  });

  return (<EditTable
    onDelete={onDelete}
    onChange={onChange}
    rows={rows}
    enableDelete={true}
    headerColumns={headers}
  />);
};

export default renderGroupEdit;

import React from 'react'
import lodashGet from 'lodash.get'
import { FormattedMessage } from 'react-intl'

export const prev0Options = [
  {
      label: <FormattedMessage key={0} id="setting.system.PP" values={{value: '30'}} />,
      value: '30'
  },
  {
      label: <FormattedMessage key={1} id="setting.system.PP" values={{value: '90'}} />,
      value: '90'
  },
  {
      label: <FormattedMessage key={2} id="setting.system.PP" values={{value: '180'}} />,
      value: '180'
  }
]

export const prev1Options = [
  {
      label: <FormattedMessage key={0} id="setting.system.carbon" values={{value: '180'}} />,
      value: '180'
  },
  {
      label: <FormattedMessage key={1} id="setting.system.carbon" values={{value: '360'}} />,
      value: '360'
  },
  {
      label: <FormattedMessage key={1} id="setting.system.carbon" values={{value: '540'}} />,
      value: '540'
  },
]

export const prev2Options = [
  {
      label: <FormattedMessage key={0} id="setting.system.FOF" values={{value: '180'}} />,
      value: '180'
  },
  {
      label: <FormattedMessage key={1} id="setting.system.FOF" values={{value: '360'}} />,
      value: '360'
  },
  {
      label: <FormattedMessage key={1} id="setting.system.FOF" values={{value: '540'}} />,
      value: '540'
  },
]

export const post0Options = [
  {
      label: <FormattedMessage key={0} id="setting.system.AFC" values={{value: '180'}} />,
      value: '180'
  },
  {
      label: <FormattedMessage key={1} id="setting.system.AFC" values={{value: '270'}} />,
      value: '270'
  },
  {
      label: <FormattedMessage key={2} id="setting.system.AFC" values={{value: '360'}} />,
      value: '360'
  }
]

export const post1Options = [
  {
      label: <FormattedMessage key={0} id="setting.system.DCF" values={{value: '180'}} />,
      value: '180'
  },
  {
      label: <FormattedMessage key={1} id="setting.system.DCF" values={{value: '270'}} />,
      value: '270'
  },
  {
      label: <FormattedMessage key={2} id="setting.system.DCF" values={{value: '360'}} />,
      value: '360'
  }
]

export const post2Options = [
  {
      label: <FormattedMessage key={0} id="setting.system.LED" values={{value: '360'}} />,
      value: '360'
  },
  {
      label: <FormattedMessage key={1} id="setting.system.LED" values={{value: '720'}} />,
      value: '720'
  },
  {
      label: <FormattedMessage key={2} id="setting.system.LED" values={{value: '1080'}} />,
      value: '1080'
  }
]

export const getFilterLabel = (intl,id,value)=>{
  if(id === 'prev0'){
    return intl.formatMessage({id:"setting.system.PP"},{value});
  }
  if(id === 'prev1'){
    return intl.formatMessage({id:"setting.system.carbon"},{value});
  }
  if(id === 'prev2'){
    return intl.formatMessage({id:"setting.system.FOF" },{value});
  }
  if(id === 'post0'){
    return intl.formatMessage({id:"setting.system.AFC" },{value});
  }
  if(id === 'post1'){
    return intl.formatMessage({id:"setting.system.DCF"},{value});
  }
  if(id === 'post2'){
    return intl.formatMessage({id:"setting.system.LED"},{value});
  }
  return '';
}

const filtervaluetoindex = (idname,life)=>{
  if(idname === "prev0"){
    if(life === '0') {
      return 0;
    }
    if(life === '30'){
      return 1;
    }
    if(life === '90'){
      return 2;
    }
    if(life === '180'){
      return 3;
    }
  }
  if(idname === "prev1"){
    if(life === '0') {
      return 0;
    }
    if(life === '18'){
      return 1;
    }
    if(life === '360'){
      return 2;
    }
    if(life === '540'){
      return 3;
    }
  }
  if(idname === "prev2"){
    if(life === '0') {
      return 0;
    }
    if(life === '18'){
      return 1;
    }
    if(life === '360'){
      return 2;
    }
    if(life === '540'){
      return 3;
    }
  }
  if(idname === "post0"){
    if(life === '0') {
      return 0;
    }
    if(life === '180'){
      return 1;
    }
    if(life === '270'){
      return 2;
    }
    if(life === '360'){
      return 3;
    }
  }
  if(idname === "post1"){
    if(life === '0') {
      return 0;
    }
    if(life === '180'){
      return 1;
    }
    if(life === '270'){
      return 2;
    }
    if(life === '360'){
      return 3;
    }
  }
  if(idname === "post2"){
    if(life === '0') {
      return 0;
    }
    if(life === '360'){
      return 1;
    }
    if(life === '720'){
      return 2;
    }
    if(life === '1080'){
      return 3;
    }
  }
}

const filterindextovalue = (idname,index)=>{
  if(idname === "prev0"){
    if(index === 0) {
      return 0;
    }
    if(index === 1){
      return 30;
    }
    if(index === 2){
      return 90;
    }
    if(index === 3){
      return 180;
    }
  }
  if(idname === "prev1"){
    if(index === 0) {
      return 0;
    }
    if(index === 1){
      return 180;
    }
    if(index === 2){
      return 360;
    }
    if(index === 3){
      return 540;
    }
  }
  if(idname === "prev2"){
    if(index === 0) {
      return 0;
    }
    if(index === 1){
      return 180;
    }
    if(index === 2){
      return 360;
    }
    if(index === 3){
      return 540;
    }
  }
  if(idname === "post0"){
    if(index === 0) {
      return 0;
    }
    if(index === 1){
      return 180;
    }
    if(index === 2){
      return 270;
    }
    if(index === 3){
      return 360;
    }
  }
  if(idname === "post1"){
    if(index === 0) {
      return 0;
    }
    if(index === 1){
      return 180;
    }
    if(index === 2){
      return 270;
    }
    if(index === 3){
      return 360;
    }
  }
  if(idname === "post2"){
    if(index === 0) {
      return 0;
    }
    if(index === 1){
      return 360;
    }
    if(index === 2){
      return 720;
    }
    if(index === 3){
      return 1080;
    }
  }
}

export const convertfilterlist = (filterlist)=>{
  let prev0 = filtervaluetoindex(filterlist['prev0'].idname, filterlist['prev0'].life[0]) || 0;
  let prev1 = filtervaluetoindex(filterlist['prev1'].idname, filterlist['prev1'].life[0]) || 0;
  let prev2 = filtervaluetoindex(filterlist['prev2'].idname, filterlist['prev2'].life[0]) || 0;
  let post0 = filtervaluetoindex(filterlist['post0'].idname, filterlist['post0'].life[0]) || 0;
  let post1 = filtervaluetoindex(filterlist['post1'].idname, filterlist['post1'].life[0]) || 0;
  let post2 = filtervaluetoindex(filterlist['post2'].idname, filterlist['post1'].life[0]) || 0;

  return {prev0,prev1,prev2,post0,post1,post2};
}

export const convertfromfilterlist  = ({prev0,prev1,prev2,post0,post1,post2})=>{
  let newlist = {}
  newlist['prev0'] = {
    idname:'prev0',
    isprev: true,
    life: prev0 === 0 ? [0] : [prev0Options[prev0-1].value],
  }
  newlist['prev1'] = {
    idname:'prev1',
    isprev: true,
    life: prev1 === 0 ? [0] : [prev1Options[prev1-1].value],
  }
  newlist['prev2'] = {
    idname:'prev2',
    isprev: true,
    life: prev2 === 0 ? [0] : [prev2Options[prev2-1].value],
  }
  newlist['post0'] = {
    idname:'post0',
    isprev: false,
    life: post0 === 0 ? [0] : [post0Options[post0-1].value],
  }
  newlist['post1'] = {
    idname:'post1',
    isprev: false,
    life: post1 === 0 ? [0] : [post1Options[post1-1].value],
  }
  newlist['post2'] = {
    idname:'post2',
    isprev: false,
    life: post2 === 0 ? [0] : [post2Options[post2-1].value],
  }
  return newlist
}

export const mainconvertfromfilterlist  = ({prev0,prev1,prev2,post0,post1,post2})=>{
  let newlist = {}
  newlist['prev0'] = {
    idname:'prev0',
    isprev: true,
    life: [filterindextovalue('prev0', prev0)]
  }
  newlist['prev1'] = {
    idname:'prev1',
    isprev: true,
    life: [filterindextovalue('prev1', prev1)]
  }
  newlist['prev2'] = {
    idname:'prev2',
    isprev: true,
    life: [filterindextovalue('prev2', prev2)]
  }
  newlist['post0'] = {
    idname:'post0',
    isprev: false,
    life: [filterindextovalue('post0', post0)]
  }
  newlist['post1'] = {
    idname:'post1',
    isprev: false,
    life: [filterindextovalue('post1', post1)]
  }
  newlist['post2'] = {
    idname:'post2',
    isprev: false,
    life: [filterindextovalue('post2', post2)]
  }
  console.log('newlist:', newlist)
  return newlist
}

export const filterlistConvertToArray = (data) => {
  const { prev0, prev1, prev2, post0, post1, post2 } = data
  const filters = []

  if(!!prev0.life) {
      filters.push({...prev0, life: prev0.life[0], idname: prev0.idname === '' ? 'prev0' : prev0.idname})
  }
  if(!!prev1.life) {
      filters.push({...prev1, life: prev1.life[0], idname: prev1.idname === '' ? 'prev1' : prev1.idname})
  }
  if(!!prev2.life) {
      filters.push({...prev2, life: prev2.life[0], idname: prev2.idname === '' ? 'prev2' : prev2.idname})
  }
  if(!!post0.life) {
      filters.push({...post0, life: post0.life[0], idname: post0.idname === '' ? 'post0' : post0.idname})
  }
  if(!!post1.life) {
      filters.push({...post1, life: post1.life[0], idname: post1.idname === '' ? 'post1' : post1.idname})
  }
  if(!!post2.life) {
      filters.push({...post2, life: post2.life[0], idname: post2.idname === '' ? 'post2' : post2.idname})
  }

  return filters
}

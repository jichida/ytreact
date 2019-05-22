import React from 'react'
import { FormattedMessage } from 'react-intl'

export const prev0Options = [
    {
        label: <FormattedMessage key={0} id="setting.system.PP" values={{value: '30'}} />,
        value: '30'
    },
    {
        label: <FormattedMessage key={1} id="setting.system.PP" values={{value: '60'}} />,
        value: '60'
    },
    {
        label: <FormattedMessage key={2} id="setting.system.PP" values={{value: '90'}} />,
        value: '90'
    }
]

export const prev1Options = [
    {
        label: <FormattedMessage key={0} id="setting.system.carbon" values={{value: '30'}} />,
        value: '30'
    },
    {
        label: <FormattedMessage key={1} id="setting.system.carbon" values={{value: '60'}} />,
        value: '60'
    },
]

export const prev2Options = [
    {
        label: <FormattedMessage key={0} id="setting.system.TAC" values={{value: '180'}} />,
        value: '180'
    },
    {
        label: <FormattedMessage key={1} id="setting.system.TAC" values={{value: '360'}} />,
        value: '360'
    }
]

export const post0Options = [
    {
        label: <FormattedMessage key={0} id="setting.system.LED" values={{value: '180'}} />,
        value: '180'
    },
    {
        label: <FormattedMessage key={1} id="setting.system.LED" values={{value: '360'}} />,
        value: '360'
    },
    {
        label: <FormattedMessage key={2} id="setting.system.LED" values={{value: '540'}} />,
        value: '540'
    }
]

export const post1Options = [
    {
        label: <FormattedMessage key={0} id="setting.system.AFC" values={{value: '180'}} />,
        value: '180'
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
    return intl.formatMessage({id:"setting.system.TAC" },{value});
  }
  if(id === 'post0'){
    return intl.formatMessage({id:"setting.system.LED" },{value});
  }
  if(id === 'post1'){
    return intl.formatMessage({id:"setting.system.AFC"},{value});
  }
  return '';
}

const filtervaluetoindex = (idname,life)=>{
  if(idname === "prev0"){
    if(life === '30'){
      return 0;
    }
    if(life === '60'){
      return 1;
    }
    if(life === '90'){
      return 2;
    }
  }
  if(idname === "prev1"){
    if(life === '30'){
      return 0;
    }
    if(life === '60'){
      return 1;
    }
  }
  if(idname === "prev2"){
    if(life === '180'){
      return 0;
    }
    if(life === '360'){
      return 1;
    }
  }
  if(idname === "post0"){
    if(life === '180'){
      return 0;
    }
    if(life === '360'){
      return 1;
    }
    if(life === '540'){
      return 2;
    }
  }
  if(idname === "post1"){
    if(life === '180'){
      return 0;
    }
  }
}

export const convertfilterlist = (filterlist)=>{
  let prev0 = 0;
  let prev1 = 0;
  let prev2 = 0;
  let post0 = 0;
  let post1 = 0;
  for(let i = 0;i < filterlist.length;i++){
    const v = filterlist[i];
    if(v.idname === 'prev0'){
      prev0 = filtervaluetoindex(v.idname,v.life);
    }
    if(v.idname === 'prev1'){
      prev1 = filtervaluetoindex(v.idname,v.life);
    }
    if(v.idname === 'prev2'){
      prev2 = filtervaluetoindex(v.idname,v.life);
    }
    if(v.idname === 'post0'){
      post0 = filtervaluetoindex(v.idname,v.life);
    }
    if(v.idname === 'post1'){
      post1 = filtervaluetoindex(v.idname,v.life);
    }
  }
  return {prev0,prev1,prev2,post0,post1};
}

export const convertfromfilterlist  = ({prev0,prev1,prev2,post0,post1})=>{
  let targetfilterlist = [];
  targetfilterlist.push({
    idname:'prev0',
    life:prev0Options[prev0].value,
  });
  targetfilterlist.push({
    idname:'prev1',
    life:prev1Options[prev1].value,
  });
  targetfilterlist.push({
    idname:'prev2',
    life:prev2Options[prev2].value,
  });
  targetfilterlist.push({
    idname:'post0',
    life:post0Options[post0].value,
  });
  targetfilterlist.push({
    idname:'post1',
    life:post1Options[post1].value,
  });
  return targetfilterlist;
}

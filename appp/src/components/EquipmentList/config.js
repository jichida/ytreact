import React from 'react'
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
    // {
    //     label: <FormattedMessage key={0} id="setting.system.DCF" values={{value: '180'}} />,
    //     value: '180'
    // },
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

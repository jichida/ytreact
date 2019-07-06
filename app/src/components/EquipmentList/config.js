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
    },
    {
        label: <FormattedMessage key={3} id="form.equip.nonefilter" defaultMessage="无" />,
        value: '0'
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
    {
        label: <FormattedMessage key={2} id="form.equip.nonefilter" defaultMessage="无" />,
        value: '0'
    }
]

export const prev2Options = [
    {
        label: <FormattedMessage key={0} id="setting.system.TAC" values={{value: '180'}} />,
        value: '180'
    },
    {
        label: <FormattedMessage key={1} id="setting.system.TAC" values={{value: '360'}} />,
        value: '360'
    },
    {
        label: <FormattedMessage key={2} id="form.equip.nonefilter" defaultMessage="无" />,
        value: '0'
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
    },
    {
        label: <FormattedMessage key={3} id="form.equip.nonefilter" defaultMessage="无" />,
        value: '0'
    }
]

export const post1Options = [
    {
        label: <FormattedMessage key={0} id="setting.system.AFC" values={{value: '180'}} />,
        value: '180'
    },
    {
        label: <FormattedMessage key={1} id="form.equip.nonefilter" defaultMessage="无" />,
        value: '0'
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

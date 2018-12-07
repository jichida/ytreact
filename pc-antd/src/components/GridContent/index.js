import React from 'react';
import './index.less';

export default ({children, iswide}) => {

  return (
    <div className={iswide?'main wide':'main'}>
        {children}
    </div>
  )
}

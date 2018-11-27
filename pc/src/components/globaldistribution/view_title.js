import Dq_icon from '../img/dq_icon.png';

import React from 'react';

const ViewTitle = ()=>{
  return (<h1 className="title2">
        <img src={Dq_icon} alt="" />
        <span>中国区域展示</span>
        <span className="fr"><a href="qqfb.html">返回上一页</a></span>
    </h1>);
}

export default ViewTitle;

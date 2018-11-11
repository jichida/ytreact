import React from 'react';
import Sb_icon from '../img/sb_icon.png';
const DeviceTitle = ()=>{

  return (<h1 className="title2">
        <img src={Sb_icon} alt="" />
        <span>异常机器</span>
        <span className="fr"><a href="search.html"> 返回上一页</a></span>
    </h1>);
}

export default DeviceTitle;

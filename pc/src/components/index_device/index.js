import React from 'react';
import DeviceTop from './device_top';
import DeviceTitle from './device_title';
import Sb_yc from '../img/sb_yc.png';


const IndexDevice = ()=>{
  return ( <div>
        <DeviceTop />
      <div className="qbsb_box">
        <DeviceTitle />
        <div className="contant">
            <ul>
                <li>
                    <h2>
                        <img src={Sb_yc} alt="" />
                        <span>北京翡翠山 20171116</span>
                    </h2>
                    <p>识别编号：125445554511112254444</p>
                    <p>设备名称：HHBJ25018</p>
                    <p>运行时间：02:10:10</p>
                    <div className="an">
                        <h3>Active Mode</h3>
                        <a href="sjxq2.html"><button>显示详情</button></a>
                        <div className="clear"></div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
  </div>
  );
}

export default IndexDevice;

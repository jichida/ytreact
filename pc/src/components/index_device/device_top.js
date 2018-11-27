import React from 'react';
import Logo from '../img/title2.png';
import Tximg from '../img/tx.png';
import Login_icondimg from '../img/login_icond.png';
import Messageimg from '../img/message.png';
import Login_iconcimg from '../img/login_iconc.png';
const DeviceTop = ()=>{
  return (<div className="top">
      <img src={Logo} alt="" />
      <div className="top_a">
          <ul>
              <li>
                  <a href="search.html">搜索页</a>

              </li>
              <li className="active">
                  <a href="ycjq.html">异常机器</a>
              </li>
              <li className="">
                  <a href="qbsb.html"> 全部设备</a>
              </li>
              <li className="">
                  <a href="qqfb.html">全球分布</a>
              </li>
          </ul>
      </div>
      <div className="top_ma">
          <ul>

              <li>
                  <a href="tzgg.html"><img src={Messageimg} alt="" className="message" /></a>

              </li>
              <li>
                  <img src={Login_iconcimg} alt="" />
                  <select>
                      <option value="volvo">中文</option>
                      <option value="saab">英文</option>
                  </select>
              </li>
              <li>
                  <img src={Tximg} alt="" className="tx" />
                  <p>992631992@qq.com</p>
                  <img src={Login_icondimg} alt="" />
              </li>
          </ul>

      </div>
  </div>);
}

export default DeviceTop;

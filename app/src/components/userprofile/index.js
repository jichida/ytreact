import React from 'react';
import {Link} from 'react-router-dom';
import '../css/user-mine.css';
import Tximg from './images/tx.png';
import Sy1 from './images/sy1.png';
import Sy2 from './images/sy2.png';
import Sy3 from './images/sy3.png';
import Sy4 from './images/sy4.png';
import Sy5 from './images/sy5.png';
import Sy6 from './images/sy6.png';
import Blimg from './images/bl.png';
const Userprofile = ()=>{

  return ( 
            <div className="weui-tab__panel">
                <div className="weui-cell weui-cell_access">
                    <div className="weui-cell__hd"><img src={Tximg} alt="" /></div>
                    <div className="weui-cell__bd">
                        <h2>XXX服务商名称</h2>
                        <a href="tel:400-000-1234">TEL：400-000-1234</a>
                    </div>
                    <div className="weui-cell__ft"></div>
                </div>
                <img src={Blimg} alt="" />
                <h2 className="title">常用工具</h2>
                <div className="gj">
                    <ul className="elastic_box elastic_hw">
                        <li className="borb">
                            <Link to="/info">
                                <img src={Sy1} alt="" />
                                <p>设备信息</p>
                            </Link>
                        </li>
                        <li className="borb">
                            <Link to="/basicinfo">
                                <img src={Sy2} alt="" />
                                <p>基本信息</p>
                            </Link>
                        </li>
                        <li className="borb">
                            <Link to="/waterinformation">
                                <img src={Sy3} alt="" />
                                <p>用水信息</p>
                            </Link>
                        </li>
                        <li>
                            <Link to="/installinformation">
                                <img src={Sy4} alt="" />
                                <p>安装环境</p>
                            </Link>
                        </li>

                        <li>
                            <Link to="/equipmentlist">
                                <img src={Sy5} alt="" />
                                <p>设备清单</p>
                            </Link>
                        </li>
                        <li>
                            <Link to="/usersetting">
                                <img src={Sy6} alt="" />
                                <p>系统设置</p>
                            </Link>
                        </li>
                    </ul>
                </div>
      </div>);
}

export default Userprofile;

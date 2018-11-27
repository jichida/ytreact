import React from 'react';
import DeviceTop from '../index_device/device_top';
import DeviceTitle from '../index_device/device_title';
import Sj_icon from '../img/sj_icon.png';
import Sj_yc from '../img/sj_yc.png';
import Sj_zc from '../img/sj_zc.png';


const DeviceInfo = ()=>{

  return (<div>
  <DeviceTop />
  <div className="qbsb_box">
      <h1 className="title2">
          <img src={Sj_icon} alt="" />
          <span>数据详情</span>
          <span className="fr">
              <a href="qbsb.html">
                  返回上一页
              </a>
          </span>
      </h1>
      <div className="main">
          <ul className="box1">
              <li>进水水质
                  <span>uS/cm</span>
                  <em>1000</em>
              </li>
              <li>每日用水量
                  <span>吨</span>
                  <em>1000</em>
              </li>
              <li>运行时间
                  <span>时/分/秒</span>
                  <em>02:10:20</em>
              </li>
              <li>回收率
                  <span>uS/cm</span>
                  <em>1000</em>
              </li>
          </ul>
          <ul className="box2">
              <li>

                  <img src={Sj_yc} alt="" />
                  <p>平均出水水质</p>
              </li>
              <li>
                  <img src={Sj_zc} alt="" />
                  <p>电离子膜寿命</p>
              </li>
              <li>
                  <img src={Sj_zc} alt="" />
                  <p>前置滤芯1</p>
              </li>
              <li>
                  <img src={Sj_zc} alt="" />
                  <p>前置滤芯2</p>
              </li>
              <li>
                  <img src={Sj_zc} alt="" />
                  <p>前置滤芯3</p>
              </li>
              <li>
                  <img src={Sj_zc} alt="" />
                  <p>后置滤芯2</p>
              </li>
              <li>
                  <img src={Sj_zc} alt="" />
                  <p>后置滤芯2</p>
              </li>
              <li>
                  <img src={Sj_zc} alt="" />
                  <p>后置滤芯3</p>
              </li>
              <li>
                  <img src={Sj_zc} alt="" />
                  <p>UV寿命</p>
              </li>
          </ul>
          <div className="box3">
              <div className="contant_left">
                  <div className="czzl">
                      <h2>操作指令</h2>
                      <a href="czzl.html">
                          <h3>mod ></h3>
                      </a>
                      <div className="clear"></div>
                  </div>

                  <ul className="bt">
                      <li>类型</li>
                      <li>主体</li>
                      <li>时间</li>
                  </ul>
                  <div className="content1 b90">
                      <ul>
                          <li>Message</li>
                          <li>ModinUs: 353 , 303</li>
                          <li>2018-05-05 3:21:00 PM</li>
                      </ul>
                      <ul>
                          <li>Message</li>
                          <li>ModinUs: 353 , 303</li>
                          <li>2018-05-05 3:21:00 PM</li>
                      </ul>
                      <ul>
                          <li>Message</li>
                          <li>ModinUs: 353 , 303</li>
                          <li>2018-05-05 3:21:00 PM</li>
                      </ul>
                      <ul>
                          <li>Message</li>
                          <li>ModinUs: 353 , 303</li>
                          <li>2018-05-05 3:21:00 PM</li>
                      </ul>
                      <ul>
                          <li>Message</li>
                          <li>ModinUs: 353 , 303</li>
                          <li>2018-05-05 3:21:00 PM</li>
                      </ul>
                  </div>
              </div>
              <div className="contant_right">
                  <div className="czzl">
                      <h2>输入指令</h2>

                      <div className="clear"></div>
                  </div>
                  <div className="content">
                      <div className="mb18">
                          <h4>Send a Command</h4>
                          <input type="text" />
                          <span>send</span>
                      </div>
                      <div>
                          <h4>Timezone</h4>
                          <select name="" id="">
                              <option value="">(GMT+08:00) hong kong</option>
                          </select>
                      </div>
                      <div>
                          <button><a href="sjtj.html">数据统计</a></button>
                          <button>下载数据</button>
                      </div>
                  </div>

              </div>
              <div className="clear"></div>
          </div>
          <div className="box4">
              <h2>数据点</h2>

              <ul className="bt">
                  <li style={{width: '6%'}}>ModIn uS</li>
                  <li style={{width: '7%'}}>Product uS</li>
                  <li style={{width: '6%'}}>ModOut uS</li>
                  <li style={{width: '11%'}}>Product Quality Average</li>
                  <li style={{width: '7%'}}>totalONtime</li>
                  <li style={{width: '6%'}}>productDvol</li>
                  <li style={{width: '4%'}}>cYield</li>
                  <li style={{width: '8%'}}>Daily Volume</li>
                  <li style={{width: '9%'}}>Feed Volume Daily</li>
                  <li style={{width: '9%'}}>cWaste Volume Daily</li>
                  <li style={{width: '5%'}}>totalVol</li>
                  <li style={{width: '6%'}}>SysPressure</li>
                  <li style={{width: '5%'}}>tmpt2</li>
                  <li style={{width: '11%'}}>Created At</li>
              </ul>
              <div className="contain">
                  <ul className="">
                      <li style={{width: '6%'}}>279</li>
                      <li style={{width: '6%'}}>178</li>
                      <li style={{width: '7%'}}>201</li>
                      <li style={{width: '11%'}}>76</li>
                      <li style={{width: '7%'}}>82017</li>
                      <li style={{width: '6%'}}>0</li>
                      <li style={{width: '4%'}}>30</li>
                      <li style={{width: '8%'}}>15830</li>
                      <li style={{width: '9%'}}>51281</li>
                      <li style={{width: '9%'}}>35451</li>
                      <li style={{width: '5%'}}>50932</li>
                      <li style={{width: '6%'}}>520</li>
                      <li style={{width: '5%'}}>313</li>
                      <li style={{width: '11%'}}>2018-09-11 9:39:00 AM</li>
                  </ul>
                  <ul className="">
                    <li style={{width: '6%'}}>279</li>
                    <li style={{width: '6%'}}>178</li>
                    <li style={{width: '7%'}}>201</li>
                    <li style={{width: '11%'}}>76</li>
                    <li style={{width: '7%'}}>82017</li>
                    <li style={{width: '6%'}}>0</li>
                    <li style={{width: '4%'}}>30</li>
                    <li style={{width: '8%'}}>15830</li>
                    <li style={{width: '9%'}}>51281</li>
                    <li style={{width: '9%'}}>35451</li>
                    <li style={{width: '5%'}}>50932</li>
                    <li style={{width: '6%'}}>520</li>
                    <li style={{width: '5%'}}>313</li>
                    <li style={{width: '11%'}}>2018-09-11 9:39:00 AM</li>
                  </ul>
                  <ul className="">
                    <li style={{width: '6%'}}>279</li>
                    <li style={{width: '6%'}}>178</li>
                    <li style={{width: '7%'}}>201</li>
                    <li style={{width: '11%'}}>76</li>
                    <li style={{width: '7%'}}>82017</li>
                    <li style={{width: '6%'}}>0</li>
                    <li style={{width: '4%'}}>30</li>
                    <li style={{width: '8%'}}>15830</li>
                    <li style={{width: '9%'}}>51281</li>
                    <li style={{width: '9%'}}>35451</li>
                    <li style={{width: '5%'}}>50932</li>
                    <li style={{width: '6%'}}>520</li>
                    <li style={{width: '5%'}}>313</li>
                    <li style={{width: '11%'}}>2018-09-11 9:39:00 AM</li>
                  </ul>
                  <ul className="">
                    <li style={{width: '6%'}}>279</li>
                    <li style={{width: '6%'}}>178</li>
                    <li style={{width: '7%'}}>201</li>
                    <li style={{width: '11%'}}>76</li>
                    <li style={{width: '7%'}}>82017</li>
                    <li style={{width: '6%'}}>0</li>
                    <li style={{width: '4%'}}>30</li>
                    <li style={{width: '8%'}}>15830</li>
                    <li style={{width: '9%'}}>51281</li>
                    <li style={{width: '9%'}}>35451</li>
                    <li style={{width: '5%'}}>50932</li>
                    <li style={{width: '6%'}}>520</li>
                    <li style={{width: '5%'}}>313</li>
                    <li style={{width: '11%'}}>2018-09-11 9:39:00 AM</li>
                  </ul>
                  <ul className="">
                    <li style={{width: '6%'}}>279</li>
                    <li style={{width: '6%'}}>178</li>
                    <li style={{width: '7%'}}>201</li>
                    <li style={{width: '11%'}}>76</li>
                    <li style={{width: '7%'}}>82017</li>
                    <li style={{width: '6%'}}>0</li>
                    <li style={{width: '4%'}}>30</li>
                    <li style={{width: '8%'}}>15830</li>
                    <li style={{width: '9%'}}>51281</li>
                    <li style={{width: '9%'}}>35451</li>
                    <li style={{width: '5%'}}>50932</li>
                    <li style={{width: '6%'}}>520</li>
                    <li style={{width: '5%'}}>313</li>
                    <li style={{width: '11%'}}>2018-09-11 9:39:00 AM</li>
                  </ul>
                  <ul className="">
                    <li style={{width: '6%'}}>279</li>
                    <li style={{width: '6%'}}>178</li>
                    <li style={{width: '7%'}}>201</li>
                    <li style={{width: '11%'}}>76</li>
                    <li style={{width: '7%'}}>82017</li>
                    <li style={{width: '6%'}}>0</li>
                    <li style={{width: '4%'}}>30</li>
                    <li style={{width: '8%'}}>15830</li>
                    <li style={{width: '9%'}}>51281</li>
                    <li style={{width: '9%'}}>35451</li>
                    <li style={{width: '5%'}}>50932</li>
                    <li style={{width: '6%'}}>520</li>
                    <li style={{width: '5%'}}>313</li>
                    <li style={{width: '11%'}}>2018-09-11 9:39:00 AM</li>
                  </ul>
                  <ul className="">
                    <li style={{width: '6%'}}>279</li>
                    <li style={{width: '6%'}}>178</li>
                    <li style={{width: '7%'}}>201</li>
                    <li style={{width: '11%'}}>76</li>
                    <li style={{width: '7%'}}>82017</li>
                    <li style={{width: '6%'}}>0</li>
                    <li style={{width: '4%'}}>30</li>
                    <li style={{width: '8%'}}>15830</li>
                    <li style={{width: '9%'}}>51281</li>
                    <li style={{width: '9%'}}>35451</li>
                    <li style={{width: '5%'}}>50932</li>
                    <li style={{width: '6%'}}>520</li>
                    <li style={{width: '5%'}}>313</li>
                    <li style={{width: '11%'}}>2018-09-11 9:39:00 AM</li>
                  </ul>
              </div>
          </div>
      </div>
  </div>
</div>
    );
}

export default DeviceInfo;

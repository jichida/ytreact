import React from 'react';
import '../css/user-zhuye.css';
import Zhuyeimg from '../userprofile/images/zhuye_an.png';

const IndexDevice = ()=>{
  return (<div>
  
              <div className="zhuye_bg">
              </div>
              <div className="zhuyean">
                  <img src={Zhuyeimg} alt="" />
                  <div className="text">
                      <h1>优</h1>
                      <p>出水水质 TDS 100</p>
                  </div>
              </div>

              <div className="xianshi">
                  <ul className="elastic_box elastic_hw">
                      <li>
                          <p>进水水质 900 ppm</p>
                      </li>
                      <li>
                          <p>总产水量 900 gal</p>
                      </li>
                      <li>
                          <p>运行时间 20 天</p>
                      </li>
                      <li>
                          <p>浓水出水量 600 gal</p>
                      </li>
                  </ul>
              </div>
              <div className="syzt">
                  <ul className="elastic_box elastic_hw">
                      <li>
                          <h2>电离子膜寿命</h2>
                          <div className="green">
                              <h3>剩余20天</h3>
                              <div className="jdbox">
                                  <div className="jd"></div>
                              </div>
                          </div>
                          <div className="blue">
                              <h3>剩余流量58%</h3>
                              <div className="jdbox">
                                  <div className="jd"></div>
                              </div>
                          </div>
                      </li>
                      <li>
                          <h2>前置PP寿命</h2>
                          <div className="green">
                              <h3>剩余20天</h3>
                              <div className="jdbox">
                                  <div className="jd"></div>
                              </div>
                          </div>
                          <div className="blue">
                              <h3>剩余流量58%</h3>
                              <div className="jdbox">
                                  <div className="jd"></div>
                              </div>
                          </div>
                      </li>
                      <li>
                          <h2>前置UF寿命</h2>
                          <div className="green">
                              <h3>剩余20天</h3>
                              <div className="jdbox">
                                  <div className="jd"></div>
                              </div>
                          </div>
                          <div className="blue">
                              <h3>剩余流量58%</h3>
                              <div className="jdbox">
                                  <div className="jd"></div>
                              </div>
                          </div>
                      </li>
                      <li>
                          <h2>前置TAC寿命</h2>
                          <div className="green">
                              <h3>剩余20天</h3>
                              <div className="jdbox">
                                  <div className="jd"></div>
                              </div>
                          </div>
                          <div className="blue">
                              <h3>剩余流量58%</h3>
                              <div className="jdbox">
                                  <div className="jd"></div>
                              </div>
                          </div>
                      </li>
                      <li>
                          <h2>后置精滤滤芯寿命</h2>
                          <div className="red">
                              <h3>请更换滤芯</h3>
                              <div className="jdbox">
                                  <div className="jd"></div>
                              </div>
                          </div>
                          <div className="red">
                              <h3>请更换滤芯</h3>
                              <div className="jdbox">
                                  <div className="jd"></div>
                              </div>
                          </div>
                      </li>
                      <li>
                          <h2>后置除菌滤芯寿命</h2>
                          <div className="green">
                              <h3>剩余20天</h3>
                              <div className="jdbox">
                                  <div className="jd"></div>
                              </div>
                          </div>
                          <div className="blue">
                              <h3>剩余流量58%</h3>
                              <div className="jdbox">
                                  <div className="jd"></div>
                              </div>
                          </div>
                      </li>
                      <li>
                          <h2>后置UV滤芯寿命</h2>
                          <div className="green">
                              <h3>剩余20天</h3>
                              <div className="jdbox">
                                  <div className="jd"></div>
                              </div>
                          </div>
                          <div className="blue">
                              <h3>剩余流量58%</h3>
                              <div className="jdbox">
                                  <div className="jd"></div>
                              </div>
                          </div>
                      </li>
                  </ul>
              </div>
  </div>);
}

export default IndexDevice;

import React from 'react';
import Header from '../common/header';
const UserSettings = ()=>{
  return [
    <Header title = '系统设置' key='1' />,
     <div className="weui-tab" key='2'>
            <div className="weui-tab__panel">
                <div className="weui-cells mt0">
                    <h2>出水水质（ppm）</h2>
                    <div className="weui-cell weui-cell_access as">
                        <div className="weui-cell__bd">
                            <p>60-200</p>
                        </div>
                        <div className="weui-cell__ft"></div>
                    </div>
                    <div className="weui-cell">
                        <div className="weui-cell__bd">
                            <h4>废水阀泄压</h4>
                        </div>
                        <div className="weui-cell__ft">
                            <a className="weui-btn weui-btn_primary weui-btn_mini">重置</a>
                        </div>
                    </div>
                    <div className="weui-cell">
                        <div className="weui-cell__bd">
                            <h4>重置并重启系统</h4>
                        </div>
                        <div className="weui-cell__ft">
                            <a className="weui-btn weui-btn_primary weui-btn_mini">重置</a>
                        </div>
                    </div>
                    <div className="weui-cell">
                        <div className="weui-cell__bd">
                            <h4>重置时间</h4>
                        </div>
                        <div className="weui-cell__ft">
                            <a className="weui-btn weui-btn_primary weui-btn_mini">重置</a>
                        </div>
                    </div>
                    <div className="weui-cell">
                        <div className="weui-cell__bd">
                            <h4>恢复出厂设置</h4>
                        </div>
                        <div className="weui-cell__ft">
                            <a className="weui-btn weui-btn_primary weui-btn_mini">重置</a>
                        </div>
                    </div>
                    <div className="weui-cell">
                        <div className="weui-cell__bd">
                            <h4>发送设备运行记录</h4>
                        </div>
                        <div className="weui-cell__ft">
                            <a className="weui-btn weui-btn_primary weui-btn_mini">重置</a>
                        </div>
                    </div>
                    <div className="weui-cell  weui-cell_switch">
                        <div className="weui-cell__bd">
                            <h4>休眠</h4>
                        </div>
                        <div className="weui-cell__ft">
                            <label for="switchCP" className="weui-switch-cp">
                                <input id="switchCP" className="weui-switch-cp__input" type="checkbox" checked="checked" />
                                <div className="weui-switch-cp__box"></div>
                            </label>
                        </div>
                    </div>
                    <h2>休眠开始时间</h2>
                    <div className="weui-cell weui-cell_access as">
                        <div className="weui-cell__bd">
                            <p>09:00</p>
                        </div>
                        <div className="weui-cell__ft"></div>
                    </div>
                    <h2>休眠结束时间</h2>
                    <div className="weui-cell weui-cell_access as">
                        <div className="weui-cell__bd">
                            <p>19:00</p>
                        </div>
                        <div className="weui-cell__ft"></div>
                    </div>
                    <a href="change-number.html">
                        <div className="weui-cell  weui-cell_access">

                            <div className="weui-cell__bd">
                                <h4>修改密码</h4>
                            </div>
                            <div className="weui-cell__ft">
                            </div>

                        </div>
                    </a>
                </div>
                <div className="weui-btn-area">
                    <a className="weui-btn weui-btn_primary">保存</a>
                </div>
			</div>
    </div>];
}


export default UserSettings;

import React from 'react';
import Header from '../common/header';
const Info = () => {
    return [
        <Header title='设备信息' key='1' />,
        <div className="weui-tab" key='2'>
            <div className="weui-tab__panel">
                <div className="weui-cells mt0">

                    <div className="weui-cell">
                        <div className="weui-cell__bd">
                            <h4>设备编号</h4>
                        </div>
                        <div className="weui-cell__ft">SBBH1234566</div>
                    </div>

                    <div className="weui-cell">
                        <div className="weui-cell__bd">
                            <h4>购买日期</h4>
                        </div>
                        <div className="weui-cell__ft">2018-01-12</div>
                    </div>

                    <div className="weui-cell">
                        <div className="weui-cell__bd">
                            <h4>安装日期</h4>
                        </div>
                        <div className="weui-cell__ft">2018-05-10</div>
                    </div>


                    <div className="weui-cell">
                        <div className="weui-cell__bd">
                            <h4>安装人员</h4>
                        </div>
                        <div className="weui-cell__ft">弗兰克</div>
                    </div>
                </div>
            </div>
        </div>];
}


export default Info;

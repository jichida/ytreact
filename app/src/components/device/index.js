import React from 'react';
import Header from '../common/header';

const Info = () => {
    return [
        <Header title='基本信息' key='1' />,
        <div className="weui-tab" key='2'>
            <div className="weui-tab__panel">
                <div className="weui-cells mt0">


                    <div className="weui-cell">

                        <div className="weui-cell__bd">
                            <h4>用户姓名</h4>
                        </div>
                        <div className="weui-cell__ft">王诗龄</div>
                    </div>

                    <div className="weui-cell">
                        <div className="weui-cell__bd">
                            <h4>联系方式</h4>
                        </div>
                        <div className="weui-cell__ft">18212345678</div>
                    </div>
                    <h2>安装地址</h2>
                    <div className="weui-cell as">
                        <div className="weui-cell__bd">
                            <p>江苏省南京市建邺区</p>
                        </div>

                    </div>

                    <div className="weui-cell">
                        <div className="weui-cell__bd">
                            <h4>使用性质</h4>
                        </div>
                        <div className="weui-cell__ft">家用</div>
                    </div>

                    <div className="weui-cell">
                        <div className="weui-cell__bd">
                            <h4>房屋类型</h4>
                        </div>
                        <div className="weui-cell__ft">公寓楼</div>
                    </div>

                    <div className="weui-cell">
                        <div className="weui-cell__bd">
                            <h4>楼层高度</h4>
                        </div>
                        <div className="weui-cell__ft">F14/B</div>
                    </div>

                    <div className="weui-cell">
                        <div className="weui-cell__bd">
                            <h4>预装型号</h4>
                        </div>
                        <div className="weui-cell__ft">HDI250</div>
                    </div>
                </div> </div>
        </div>];
}


export default Info;

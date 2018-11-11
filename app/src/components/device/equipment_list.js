import React from 'react';
import Header from '../common/header';

const Equipmentlist = () => {
    return [
        <Header title='设备清单' key='1' />,
        <div className="weui-tab" key='2'>
            <div className="weui-tab__panel">
                <div className="weui-cells mt0">

                    <div className="weui-cell ">
                        <div className="weui-cell__bd">
                            <h4>前置滤芯</h4>
                        </div>
                        <div className="weui-cell__ft">20um粗滤</div>
                    </div>
                    <div className="weui-cell ">
                        <div className="weui-cell__bd">
                            <h4>主机</h4>
                        </div>
                        <div className="weui-cell__ft">80G</div>
                    </div>
                    <div className="weui-cell ">
                        <div className="weui-cell__bd">
                            <h4>后置滤芯</h4>
                        </div>
                        <div className="weui-cell__ft">活性炭</div>
                    </div>
                    <div className="weui-cell ">
                        <div className="weui-cell__bd">
                            <h4>其他配置</h4>
                        </div>
                        <div className="weui-cell__ft">无</div>
                    </div>

                    <h2>其他</h2>
                    <div className="weui-cell as">
                        <div className="weui-cell__bd">
                            <p>内容展示</p>
                        </div>

                    </div>
                </div> </div>

        </div>];
}


export default Equipmentlist;

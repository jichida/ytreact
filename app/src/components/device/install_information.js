import React from 'react';
import Header from '../common/header';

const Installinformation = () => {
    return [
        <Header title='安装环境' key='1' />,
        <div className="weui-tab" key='2'>
            <div className="weui-tab__panel">
                <div className="weui-cells mt0">
                    <div className="weui-cell ">
                        <div className="weui-cell__bd">
                            <h4>安装地点</h4>
                        </div>
                        <div className="weui-cell__ft">设备间</div>
                    </div>

                    <div className="weui-cell ">
                        <div className="weui-cell__bd">
                            <h4>是否避光</h4>
                        </div>
                        <div className="weui-cell__ft">是</div>
                    </div>

                    <div className="weui-cell ">
                        <div className="weui-cell__bd">
                            <h4>墙面材料</h4>
                        </div>
                        <div className="weui-cell__ft">水泥墙</div>
                    </div>

                    <div className="weui-cell ">
                        <div className="weui-cell__bd">
                            <h4>主机安装方式</h4>
                        </div>
                        <div className="weui-cell__ft">落地</div>
                    </div>

                    <div className="weui-cell ">
                        <div className="weui-cell__bd">
                            <h4>安装空间</h4>
                        </div>
                        <div className="weui-cell__ft">长12m，宽10m，高20m</div>
                    </div>

                    <div className="weui-cell ">
                        <div className="weui-cell__bd">
                            <h4>管径大小</h4>
                        </div>
                        <div className="weui-cell__ft">进水10m，出水10m，地漏10m</div>
                    </div>

                    <div className="weui-cell ">
                        <div className="weui-cell__bd">
                            <h4>排水距离</h4>
                        </div>
                        <div className="weui-cell__ft">10m</div>
                    </div>

                    <div className="weui-cell ">
                        <div className="weui-cell__bd">
                            <h4>管路材质</h4>
                        </div>
                        <div className="weui-cell__ft">不锈钢</div>
                    </div>

                    <div className="weui-cell ">
                        <div className="weui-cell__bd">
                            <h4>有无WIFI</h4>
                        </div>
                        <div className="weui-cell__ft">有</div>
                    </div>

                    <div className="weui-cell ">
                        <div className="weui-cell__bd">
                            <h4>有无电源</h4>
                        </div>
                        <div className="weui-cell__ft">有</div>
                    </div>
                </div>
            </div>
        </div>];
}


export default Installinformation;

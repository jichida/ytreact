import React from 'react';
import Header from '../common/header';

const Waterinformation = () => {
    return [
        <Header title='用水信息' key='1' />,
        <div className="weui-tab" key='2'>
            <div className="weui-tab__panel">
                <div className="weui-cells mt0">


                    <div className="weui-cell ">
                        <div className="weui-cell__bd">
                            <h4>月用水量（吨）</h4>
                        </div>
                        <div className="weui-cell__ft">10吨</div>
                    </div>

                    <div className="weui-cell ">
                        <div className="weui-cell__bd">
                            <h4>用水人数（人）</h4>
                        </div>
                        <div className="weui-cell__ft">8人</div>
                    </div>

                    <div className="weui-cell ">
                        <div className="weui-cell__bd">
                            <h4>直饮水点量（个）</h4>
                        </div>
                        <div className="weui-cell__ft">5个</div>
                    </div>

                    <div className="weui-cell ">
                        <div className="weui-cell__bd">
                            <h4>原水水压（公斤）</h4>
                        </div>
                        <div className="weui-cell__ft">4公斤</div>
                    </div>

                    <div className="weui-cell ">
                        <div className="weui-cell__bd">
                            <h4>需装增压汞</h4>
                        </div>
                        <div className="weui-cell__ft">是</div>
                    </div>

                    <div className="weui-cell ">
                        <div className="weui-cell__bd">
                            <h4>卫浴间数量（个）</h4>
                        </div>
                        <div className="weui-cell__ft">4个</div>
                    </div>

                    <div className="weui-cell ">
                        <div className="weui-cell__bd">
                            <h4>是否分流</h4>
                        </div>
                        <div className="weui-cell__ft">是</div>
                    </div>

                    <div className="weui-cell ">
                        <div className="weui-cell__bd">
                            <h4>进水水源</h4>
                        </div>
                        <div className="weui-cell__ft">地下水</div>
                    </div>

                    <div className="weui-cell ">
                        <div className="weui-cell__bd">
                            <h4>原水TDS值（mg/l）</h4>
                        </div>
                        <div className="weui-cell__ft">100mg/l</div>
                    </div>

                    <div className="weui-cell ">
                        <div className="weui-cell__bd">
                            <h4>原水电导率（us/cm）</h4>
                        </div>
                        <div className="weui-cell__ft">154uS/cm</div>
                    </div>

                    <div className="weui-cell ">
                        <div className="weui-cell__bd">
                            <h4>原水硬度（ppm）</h4>
                        </div>
                        <div className="weui-cell__ft">4562ppm</div>
                    </div>

                    <div className="weui-cell ">
                        <div className="weui-cell__bd">
                            <h4>原水碱度（ppm）</h4>
                        </div>
                        <div className="weui-cell__ft">100ppm</div>
                    </div>

                    <div className="weui-cell ">
                        <div className="weui-cell__bd">
                            <h4>PH值</h4>
                        </div>
                        <div className="weui-cell__ft">88</div>
                    </div>

                    <div className="weui-cell ">
                        <div className="weui-cell__bd">
                            <h4>出水TDS值设定（mg/l）</h4>
                        </div>
                        <div className="weui-cell__ft">80mg/l</div>
                    </div>
                </div>
            </div>
        </div>];
}


export default Waterinformation;

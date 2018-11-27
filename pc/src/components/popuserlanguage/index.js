import React from 'react';

const PopUserLanguage = ()=>{

  return (<div id="div1">
        <div className="weui-mask"></div>
        <div className="weui-actionsheet weui-actionsheet_toggle">
            <div className="weui-actionsheet__title">
                <p className="weui-actionsheet__title-text">选择当前使用语言</p>
            </div>
            <div className="weui-actionsheet__menu">
                <div className="weui-actionsheet__cell active">English</div>
                <div className="weui-actionsheet__cell">中文简</div>
                <div className="weui-actionsheet__cell">中文繁</div>
            </div>
            <div className="weui-actionsheet__action">
                <div className="weui-actionsheet__cell" onclick="toggle('div1')">
                    确定
                </div>
            </div>
        </div>
    </div>);
}

export default PopUserLanguage;

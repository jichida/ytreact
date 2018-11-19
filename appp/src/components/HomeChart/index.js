import React from 'react';
import { Progress } from 'antd-mobile';

import './index.less';

// const CRed = '#ff2728';
// const CGreen = '#3eef7d';
// const CBlue = '#38b4f2';

const progress = {
    borderRadius: '200px',
}

export default({title, firsttitle, firstcolor, firstpercent, secondtitle, secondcolor, secondpercent}) => (
    <div className="chartcontainer">
        <p>{title}</p>
        <p style={{color: firstcolor}}>{firsttitle}</p>
        <div><Progress percent={firstpercent} 
            position="normal" 
            style={{...progress}} 
            barStyle={{...progress, borderColor: firstcolor}} />
        </div>
        <p style={{color: secondcolor}}>{secondtitle}</p>
        <div><Progress percent={secondpercent} 
            position="normal" 
            style={{...progress}} 
            barStyle={{...progress, borderColor: secondcolor}} />
        </div>
    </div>
)
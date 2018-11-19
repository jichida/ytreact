import React, { PureComponent } from 'react';
import { Flex, WhiteSpace } from 'antd-mobile';


import './index.less';
 
const abnormal = [
    {
        text: '零件故障',
    },
    {
        text: '泵',
    },
    {
        text: '程序',
    },
    {
        text: '流量',
    },
    {
        text: '漏水',
    },
    {
        text: '出水传感器',
    },
    {
        text: 'Mod out',
    },
    {
        text: '时钟',
    },
    {
        text: '压力传感器',
    },
];

const normal = [
    {
        text: '零件故障',
    },
    {
        text: '泵',
    },
    {
        text: '程序',
    },
];

class Abnormal extends PureComponent{

    renderList = (arr, style)=>{
        let items=[];
        let sub = [];
        let i=0;
        while(i<arr.length-1)
        {
            for(let j=0;j<3;j++)
            {
                if(i<=arr.length-1)
                {
                    sub.push(<Flex.Item key={arr[i].text} className="item-container"><div className={style}><span>{arr[i].text}</span></div></Flex.Item>)
                }
                i++;
            }
            items.push(<Flex key={i}>{sub}</Flex>);
            sub = [];
            
        }
        return items;
    }


    render () {
        return (
            <div className="bg">
                <Flex direction="column">
                    <div style={{width: "100%"}}>
                        {this.renderList(abnormal, 'red-circle')}
                    </div>
                    <WhiteSpace />
                    <p className="normal_title">正常</p>
                    <div style={{width: "100%"}}>
                        {this.renderList(normal, 'green-circle')}
                    </div>
                </Flex>
            </div>
        )
    }
}

export default Abnormal;
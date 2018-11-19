import React, { PureComponent } from 'react';
import { Flex, Accordion } from 'antd-mobile';


import './index.less';

const data = [
    {
        title: "平均电流@600",
        sub: [
            {
                title: '平均',
                content: '320',
            },
            {
                title: '最小',
                content: '320',
            },
            {
                title: '最大',
                content: '320',
            },
        ],
    },
    {
        title: "平均电流@300",
        sub: [
            {
                title: '平均',
                content: '320',
            },
            {
                title: '最小',
                content: '320',
            },
            {
                title: '最大',
                content: '320',
            },
        ],
    },
    {
        title: "平均CUT@600",
        sub: [
            {
                title: '平均',
                content: '320',
            },
            {
                title: '最小',
                content: '320',
            },
            {
                title: '最大',
                content: '320',
            },
        ],
    },
    {
        title: "平均CUT@300",
        sub: [
            {
                title: '平均',
                content: '320',
            },
            {
                title: '最小',
                content: '320',
            },
            {
                title: '最大',
                content: '320',
            },
        ],
    },
    {
        title: "净水率",
        sub: [
            {
                title: '平均',
                content: '320',
            },
            {
                title: '最小',
                content: '320',
            },
            {
                title: '最大',
                content: '320',
            },
        ],
    }
]
 

class Performance extends PureComponent{

    renderList = (data)=> {
        return data.map((item)=>{
            return (
                <Accordion.Panel key={item.title} header={item.title} className="pad">
                    <Flex>
                        { this.renderSub(item.sub)}
                    </Flex>
                </Accordion.Panel>
            )
        })
    }

    renderSub = (subdata)=>{
        return subdata.map((item)=>{
            return (
                <Flex.Item key={item.title} className="item_container">
                    <div>
                        <p className="title">{item.title}</p>
                        <p className="content">{item.content}</p>
                    </div>
                </Flex.Item>
            )
        })
    }


    render () {
        return (
            <div className="bg">
                <Accordion accordion defaultActiveKey="0" className="pad">
                    { this.renderList(data)}
                </Accordion>
            </div>
        )
    }
}

export default Performance;
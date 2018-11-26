import React, { PureComponent } from 'react';
import { Flex, Accordion, WhiteSpace } from 'antd-mobile';


import './index.less';



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
          const devicedata = {
            averagecurrent_600:300,//平均电流@600	600电导率时的电流:mA	1 word
            averagecurrent_300:200,//300电导率时的电流:mA	1 word
            averagecut_600:350,//16	平均cut@600	600电导率时的cut	1 word
            averagecut_300:150,// 17	平均cut@300	300电导率时的cut	1 word
            waterpurificationrate:90,//18	净水率	回收率  日用水量/(日用水量+日废水量)	1 byte

            max_averagecurrent_600:120,//平均电流@600	600电导率时的电流:mA	1 word
            max_averagecurrent_300:100,//300电导率时的电流:mA	1 word
            max_averagecut_600:170,//16	平均cut@600	600电导率时的cut	1 word
            max_averagecut_300:70,// 17	平均cut@300	300电导率时的cut	1 word
            max_waterpurificationrate:19,//18	净水率	回收率  日用水量/(日用水量+日废水量)	1 byte

            min_averagecurrent_600:6,//平均电流@600	600电导率时的电流:mA	1 word
            min_averagecurrent_300:5,//300电导率时的电流:mA	1 word
            min_averagecut_600:4,//16	平均cut@600	600电导率时的cut	1 word
            min_averagecut_300:3,// 17	平均cut@300	300电导率时的cut	1 word
            min_waterpurificationrate:2,//18	净水率	回收率  日用水量/(日用水量+日废水量)	1 byte
          };


          const data = [
              {
                  title: "平均电流@600",
                  sub: [
                      {
                          title: '平均',
                          content: `${devicedata.averagecurrent_600}`,
                      },
                      {
                          title: '最小',
                          content:  `${devicedata.min_averagecurrent_600}`,
                      },
                      {
                          title: '最大',
                          content:  `${devicedata.max_averagecurrent_600}`,
                      },
                  ],
              },
              {
                  title: "平均电流@300",
                  sub: [
                      {
                          title: '平均',
                          content: `${devicedata.averagecurrent_300}`,
                      },
                      {
                          title: '最小',
                          content: `${devicedata.min_averagecurrent_300}`,
                      },
                      {
                          title: '最大',
                          content: `${devicedata.max_averagecurrent_300}`,
                      },
                  ],
              },
              {
                  title: "平均CUT@600",
                  sub: [
                    {
                        title: '平均',
                        content: `${devicedata.averagecut_600}`,
                    },
                    {
                        title: '最小',
                        content:  `${devicedata.min_averagecut_600}`,
                    },
                    {
                        title: '最大',
                        content:  `${devicedata.max_averagecut_600}`,
                    },
                  ],
              },
              {
                  title: "平均CUT@300",
                  sub: [
                    {
                        title: '平均',
                        content: `${devicedata.averagecut_300}`,
                    },
                    {
                        title: '最小',
                        content:  `${devicedata.min_averagecut_300}`,
                    },
                    {
                        title: '最大',
                        content:  `${devicedata.max_averagecut_300}`,
                    },
                  ],
              },
              {
                  title: "净水率",
                  sub: [
                    {
                        title: '平均',
                        content: `${devicedata.waterpurificationrate}`,
                    },
                    {
                        title: '最小',
                        content:  `${devicedata.min_waterpurificationrate}`,
                    },
                    {
                        title: '最大',
                        content:  `${devicedata.max_waterpurificationrate}`,
                    },
                  ],
              }
          ]
          return (
            <div className="fh_container">
                <div className="fp_container">
                    <div className="panel">
                        <div className="performance">
                        <WhiteSpace />
                        <Accordion accordion defaultActiveKey="0" className="pad">
                            { this.renderList(data)}
                        </Accordion>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Performance;

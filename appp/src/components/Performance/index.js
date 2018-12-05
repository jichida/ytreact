import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Flex, Accordion, WhiteSpace } from 'antd-mobile';
import { injectIntl } from 'react-intl';

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
        return subdata.map((item,k)=>{
            return (
                <Flex.Item key={k} className="item_container">
                    <div>
                        <p className="title">{item.title}</p>
                        <p className="content">{item.content}</p>
                    </div>
                </Flex.Item>
            )
        })
    }


    render () {
          const {performancedata} = this.props;
          const devicedata = performancedata;
          const {intl} = this.props;

          const data = [
              {
                  title: intl.formatMessage({id:`home.show.performance.averagecurrent_600`}),
                  sub: [
                      {
                          title: intl.formatMessage({id:`home.show.performance.average`}),
                          content: `${devicedata.averagecurrent_600}`,
                      },
                      {
                          title: intl.formatMessage({id:`home.show.performance.min`}),
                          content:  `${devicedata.min_averagecurrent_600}`,
                      },
                      {
                          title: intl.formatMessage({id:`home.show.performance.max`}),
                          content:  `${devicedata.max_averagecurrent_600}`,
                      },
                  ],
              },
              {
                  title: intl.formatMessage({id:`home.show.performance.averagecurrent_300`}),
                  sub: [
                      {
                          title: intl.formatMessage({id:`home.show.performance.average`}),
                          content: `${devicedata.averagecurrent_300}`,
                      },
                      {
                          title: intl.formatMessage({id:`home.show.performance.min`}),
                          content: `${devicedata.min_averagecurrent_300}`,
                      },
                      {
                          title: intl.formatMessage({id:`home.show.performance.max`}),
                          content: `${devicedata.max_averagecurrent_300}`,
                      },
                  ],
              },
              {
                  title: intl.formatMessage({id:`home.show.performance.averagecut_600`}),
                  sub: [
                    {
                        title: intl.formatMessage({id:`home.show.performance.average`}),
                        content: `${devicedata.averagecut_600}`,
                    },
                    {
                        title: intl.formatMessage({id:`home.show.performance.min`}),
                        content:  `${devicedata.min_averagecut_600}`,
                    },
                    {
                        title: intl.formatMessage({id:`home.show.performance.max`}),
                        content:  `${devicedata.max_averagecut_600}`,
                    },
                  ],
              },
              {
                  title:intl.formatMessage({id:`home.show.performance.averagecut_300`}),
                  sub: [
                    {
                        title: intl.formatMessage({id:`home.show.performance.average`}),
                        content: `${devicedata.averagecut_300}`,
                    },
                    {
                        title: intl.formatMessage({id:`home.show.performance.min`}),
                        content:  `${devicedata.min_averagecut_300}`,
                    },
                    {
                        title: intl.formatMessage({id:`home.show.performance.max`}),
                        content:  `${devicedata.max_averagecut_300}`,
                    },
                  ],
              },
              {
                  title:intl.formatMessage({id:`home.show.performance.waterpurificationrate`}),
                  sub: [
                    {
                        title: intl.formatMessage({id:`home.show.performance.average`}),
                        content: `${devicedata.waterpurificationrate}`,
                    },
                    {
                        title: intl.formatMessage({id:`home.show.performance.min`}),
                        content:  `${devicedata.min_waterpurificationrate}`,
                    },
                    {
                        title: intl.formatMessage({id:`home.show.performance.max`}),
                        content:  `${devicedata.max_waterpurificationrate}`,
                    },
                  ],
              }
          ]
          return (
            <div className="panel">
                <div className="performance">
                <WhiteSpace />
                <Accordion accordion defaultActiveKey="0" className="pad">
                    { this.renderList(data)}
                </Accordion>
                </div>
            </div>
        )
    }
}
const mapStateToProps =  ({devicedata:{performancedata}}) =>{
  return {performancedata};
};
Performance = connect(mapStateToProps)(Performance);
export default injectIntl(Performance);

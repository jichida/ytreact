import React from 'react';
import { Layout } from 'antd';
import isEqual from 'lodash/isEqual';
import memoizeOne from 'memoize-one';
// import { connect } from 'react-redux';
import { ContainerQuery } from 'react-container-query';
import classNames from 'classnames';
import { enquireScreen, unenquireScreen } from 'enquire-js';
import { withRouter } from 'react-router-dom';
import logo from '../../assets/title2.png';
import Header from './Header';
import '../common.less';

import menuDatas from './router.config.js';

const setting = {
    "navTheme": "dark",
    "primaryColor": "#1890FF",
    "layout": "topmenu",
    "contentWidth": "Fixed",
    "fixedHeader": false,
    "autoHideHeader": false,
    "fixSiderbar": false,
    "collapse": true
}

// Conversion router to menu.
function formatter(data, parentAuthority, parentName) {
  return data
    .map(item => {
      if (!item.name || !item.path) {
        return null;
      }

      let locale = 'menu';
      if (parentName) {
        locale = `${parentName}.${item.name}`;
      } else {
        locale = `menu.${item.name}`;
      }

      const result = {
        ...item,
        // name: formatMessage({ id: locale, defaultMessage: item.name }),
        name: item.name,
        locale,
        authority: item.authority || parentAuthority,
      };
      if (item.routes) {
        const children = formatter(item.routes, item.authority, locale);
        // Reduce memory usage
        result.children = children;
      }
      delete result.routes;
      return result;
    })
    .filter(item => item);
}

const memoizeOneFormatter = memoizeOne(formatter, isEqual);

const query = {
  'screen-xs': {
    maxWidth: 575,
  },
  'screen-sm': {
    minWidth: 576,
    maxWidth: 767,
  },
  'screen-md': {
    minWidth: 768,
    maxWidth: 991,
  },
  'screen-lg': {
    minWidth: 992,
    maxWidth: 1199,
  },
  'screen-xl': {
    minWidth: 1200,
    maxWidth: 1599,
  },
  'screen-xxl': {
    minWidth: 1600,
  },
};

class BasicLayout extends React.PureComponent {

  state = {
    rendering: true,
    isMobile: false,
    menuData: this.getMenuData(),
  };

  componentDidMount() {
    // const { dispatch } = this.props;
    // //获取当前用户
    // dispatch({
    //   type: 'user/fetchCurrent',
    // });
    // //获取app配置，如整体风格、primary颜色、导航菜单位置...等。
    // dispatch({
    //   type: 'setting/getSetting',
    // });
    this.renderRef = requestAnimationFrame(() => {
      this.setState({
        rendering: false,
      });
    });
    this.enquireHandler = enquireScreen(mobile => {
      const { isMobile } = this.state;
      if (isMobile !== mobile) {
        this.setState({
          isMobile: mobile,
        });
      }
    });
  }


  componentWillUnmount() {
    cancelAnimationFrame(this.renderRef);
    unenquireScreen(this.enquireHandler);
  }

  getMenuData() {
    return memoizeOneFormatter(menuDatas);
  }


  getContentStyle = () => {
    const { fixedHeader } = setting;
    return {
      margin: '24px 24px 0',
      paddingTop: fixedHeader ? 64 : 0,
    };
  };


  render() {

    const {
      children,
    } = this.props;
    const { isMobile, menuData } = this.state;
    const layout = (
        <Layout
          style={{
            minHeight: '100vh',
          }}
        >
          <Header
            menuData={menuData}
            logo={logo}
            isMobile={isMobile}
            setting={setting}
            {...this.props}
          />
              {children}
        </Layout>
    );
    return (
      <React.Fragment>
          {/* <ContainerQuery query={query}>
            {params => ( */}
                <div>{layout}</div>
            {/* )}
          </ContainerQuery> */}
      </React.Fragment>
    );
  }
}

export default withRouter(BasicLayout);

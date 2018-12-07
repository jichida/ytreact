import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { Menu, Icon, Dropdown } from 'antd';
import './index.less';
import language_img from '../../assets/login_iconc.png';

// const language = {
//   'zh-CN': '简体中文',
//   'zh-TW': '繁体中文',
//   'en-US': 'English',
// }

export default class SelectLang extends PureComponent {
  changLang = ({ key }) => {
    // setLocale(key);
  };

  render() {
    const selectedLang = 'zh-CN';
    const langMenu = (
      <Menu className="menu" selectedKeys={[selectedLang]} onClick={this.changLang}>
        <Menu.Item key="zh-CN">
          <span role="img" aria-label="简体中文">
            🇨🇳
          </span>{' '}
          简体中文
        </Menu.Item>
        <Menu.Item key="zh-TW">
          <span role="img" aria-label="繁体中文">
            🇭🇰
          </span>{' '}
          繁体中文
        </Menu.Item>
        <Menu.Item key="en-US">
          <span role="img" aria-label="English">
            🇬🇧
          </span>{' '}
          English
        </Menu.Item>
      </Menu>
    );
    return (
      
      <Dropdown overlay={langMenu} placement="bottomRight">
        <span>
          <img src={language_img} alt="" />
          <span style={{color: '#fff',marginLeft: '5px', marginRight:'5px'}}>简体中文</span>
          <Icon type="down" style={{color: '#fff'}} />
        </span>
      </Dropdown> 
      
    );
  }
}

import React, { PureComponent } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import {ui_set_language} from '../../actions';
import { Menu, Icon, Dropdown } from 'antd';
import './index.less';
import language_img from '../../assets/login_iconc.png';

// const language = {
//   'zh-CN': '简体中文',
//   'zh-TW': '繁体中文',
//   'en-US': 'English',
// }

class SelectLang extends PureComponent {
  changLang = ({ key }) => {
    // setLocale(key);
    // console.log(key)
    debugger;
    const {dispatch} = this.props;
    dispatch(ui_set_language(key));
  };

  render() {
    const selectedLang = this.props.locale;
    debugger;
    const langMenu = (
      <Menu className="menu" selectedKeys={[selectedLang]} onClick={(v)=>{this.changLang(v)}}>
        <Menu.Item key="zh-cn">
          <span role="img" aria-label="简体中文">
            🇨🇳
          </span>{' '}
          简体中文
        </Menu.Item>
        <Menu.Item key="zh-tw">
          <span role="img" aria-label="繁体中文">
            🇭🇰
          </span>{' '}
          繁体中文
        </Menu.Item>
        <Menu.Item key="en">
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

const mapStateToProps =  ({app:{locale}}) =>{
  return {locale};
};
SelectLang = connect(mapStateToProps)(SelectLang);
export default SelectLang;

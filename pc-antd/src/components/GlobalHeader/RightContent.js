import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { Spin, Menu, Icon, Dropdown, Avatar, Badge } from 'antd';
import { Link } from 'react-router-dom';
import SelectLang from '../SelectLang';
import './index.less';
import message_img from '../../assets/message.png';
import user_img from '../../assets/tx.png';

const currentUser = {
  name: '华为华为华为',
  avatar: user_img,
}


export default class GlobalHeaderRight extends PureComponent {

  render() {
    const {
      // currentUser,
      onMenuClick,
      theme,
    } = this.props;

    

    // 用户登录信息菜单
    const menu = (
      <Menu className="menu" selectedKeys={[]} onClick={onMenuClick}>
        <Menu.Item key="logout">
          <Icon type="logout" />
          <FormattedMessage id="user.logout" defaultMessage="logout" />
        </Menu.Item>
      </Menu>
    );


    let className = 'right';
    if (theme === 'dark') {
      className = `right dark`;
    }

    return (
      <div className={className}>
        <div style={{display: 'inline-block'}}>
          <Badge dot>
            <Link to="/notice">
              <img src={message_img} alt="" />
            </Link>
          </Badge>
        </div>
        <span style={{padding: '0 20px', color: "#fff"}}>|</span>
        <SelectLang className="action" />
        {/* 用户 currentUser.name */}
        { true ? (
          <Dropdown overlay={menu}>
            <span className={`action account`}>
              <Avatar
                size="large"
                className="avatar"
                src={currentUser.avatar}
                alt="avatar"
              />
              <span className="name">{currentUser.name}</span>
              <Icon type="down" />
            </span>
          </Dropdown>
        ) : (
          <Spin size="small" style={{ marginLeft: 8, marginRight: 8 }} />
        )}
       
      </div>
    );
  }
}

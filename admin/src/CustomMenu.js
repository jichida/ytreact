import React, {Component} from 'react'
import { connect } from 'react-redux'
import compose from 'recompose/compose'
// import SettingsIcon from '@material-ui/icons/Settings'
import { translate, MenuItemLink, DashboardMenuItem } from 'react-admin'
import { ListItem, List, Collapse, ListItemText, ListItemIcon, Divider} from '@material-ui/core'
import { ExpandLess, ExpandMore } from '@material-ui/icons'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

import Csystemconfig from '@material-ui/icons/Settings' //系统设置
import Cshop from '@material-ui/icons/Store' //商铺
import Ctypeofwork from '@material-ui/icons/Gavel' //工种
import Cproduct from '@material-ui/icons/AddShoppingCart' //产品
import Ccategory from '@material-ui/icons/Menu' //列别
import Cpostagetemplate from '@material-ui/icons/DirectionsSubway' //运费模版
import Caddressconst from '@material-ui/icons/Domain' //省市区地址
import Cexpress from '@material-ui/icons/AirportShuttle' //快递
import Cbanner from '@material-ui/icons/Apps' //广告条
import Ctopic from '@material-ui/icons/Chat' //圈子帖子
import Ccomments from '@material-ui/icons/Comment' //评论
import Cuser from '@material-ui/icons/Group' //用户
import Cdevice from '@material-ui/icons/DevicesOther' //设备
import Cabout from '@material-ui/icons/Announcement' //关于
import Corder from '@material-ui/icons/Announcement' //关于
import Cwithdraw from '@material-ui/icons/Announcement' //关于
import Ctag from '@material-ui/icons/Announcement' //关于


import  Gsettings from '@material-ui/icons/Book'
import  Gshop from '@material-ui/icons/Book'
import  Guser from '@material-ui/icons/ViewDay'
import  Gdevice from '@material-ui/icons/ViewDay'
import  Gform from '@material-ui/icons/ViewDay'
import  Gwebsite from '@material-ui/icons/ViewDay'
const items = [
  {
    name: 'settings',
    icon:<Gsettings/>,
      nested: [
        { name: 'systemconfig', icon: <Csystemconfig /> },
        { name: 'typeofwork', icon: <Ctypeofwork /> },
        { name: 'addressconst', icon: <Caddressconst /> },
        { name: 'express', icon: <Cexpress /> },
        { name: 'postagetemplate', icon: <Cpostagetemplate /> },
        { name: 'tag', icon: <Ctag /> },
        { name: 'about', icon: <Cabout /> },

      ]
  },
  {
    name: 'shop',
    icon:<Gshop/>,
      nested: [
        { name: 'shop', icon: <Cshop /> },
        { name: 'order', icon: <Corder /> },
        { name: 'withdraw', icon: <Cwithdraw /> },
        { name: 'product', icon: <Cproduct /> },
        { name: 'category', icon: <Ccategory /> },
        { name: 'recommendhistory', icon: <Cshop /> },
      ]
  },
  {
        name: 'user',
        icon:<Guser />,
        nested: [
          { name: 'user', icon: <Cuser /> },
        ]
    },
    {
      name: 'device',
      icon:<Gdevice/>,
        nested: [
          { name: 'device', icon: <Cdevice /> },
          { name: 'realtimedata', icon: <Cdevice /> },
          { name: 'devicedatahistory', icon: <Cdevice /> },

        ]
    },
   {
        name: 'form',
        icon:<Gform />,
        nested: [
          { name: 'banner', icon: <Cbanner /> },
          { name: 'topic', icon: <Ctopic /> },
          { name: 'comments', icon: <Ccomments /> },
        ]
    },
    {
      name: 'website',
      icon:<Gwebsite/>,
        nested: [
          { name: 'link', icon: <Csystemconfig /> },
        ]
    },
]

const styles = {
  main: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  button: {
    alignItems: 'center',
    left: '9%'
  }
}

class Menu extends Component {
  state = {
    settings:true,
    shop:true,
    user:true,
    form:true,
    device:true,
  };

  handleClick = (e) => {
    this.setState({ [e]: !this.state[e] })
  };

  render () {
    const { onMenuClick, translate } = this.props
      return (
        <List style={styles.main}>
            <div>
              <DashboardMenuItem onClick={onMenuClick} />
            </div>
            <Divider />
            {items.map(title => (
            <div key={title.name}>
              {title.nested != null ? (
                <div>
                  <ListItem button onClick={this.handleClick.bind(this, title.name)} >
                    <ListItemIcon>
                      {title.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={translate(`resources.menu.${title.name}`, {
                        smart_count: 2
                      })}
                    />
                    {this.state[title.name] ? <ExpandLess /> : <ExpandMore />}
                  </ListItem>
                  <Collapse component='li' in={this.state[title.name]} timeout='auto' unmountOnExit>
                    <List disablePadding>
                      {title.nested.map(resources => {
                        return (
                          <MenuItemLink
                            key={resources.name}
                            to={`/${resources.name}`}
                            style={styles.button}
                            primaryText={translate(`resources.${resources.name}.name`, {
                              smart_count: 2
                            })}
                            leftIcon={resources.icon}
                            onClick={onMenuClick}
                          />
                        )
                      })}
                    </List>
                  </Collapse>
                </div>
              ) : (
                <div>
                  <MenuItemLink
                    key={title.name}
                    to={`/${title.name}`}
                    primaryText={translate(`resources.${title.name}.name`, {
                      smart_count: 2
                    })}
                    leftIcon={title.icon}
                    onClick={onMenuClick}
                  />
                </div>
              )}
            </div>
          ))}
        </List>
      )
    }
}
const enhance = compose(
  withRouter,
  connect(
    state => ({
      locale: state.i18n.locale
    }),
    {}
  ),
  translate
)

Menu.propTypes = {
  onMenuClick: PropTypes.func,
  translate: PropTypes.func
}

export default enhance(Menu)

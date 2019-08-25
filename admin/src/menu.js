import React from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
// import SettingsIcon from '@material-ui/icons/Settings';
// import LabelIcon from '@material-ui/icons/Label';
import {
    translate,
    DashboardMenuItem,
    MenuItemLink,
    // Responsive,
} from 'react-admin';
import { withRouter } from 'react-router-dom';

import Csystemconfig from '@material-ui/icons/Settings' //系统设置
import Cshop from '@material-ui/icons/Store' //商铺
// import Ctypeofwork from '@material-ui/icons/Gavel' //工种
// import Cproduct from '@material-ui/icons/AddShoppingCart' //产品
// import Ccategory from '@material-ui/icons/Menu' //列别
// import Cpostagetemplate from '@material-ui/icons/DirectionsSubway' //运费模版
import Caddressconst from '@material-ui/icons/Domain' //省市区地址
// import Cexpress from '@material-ui/icons/AirportShuttle' //快递
// import Cbanner from '@material-ui/icons/Apps' //广告条
// import Ctopic from '@material-ui/icons/Chat' //圈子帖子
// import Ccomments from '@material-ui/icons/Comment' //评论
import Cuser from '@material-ui/icons/Group' //用户
import Cdevice from '@material-ui/icons/DevicesOther' //设备
import Cdevicehistory from '@material-ui/icons/DevicesOther' //设备
import Csurvey from '@material-ui/icons/Headset' //关于
// import Ctag from '@material-ui/icons/Announcement' //关于

const items = [
    // { name: 'systemconfig', icon: <Csystemconfig /> },
    { name: 'deviceuser', icon: <Cdevice /> },
    { name: 'distributor', icon: <Cshop /> },
    { name: 'installer', icon: <Cuser /> },
    { name: 'addressconst', icon: <Caddressconst /> },
    { name: 'devicedatahistory', icon: <Cdevicehistory /> },
    { name: 'survey', icon: <Csurvey /> },
];

const Menu = ({ onMenuClick, translate, logout }) => (
    <div>
        <DashboardMenuItem onClick={onMenuClick} />
        {items.map(item => (
            <MenuItemLink
                key={item.name}
                to={`/${item.name}`}
                primaryText={translate(`resources.${item.name}.name`, {
                    smart_count: 2,
                })}
                leftIcon={item.icon}
                onClick={onMenuClick}
            />
        ))}
    </div>
);

const enhance = compose(
    withRouter,
    connect(
        state => ({
            theme: state.theme,
            locale: state.i18n.locale,
        }),
        {}
    ),
    translate
);

export default enhance(Menu);

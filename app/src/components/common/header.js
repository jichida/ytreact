import React from 'react';
import { withRouter } from 'react-router-dom';
import {NavBar,Icon} from 'antd-mobile';

let Header = (props)=>{
  return (<NavBar
      onLeftClick={()=>{
        props.history.goBack()
      }
      }
      mode="dark"
      icon={<Icon type="left" />}
    >{props.title}</NavBar>);
  // return (
  //   <header className="header header_top">
  //       <Link to = '/'>
  //       <span className="left-icon"></span>
  //   </Link>
  //   <div className="header_title">{props.title}</div>
  // </header>);

}
Header = withRouter(Header);
export default Header;

import React,{ Component } from 'react';

import IndexTop from './index_top';
import IndexNav from './index_nav';
import IndexSearch from './index_search'

class Index extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div style={{
        background: `url(${require("../img/bg2.png")})`,
        backgroundPositionX: 'center',
        backgroundPositionY:'bottom',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        backgroundColor: '#f9fafb',
        backgroundAttachment: 'fixed',
        height:'100%'
  }}>
        <IndexTop />
      <div className="search_box">
        <IndexNav />
        <IndexSearch />
      </div>
      </div>
    );
  }
}

export default Index;

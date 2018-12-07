import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import './index.less';
import RightContent from './RightContent';

export default class GlobalHeader extends PureComponent {

  render() {
    const { isMobile, logo } = this.props;
    return (
      <div className="header">
        {isMobile && (
          <Link to="/" className="logo" key="logo">
            <img src={logo} alt="logo" width="32" />
          </Link>
        )}
        <RightContent {...this.props} />
      </div>
    );
  }
}

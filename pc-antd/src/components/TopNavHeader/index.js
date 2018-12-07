import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import RightContent from '../GlobalHeader/RightContent';
import BaseMenu from '../SiderMenu/BaseMenu';
import './index.less';

export default class TopNavHeader extends PureComponent {
  state = {
    maxWidth: undefined,
  };

  static getDerivedStateFromProps(props) {
    return {
      maxWidth: (props.contentWidth === 'Fixed' ? 1200 : window.innerWidth) - 280 - 165 - 40,
    };
  }

  render() {
    const { theme, contentWidth, logo } = this.props;
    const { maxWidth } = this.state;
    return (
      <div className={`head ${theme === 'light' ? 'light' : ''}`}>
        <div
          ref={ref => {
            this.maim = ref;
          }}
          className={`main ${contentWidth === 'Fixed' ? 'wide' : ''}`}
        >
          <div className="left">
            <div className="logo" key="logo" id="logo">
              <Link to="/">
                <img src={logo} alt="logo" />
              </Link>
            </div>
            <div style={{maxWidth }}>
              <BaseMenu {...this.props} style={{ border: 'none', height: 64, backgroundColor: 'transparent', paddingLeft: 50 }} />
            </div>
          </div>
          <RightContent {...this.props} />
        </div>
      </div>
    );
  }
}

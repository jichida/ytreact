import React from 'react';
import {injectIntl } from 'react-intl';

/**
 * Should only use this when not inside a React component (such as redux actions), see:
 * https://github.com/yahoo/react-intl/issues/416
 */
let intl = null;


class IntlGlobalProvider extends React.PureComponent{
  constructor(props) {
    super(props);
    intl = this.props.intl;
  }

 render() {
    intl = this.props.intl;
    return this.props.children;
  }
}

export {intl};
export default injectIntl(IntlGlobalProvider);

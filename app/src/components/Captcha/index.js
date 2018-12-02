import React from 'react'
import { Button } from 'antd-mobile';
import { injectIntl } from 'react-intl';

class Captcha extends React.PureComponent {
    state = {
        count: 0,
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    onGetCaptcha = () => {
        const { onGetCaptcha } = this.props;
        const result = onGetCaptcha ? onGetCaptcha() : null;
        if (result === false) {
          return;
        }
        if (result instanceof Promise) {
          result.then(this.runGetCaptchaCountDown);
        } else {
          this.runGetCaptchaCountDown();
        }
    };

    runGetCaptchaCountDown = () => {
        const { countDown } = this.props;
        let count = countDown || 59;
        this.setState({ count });
        this.interval = setInterval(() => {
          count -= 1;
          this.setState({ count });
          if (count === 0) {
            clearInterval(this.interval);
          }
        }, 1000);
    };
    
    

    render() {
        const { count } = this.state;
        const { type, size, cssName, intl } = this.props;

        return (
            <Button
                type={type}
                disabled={count}
                className={cssName}
                size={size}
                onClick={this.onGetCaptcha}
              >
                {count ? `${count} s` : intl.formatMessage({id: 'login.verification.send'})}
              </Button>
        )
    }
}

export default injectIntl(Captcha);
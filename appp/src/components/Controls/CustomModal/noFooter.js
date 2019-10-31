import React from 'react'
import { Modal } from 'antd-mobile'

function closest(el, selector) {
    const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
    while (el) {
      if (matchesSelector.call(el, selector)) {
        return el;
      }
      el = el.parentElement;
    }
    return null;
}

const Index = ({visible, className, onClose, title, children}) => {

    const onWrapTouchStart = (e) => {
        // fix touch to scroll background page on iOS
        if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
          return;
        }
        const pNode = closest(e.target, '.am-modal-content');
        if (!pNode) {
          e.preventDefault();
        }
    }

    return (
        <Modal
            visible={visible}
            className={`${className}-modal`}
            transparent
            maskClosable={false}
            onClose={onClose}
            title={title}
            wrapProps={{ onTouchStart: onWrapTouchStart }}
        >
            { children }
        </Modal>
    )
}

export default Index
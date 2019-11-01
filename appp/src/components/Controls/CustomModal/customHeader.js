import React, { useState } from 'react'
import { Modal, Checkbox } from 'antd-mobile'
import { injectIntl } from 'react-intl'

const AlowItem = Checkbox.CheckboxItem

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

const Index = ({visible, className, onClose, onCancel, onSubmit, title, children, footer, intl}) => {
    const [ allow, setAllow ] = useState(false)

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

    const handleSubmit = () => {
        if(allow) {
            setAllow(false)
            onSubmit()
        }
    }

    const handleCancel = () => {
      setAllow(false)
      onCancel()
    }

    const header = 
        <div className="reset-alert">
          <div className="title">{`${intl.formatMessage({id: 'form.confirm'})}`}</div>
          <div className="allow">
            <AlowItem
              className="allow-item" 
              onChange={() => {
                setAllow(!allow)
              }} 
            />
          </div>
        </div>

    const defaultFooter = [
      { text: `${footer ? footer[0] : intl.formatMessage({id: 'form.cancel'})}`, onPress: () => { handleCancel() } },
      { text: `${footer ? footer[1] : intl.formatMessage({id: 'form.ok'})}`, onPress: () => { handleSubmit() } }
    ]

    return (
        <Modal
            visible={visible}
            className={`${className}-modal`}
            transparent
            maskClosable={false}
            onClose={onClose}
            title={header}
            wrapProps={{ onTouchStart: onWrapTouchStart }}
            footer={defaultFooter}
        >
            { children }
        </Modal>
    )
}

export default injectIntl(Index) 
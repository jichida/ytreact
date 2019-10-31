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

const Index = ({visible, className, onCancel, onDelete, onSubmit, title, isEdit, children}) => {

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

    const handleCancelSubmit = () => { onCancel() }
    const handleContactSubmit = () => { onSubmit() }
    const handleDeleteSubmit = () => { onDelete() }

    const defaultButtons = [
        { text: 'Cancel', onPress: () => { handleCancelSubmit() }},
        { text: 'Submit', onPress: () => { handleContactSubmit() }}
    ]
    
    const editButtons = [
        { text: 'Cancel', onPress: () => { handleCancelSubmit() }},
        { text: 'Delete', onPress: () => { handleDeleteSubmit() }},
        { text: 'Submit', onPress: () => { handleContactSubmit() }}
    ]

    return (
        <Modal
            visible={visible}
            className={`${className}-modal`}
            transparent
            maskClosable={false}
            onClose={handleCancelSubmit}
            title={title}
            wrapProps={{ onTouchStart: onWrapTouchStart }}
            footer={ isEdit ? editButtons : defaultButtons}
        >
            { children }
        </Modal>
    )
}

export default Index
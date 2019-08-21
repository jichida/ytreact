import React, { PureComponent } from 'react';
import {  NavBar, Icon, Modal } from 'antd-mobile';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import lodashGet from 'lodash.get'
import { FormattedMessage, injectIntl } from 'react-intl';

import './index.less';

const alert = Modal.alert

class Index extends PureComponent{

    constructor(props) {
        super(props);
        this.state = {
            name: lodashGet(this.props, 'survey.name', '')
        }
    }

    handleBack = () => {
        const { intl: { formatMessage }, history } = this.props
        if(this.state.name !== lodashGet(this.props, 'survey.name', '')) {
            alert(`${formatMessage({id: 'survey.back'})}`, `${formatMessage({id: 'survey.back.warring'})}`, [
                { text: `${formatMessage({id: 'survey.cancel'})}`, onPress: () => console.log('cancel') },
                { text: `${formatMessage({id: 'survey.ok'})}`, onPress: () => history.goBack() },
              ])
        } else {
            history.goBack()
        }
    }

    handleNext = () => {
        const { survey, match, history} = this.props
        const id = lodashGet(match, 'params.id', '0')
        if(id === '0') {
            console.log('Create new survey')
        } else {
            console.log('Save the survey')
        }
        history.push(`/surveyedit/${id}`)
    }

    render () {
        const { intl: { formatMessage } }  = this.props;

        return (
            <div className="sub_bg">
                <NavBar
                    className="nav"
                    icon={<Icon type="left" />}
                    onLeftClick={this.handleBack}
                    rightContent={<span onClick={this.handleNext}><FormattedMessage id="survey.next" /></span>}
                >
                <FormattedMessage id="device.tools.survey" />
                </NavBar>
                <div className="sub_device_bg">
                    <div className="name-container">
                        <textarea 
                            className="name-input"
                            rows={5} 
                            value={this.state.name} 
                            placeholder={formatMessage({id: 'survey.name.placeholder'})}
                            onChange={(e) => this.setState({name: e.target.value})} 
                        />
                    </div>
                </div>
                
            </div>
        )
    }
}

const mapStateToProps =  (state, { match }) => {
    const id = lodashGet(match, 'params.id', '0')
    const survey = {
        _id: '1',
        name: '1'
    }

    return {
        survey
    }
}

export default connect(mapStateToProps)(withRouter(injectIntl(Index)))

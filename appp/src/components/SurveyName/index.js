import React, { PureComponent } from 'react';
import {  NavBar, Icon, Modal } from 'antd-mobile';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import lodashGet from 'lodash.get'
import { FormattedMessage, injectIntl } from 'react-intl';
import {savesurvey_request,savesurvey_result} from '../../actions';
import {callthen} from '../../sagas/pagination';
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
        const {  match, history} = this.props
        let _id = lodashGet(match, 'params.id', '0')
        if(this.state.name.trim() !== '') {
            this.props.dispatch(callthen(savesurvey_request,savesurvey_result,{_id,data:{name:this.state.name}})).then((surveynew)=>{
                history.push(`/surveyedit/${surveynew._id}`);
            }).catch((e)=>{
                console.log(e);
            })
        }
        
    }

    render () {
        const { intl: { formatMessage } }  = this.props;

        return (
            <div className="sub_bg">
                <NavBar
                    className="nav"
                    icon={<Icon type="left" />}
                    onLeftClick={this.handleBack}
                    rightContent={<span style={{color: `${this.state.name.trim() !== '' ? '#fff' : '#666'}`}} onClick={this.handleNext}><FormattedMessage id="survey.next" /></span>}
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

const mapStateToProps =  ({surveys:{surveys}}, { match }) => {
    const id = lodashGet(match, 'params.id', '0')
    const survey = lodashGet(surveys,`${id}`);
    console.log(survey);
    return {
        survey
    }
}

export default connect(mapStateToProps)(withRouter(injectIntl(Index)))

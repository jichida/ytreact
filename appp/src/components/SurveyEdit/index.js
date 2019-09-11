import React, { PureComponent } from 'react';
import {  NavBar, Icon, Modal } from 'antd-mobile';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import lodashSet from 'lodash.set'
import lodashget from 'lodash.get'
import { FormattedMessage, injectIntl } from 'react-intl';
import basic_img from '../../assets/sy2.png';
import water_img from '../../assets/sy3.png';
import install_img from '../../assets/sy4.png';
import BasicForm from './BasicForm';
import WaterForm from './WaterForm'
import InstallForm from './InstallForm'
import lodashGet from 'lodash.get'
import {savesurvey_request,savesurvey_result} from '../../actions';
import {callthen} from '../../sagas/pagination';

import './index.less';

const alert = Modal.alert

class Index extends PureComponent{

    constructor(props) {
        super(props);
        this.state = {
            curTab: 'basic',// basic, install, water
            survey: this.convertToUnit(this.props.survey)
        }
    }

    handleSave = () => {
        this.saveCurrent(this.state.curTab)

        const {  match, history } = this.props
        let _id = lodashGet(match, 'params.id', '0')
        setTimeout(() => {
            console.log('survey:', this.state.survey)
            this.props.dispatch(callthen(savesurvey_request,savesurvey_result,{_id,data: this.convertFromUnit(this.state.survey)})).then((surveynew)=>{
                history.push(`/survey`);
            }).catch((e)=>{
                console.log(e);
            })
        }, 300)
        

        //dispatch save
    }

    handleTabSelect = (curTab) => {
        this.saveCurrent(this.state.curTab)
        this.setState({curTab})
        this.formcontainer.scrollTop = 0
    }

    handleSubmit = (id, values) => {
        this.saveToState(id, values)        
    }

    saveCurrent = (id) => {
        if(id === 'basic') {
            this.basicForm.handleSubmit()
        }
        if(id === 'water') {
            this.waterForm.handleSubmit()
        }
        if(id === 'install') {
            this.installForm.handleSubmit()
        }
    }

    saveToState = (id, values) => {
        const { survey } = this.state
        if(id === 'basic') {
            values.useproperty = values.useproperty[0];
            values.building = values.building[0];
            values.model = values.model[0];
            this.setState({
                survey: {...survey, basicinfo: values}
            })
            return {...survey, basicinfo: values}
        }
        if(id === 'water') {
            values.source = values.source[0]
            this.setState({
                survey: {...survey, usewater: values}
            })
            return {...survey, usewater: values}
        }
        if(id === 'install') {
            values.position = values.position[0];
            values.wall = values.wall[0];
            values.method = values.method[0];
            values.pipe = values.pipe[0];
            values.pipematerials = values.pipematerials[0];
            this.setState({
                survey: { ...survey, install: values }
            })
            return { ...survey, install: values }
        }
    }

    convertToUnit = (survey) => {
        const { unit } = this.props
        let newsurvey = JSON.parse(JSON.stringify(survey))
        if(!survey.basicinfo) {
            newsurvey = { ...newsurvey, basicinfo: {}}
        }
        const install = {...survey.install}

        if(unit === 'in') {
            if(!!survey.install.drainage) {
                lodashSet(install, 'drainage', Math.round(lodashget(survey,'install.drainage','') * 0.3937008))
            }

            if(!!survey.install.space) {
                if(!!survey.install.space.length) {
                    lodashSet(install, 'space.length', Math.round(lodashget(survey,'install.space','').length * 0.3937008))
                }
                if(!!survey.install.space.width) {
                    lodashSet(install, 'space.width', Math.round(lodashget(survey,'install.space','').width * 0.3937008))
                }
                if(!!survey.install.space.height) {
                    lodashSet(install, 'space.height', Math.round(lodashget(survey,'install.space','').height * 0.3937008))
                }
            }

            return {...newsurvey, install}
        } else {
            return {...survey}
        }
    }

    convertFromUnit = (survey) => {
        const { unit } = this.props
        const install = { ...survey.install }
        if(unit === 'in') {
            if(!!install.drainage) {
                install.drainage = Math.round(install.drainage * 2.54)
            }

            if(!!install.space) {
                if(!!install.space.length) {
                    install.space.length = Math.round(install.space.length * 2.54)
                }
                if(!!install.space.width) {
                    install.space.width = Math.round(install.space.width * 2.54)
                }
                if(!!install.space.height) {
                    install.space.height = Math.round(install.space.height * 2.54)
                }
            }
            return { ...survey, install}
        } else {
            return survey
        }
    }

    componentDidMount() {
        window.addEventListener('resize', () => {
            const activeElement = document.activeElement
            if (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA') {
                setTimeout(() => {
                    if(!!activeElement.scrollIntoViewIfNeeded) {
                        activeElement.scrollIntoViewIfNeeded(true)
                    } else {
                        activeElement.scrollIntoView(false)
                    }
                }, 100)
            }
        })
    }

    handleBack = () => {
        const { intl: { formatMessage }, history } = this.props
        this.saveCurrent(this.state.curTab)
        if(JSON.stringify(this.state.survey) !== JSON.stringify(this.convertToUnit(this.props.survey))) {
            alert(`${formatMessage({id: 'survey.back'})}`, `${formatMessage({id: 'survey.back.warring'})}`, [
                { text: `${formatMessage({id: 'survey.cancel'})}`, onPress: () => console.log('cancel') },
                { text: `${formatMessage({id: 'survey.ok'})}`, onPress: () => history.goBack() },
              ])
        } else {
            history.goBack()
        }
    }

    render () {
        const { dispatch, unit, intl }  = this.props;
        const { curTab } = this.state

        return (
            <div className="sub_bg">
                <NavBar
                    className="nav"
                    icon={<Icon type="left" />}
                    onLeftClick={this.handleBack}
                    rightContent={<span onClick={this.handleSave}><FormattedMessage id="survey.save" /></span>}
                >
                    <FormattedMessage id="device.tools.survey" />
                </NavBar>
                <div className="sub_device_bg">
                    <div className="survery-edit-tab">
                        <div className={`tools_con ${curTab === 'basic' ? '' : 'disable'}`}>
                            <div onClick={()=>{this.handleTabSelect('basic')}}>
                                <img src={basic_img} alt="" />
                                <div className="tab-name"><FormattedMessage id="device.basic" /></div>
                            </div>
                        </div>
                        <div className={`tools_con ${curTab === 'water' ? '' : 'disable'}`}>
                            <div onClick={()=>{this.handleTabSelect('water')}}>
                                <img src={water_img} alt="" />
                                <div className="tab-name"><FormattedMessage id="device.water" /></div>
                            </div>
                        </div>
                        <div className={`tools_con ${curTab === 'install' ? '' : 'disable'}`}>
                            <div onClick={()=>{this.handleTabSelect('install')}}>
                                <img src={install_img} alt="" />
                                <div className="tab-name"><FormattedMessage id="device.install" /></div>
                            </div>
                        </div>
                    </div>
                    <div ref={el => this.formcontainer = el} className="survery-edit-form-container">
                        { curTab === 'basic' && 
                            <BasicForm 
                                onSubmit={this.handleSubmit} 
                                wrappedComponentRef={el => this.basicForm = el} 
                                basicinfo={lodashget(this.state, 'survey.basicinfo', {})}
                                dispatch={dispatch}
                                unit={unit}
                                intl={intl}
                            /> 
                        }
                        { curTab === 'water' && 
                            <WaterForm
                                onSubmit={this.handleSubmit} 
                                wrappedComponentRef={el => this.waterForm = el} 
                                usewater={lodashget(this.state, 'survey.usewater', {})}
                                dispatch={dispatch}
                                unit={unit}
                                intl={intl}
                            /> 
                        }
                        { curTab === 'install' && 
                            <InstallForm
                                onSubmit={this.handleSubmit} 
                                wrappedComponentRef={el => this.installForm = el} 
                                install={lodashget(this.state, 'survey.install', {})}
                                dispatch={dispatch}
                                unit={unit}
                                intl={intl}
                            /> 
                        }
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps =  ({app: {unit},surveys:{surveys}}, ownProps) => {
    const {match} = ownProps;
    let _id = lodashGet(match, 'params.id', '0')
    const survey = lodashGet(surveys,`${_id}`);    

    return {
        survey,
        unit
    }
}

export default connect(mapStateToProps)(withRouter(injectIntl(Index)))

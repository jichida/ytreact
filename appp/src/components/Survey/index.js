import React, { PureComponent } from 'react';
import {  NavBar, Icon, List, SwipeAction } from 'antd-mobile';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import lodashmap from 'lodash.map'
import { FormattedMessage, injectIntl } from 'react-intl';
import {getsurvey_request,getsurvey_result} from '../../actions';
import {callthen} from '../../sagas/pagination';
import './index.less';

const SurveyItem = ({ survey, onSelect, onDelete, formatMessage}) => {
    const { _id, name } = survey
    return (
        <SwipeAction
            style={{ backgroundColor: 'gray' }}
            autoClose
            right={[
                {
                    text: `${formatMessage({id: 'survey.edit'})}`,
                    onPress: () => onSelect(_id),
                    style: { backgroundColor: '#ddd', color: 'white' },
                },
                {
                    text: `${formatMessage({id: 'survey.delete'})}`,
                    onPress: () => onDelete(_id),
                    style: { backgroundColor: '#F4333C', color: 'white' },
                },
            ]}
        >
            <List.Item arrow="horizontal" >
                {name}
            </List.Item>
        </SwipeAction>
    )
}


class Index extends PureComponent{

    constructor(props) {
        super(props);
        this.state = {
            surveys: []
        }
    }
    componentDidMount(){
        this.props.dispatch(callthen(getsurvey_request,getsurvey_result,{})).then((list)=>{
            this.setState({surveys:[...list]});
        }).catch((e)=>{
            console.log(e);
        });
    }
    handleSelect = (_id) => {
        this.props.history.push(`/surveyname/${_id}`)
    }

    handleDelete = (_id) => {
        console.log('will delete id:', _id)
    }

    render () {
        const { history,intl: { formatMessage }}  = this.props;
        const {surveys} = this.state;
        return (
            <div className="sub_bg">
                <NavBar
                    className="nav"
                    icon={<Icon type="left" />}
                    onLeftClick={() => history.goBack()}
                    rightContent={<span onClick={() => history.push('/surveyname/0')}><FormattedMessage id="survey.new" /></span>}
                >
                <FormattedMessage id="device.tools.survey" />
                </NavBar>
                <div className="sub_device_bg">
                    <div className="list-content">
                        <List>
                            { lodashmap(surveys, (item, index) => (
                                <SurveyItem key={index} 
                                    survey={item} 
                                    onSelect={this.handleSelect} 
                                    onDelete={this.handleDelete} 
                                    formatMessage={formatMessage} 
                                />
                            ))}
                        </List>
                    </div>
                </div>
            </div>
        )
    }
}




export default connect()(withRouter(injectIntl(Index)))

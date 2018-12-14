import React from 'react';
import { Field } from 'redux-form';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import config from '../../env/config.js';
import _ from 'lodash';
import syncbtnfetch from './syncbtnfetch';
import { refreshView,showNotification } from 'react-admin';

class SyncBtnC extends React.Component {
  constructor(props) {
      super(props);
  }

  onClick_Sync = ()=>{
    const {record} = this.props;
    syncbtnfetch(`/syncdb/sync`,{}).then(({issuccess,errmsg})=>{
      if(issuccess){
        const {message} = errmsg;
        this.props.dispatch(showNotification(message));
        this.props.dispatch(refreshView({}));
      }
      else{
        this.props.dispatch(showNotification(errmsg));
      }
    });
  }

  render() {
    const {record} = this.props;
    return (
      <div className="clearfix">
        <Button variant="contained" color="secondary" onClick={()=>{
          this.onClick_Sync();
        }} style={{margin: 12}}>
        开始同步
      </Button>
      <div></div>
      </div>
    );
  }
}
SyncBtnC = connect()(SyncBtnC);

let SyncBtn = (props) => {
  const {source,...rest} = props;
  return(
    <span>
      <Field name={source} component={SyncBtnC} {...rest}/>
    </span>
  )
}

SyncBtn.defaultProps = {
    addLabel: false,
};

export  {SyncBtn};

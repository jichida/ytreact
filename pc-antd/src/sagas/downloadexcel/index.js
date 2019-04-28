import {takeLatest,call} from 'redux-saga/effects';
import {
  download_excel
} from '../../actions';
import restfulapi from '../restful/restfulapi';
import config from '../../env/config';

export function* downloadexcel(){//仅执行一次
   yield takeLatest(`${download_excel}`, function*(action) {
      try{
        const {payload:{deviceid}} = action;
        const usertoken = localStorage.getItem(`ytreact_${config.softmode}_token`);
        yield call(restfulapi.getexcelfile,{deviceid,tokenid:usertoken});
      }
      catch(e){
        console.log(e);
      }

    });

}

import {takeLatest,put} from 'redux-saga/effects';
import {
  set_weui,
  createnotice_result,
  page_getnotice_result,
  set_notice_db
} from '../../actions';
// import lodashget from 'lodash.get';
import {normalizr_notice} from './normalizr';
import { goBack  } from 'connected-react-router';

export function* noticeflow(){//仅执行一次
  yield takeLatest(`${createnotice_result}`, function*(action) {
    try{
      yield put(set_weui({
        toast:{
        text:'新建通知信息成功',
        show: true,
        type:'success'
      }}));
      yield put(goBack());
    }
    catch(e){
      console.log(e);
    }
  });

  yield takeLatest(`${page_getnotice_result}`,function*(action){
    try{
      const {payload} = action;
      const result = normalizr_notice(payload.result);
      console.log(result);
      yield put(set_notice_db(result));
    }
    catch(e){
      console.log(e);
    }
  });


}

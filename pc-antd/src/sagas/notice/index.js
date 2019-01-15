import {takeLatest,put} from 'redux-saga/effects';
import {
  set_weui,
  createnotice_result,
  page_getnotice_result
} from '../../actions';
// import lodashget from 'lodash.get';
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

  // yield takeLatest(`${getnoticelist_result}`, function*(action) {
  //   try{
  //     yield put(set_weui({
  //       toast:{
  //       text:'设置设备信息成功',
  //       show: true,
  //       type:'success'
  //     }}));
  //   }
  //   catch(e){
  //     console.log(e);
  //   }
  // });

}

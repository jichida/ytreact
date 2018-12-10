import { put,takeLatest,select,} from 'redux-saga/effects';
// import {delay} from 'redux-saga';
import {
  common_err,
  md_login_result,
  login_result,

  set_weui,

} from '../../actions';
// import {getdevice_request} from '../../actions';
import { replace} from 'connected-react-router';//https://github.com/reactjs/connected-react-router

// import { goBack } from 'react-router-redux';//https://github.com/reactjs/react-router-redux
// import config from '../../env/config.js';
// import  {
//   getrandom
// } from '../test/bmsdata.js';

export function* userloginflow() {


  // 链接远程数据,暂时注释
  // yield takeLatest(`${querydevice_result}`, function*(action) {
  //   yield put(start_serverpush_devicegeo_sz({}));
  // });

  // yield takeLatest(`${changepwd_result}`, function*(action) {
  //   yield put(set_weui({
  //     toast:{
  //       text:'修改密码成功',
  //       show: true,
  //       type:'success'
  //   }}));
  //   yield put(goBack());
  // });



  yield takeLatest(`${md_login_result}`, function*(action) {
      try{
      let {payload:result} = action;
        console.log(`md_login_result==>${JSON.stringify(result)}`);
        if(!!result){
            const {loginsuccess,search} = yield select((state)=>{
              const loginsuccess = state.userlogin.success;
              const search = state.router.location.search;
              return {loginsuccess,search};
            });
            yield put(login_result(result));

            // yield put(getdevice_request({}));
            // debugger;
            if(!loginsuccess && result.loginsuccess){
              //switch
                const fdStart = search.indexOf("?next=");
                if(fdStart === 0){
                    const redirectRoute = search.substring(6);
                    yield put(replace(redirectRoute));
                }
                else{
                    yield put(replace('/'));
                }

            }
        }

      }
      catch(e){
        console.log(e);
      }

  });

  yield takeLatest(`${common_err}`, function*(action) {
        let {payload:result} = action;

        yield put(set_weui({
          toast:{
          text:result.errmsg,
          show: true,
          type:'warning'
        }}));
  });

}

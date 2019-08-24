import { put,takeLatest,select,} from 'redux-saga/effects';
// import {delay} from 'redux-saga';
import {
  common_err,
  md_login_result,
  login_result,
  findpwd_result,
  set_weui,
  getdevice_request,
  app_sendcmd_request,
  sendauth_result,
  changepwd_result,
} from '../../actions';
// import {getdevice_request} from '../../actions';
import { replace,goBack} from 'connected-react-router';//https://github.com/reactjs/connected-react-router
import config from '../../env/config';
import {intl,getintlmessage} from '../../util/globalIntl';

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
  yield takeLatest(`${sendauth_result}`, function*(action) {
      let {payload:result} = action;
      let toast = {
          show : true,
          text : result.msg,
          type : "success"
      }
      yield put(set_weui({ toast }));
  });

  yield takeLatest(`${findpwd_result}`, function*(action) {
      try{
        yield put(set_weui({
          toast:{
            text:intl.formatMessage({id:'constsaga.userlogin.findpwd'}),
            show: true,
            type:'success'
        }}));
        yield put(goBack());
      }
      catch(e){
        console.log(e);
      }
  });


    yield takeLatest(`${changepwd_result}`, function*(action) {
        try{
          yield put(set_weui({
            toast:{
              text:intl.formatMessage({id:'constsaga.userlogin.changepwd'}),
              show: true,
              type:'success'
          }}));
          yield put(goBack());
        }
        catch(e){
          console.log(e);
        }
    });




  yield takeLatest(`${md_login_result}`, function*(action) {
      try{
      let {payload:result} = action;
        console.log(`md_login_result==>${JSON.stringify(result)}`);
        if(!!result){
            const {loginsuccess,search,username,password} = yield select((state)=>{
              const {username,password,loginsuccess} = state.userlogin;
              const search = state.router.location.search;
              return {username,password,loginsuccess,search};
            });
            if(!loginsuccess){
              localStorage.removeItem(`ytreact_${config.softmode}_token`);
            }

            yield put(login_result(result));

            // yield put(getdevice_request({}));
            // debugger;
            if(!loginsuccess && result.loginsuccess){
                localStorage.setItem(`ytreact_${config.softmode}_username`,username);
                localStorage.setItem(`ytreact_${config.softmode}_password`,password);

                localStorage.setItem(`ytreact_${config.softmode}_token`,result.token);

                if(config.softmode === 'app'){
          					if(!!result._id){
          					  //get device
          					  yield put(getdevice_request({'_id':result._id}));
          					}
                    yield put(app_sendcmd_request({cmd:`$data%`,cmdstring:getintlmessage('constcmd.cmdstring.data')}));
                }
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
        const {payload:result} = action;
        console.log(result.errmsg);
        if(!result.ishide){
          yield put(set_weui({
            toast:{
            text:result.errmsg,
            show: true,
            type:'warning'
          }}));
        }
  });

}

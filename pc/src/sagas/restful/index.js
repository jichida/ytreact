import { take,fork,put,call} from 'redux-saga/effects';

import data from '../wslogic/datahandler.js';
import restfulapi from './restfulapi';

const handlerlist = data.recvmessagetoresultpair;

function* writeauth(fun,cmd) {
    while (true) {
        const { payload } = yield take(fun);
        const result = yield call(restfulapi.geturlauth,{cmd,payload});
        const {cmd:resultcmd,payload:resultpayload} = result;
        yield put(handlerlist[resultcmd](resultpayload));
    }
}


function* write(fun,cmd) {
    while (true) {
        const { payload } = yield take(fun);
        const result = yield call(restfulapi.geturl,{cmd,payload});
        const {cmd:resultcmd,payload:resultpayload} = result;
        yield put(handlerlist[resultcmd](resultpayload));
    }
}

function* handleIO(fnsz) {
    for (var cmd in fnsz) {
        yield fork(write,fnsz[cmd],cmd);
    }
}

function* handleIOAuth(fnsz) {
    for (var cmd in fnsz) {
        yield fork(writeauth,fnsz[cmd],cmd);
    }
}


export function* restfulapiflow() {
  yield fork(handleIOAuth,  data.sendmessageauthfnsz);
  yield fork(handleIO,  data.sendmessagefnsz);
}

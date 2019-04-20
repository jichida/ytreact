import { fork } from 'redux-saga/effects';
import {createsagacallbackflow} from './pagination';
import {socketflow} from './ws/socketflow';
import {wsflow} from './ws/api.ws';
// import {wififlow} from './wifi/index';
// import {restfulapiflow} from './restful';
import {uiflow} from './ui';
import {deviceflow} from './device';
import {userloginflow} from './userlogin';
import {noticeflow} from './notice';
import {devicedetailflow} from './devicedetail';

export default function* rootSaga() {
  yield fork(userloginflow);
  yield fork(createsagacallbackflow);
  yield fork(socketflow);
  yield fork(wsflow);
  // yield fork(wififlow);
  yield fork(uiflow);
  yield fork(deviceflow);
  yield fork(noticeflow);
  yield fork(devicedetailflow);

}

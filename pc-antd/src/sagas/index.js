import { fork } from 'redux-saga/effects';
import {createsagacallbackflow} from './pagination';
import {socketflow} from './ws/socketflow';
import {wsflow} from './ws/api.ws';
import {restfulapiflow} from './restful';
import {uiflow} from './ui';
import {userloginflow} from './userlogin';

export default function* rootSaga() {
  yield fork(userloginflow);
  yield fork(createsagacallbackflow);
  yield fork(socketflow);
  yield fork(wsflow);
  yield fork(uiflow);
  // yield fork(restfulapiflow);

}

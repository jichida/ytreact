import {takeLatest,call, put} from 'redux-saga/effects';
import {set_weui, set_confirm } from '../../actions';
import Toast from 'antd-mobile/lib/toast';  // 加载 JS
import 'antd-mobile/lib/toast/style/css';        // 加载 CSS
import Modal from 'antd-mobile/lib/modal';
import 'antd-mobile/lib/modal/style/css';

const alert = Modal.alert;

const popdialog = ({text,type,value})=>{
  return new Promise(resolve => {
      if(type === 'success'){
        Toast.success(text, 1);
      }
      if(type === 'warning'){
        Toast.fail(text, 1);
      }
      if(type === 'fail'){
        Toast.fail(text, 1);
      }
      if(type === 'info'){
        Toast.info(text, 1);
      }
      if(type === 'offline'){
        Toast.offline(text, 1);
      }
      if(type === 'loading'){
        if(value === 'show'){
          Toast.loading(text, 0);
        }
        if(value === 'hide'){
          Toast.hide()
        }

      }
      resolve();
    });
}

const popconfirm = ({title, message, text}) => {
  return new Promise( (resolve) => {
    alert(title, message, [
      { text: text[0], onPress: () => { resolve(false) } },
      { text: text[1], onPress: () => { resolve(true) } }
    ])
  })
}


export function* uiflow(){//仅执行一次
  yield takeLatest(`${set_weui}`, function*(action) {
    const {toast} = action.payload;
    if(!!toast){
      yield call(popdialog,toast);
    }
  });
}

export function* uiconfirm(){//仅执行一次
  yield takeLatest(`${set_confirm}`, function*(action) {
    console.log(action.payload)
    const { command } = action.payload
    if(!!action.payload) {
      const isconfirm = yield call(popconfirm, action.payload)
      if(isconfirm && command) {
        yield put(command)
      }
    }
  });
}

import lodashmap from 'lodash.map';
import data from '../wslogic/datahandler.js';
const handlerlist = {};

const recvmessagetoresultpair = data.recvmessagetoresultpair;

export function wsrecvhandler(socket,emit){
  lodashmap(recvmessagetoresultpair,(fnresult,keyname)=>{
    handlerlist[keyname] = (socket, emit)=> {
      return ((result)=> {
        //
        emit(fnresult(result));
      });
    }
  });
  lodashmap(handlerlist,(handlersocket,handlername)=>{
    socket.on(handlername,handlersocket(socket,emit));
  });

}

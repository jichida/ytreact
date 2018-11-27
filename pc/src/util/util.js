import config from '../env/config.js';
import axios from 'axios';
const api = axios.create({
  baseURL: config.serverurl,
});

export const requestpostdatawithtoken = (uri,token,data,callback)=>{
   api.post(uri, data,{
                headers: {
                     'Authorization': 'Bearer '+token,
                 }
               }).then(response => {
                 console.log('response:' + JSON.stringify(response));
                 if(response.status === 200){
                   let retresult = response.data;
                   if(retresult.result === 'OK'){
                     callback(true,retresult.data);
                   }
                   else{
                     callback(false,retresult.message);
                   }
                 }
                 else if(response.status === 401){
                   callback(false,'用户未登录');
                 }
                 else{
                   callback(false,'服务器内部错误');
                 }
    }).catch(() => {
        callback(false,'服务器错误');
    });
}

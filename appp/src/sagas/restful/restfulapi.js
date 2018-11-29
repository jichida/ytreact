import config from '../../env/config';
// import streamSaver from 'streamsaver';
// import map from 'lodash.map';
const fetchurl =`${config.serverurlrestful}`;

const statusHelper = (response)=> {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(new Error(response.statusText))
  }
}

const restfulapi = {
  geturlauth:({cmd,payload})=>{
    const usertoken = localStorage.getItem(`yt_${config.softmode}_token`);
    return fetch(`${fetchurl}/auth/${config.softmode}/${cmd}`, {
      method  : 'POST',
      headers : {
        'Accept'        : 'application/json',
        'Content-Type'  : 'application/json',
        'Authorization': "Bearer " + usertoken
      },
      body:JSON.stringify(payload)
    })
    .then(statusHelper)
    .then(response => response.json());
  },
  geturl: ({cmd,payload})=> {
    return fetch(`${fetchurl}/noauth/${config.softmode}/${cmd}`, {
      method  : 'POST',
      headers : {
        'Accept'        : 'application/json',
        'Content-Type'  : 'application/json'
      },
      body    : JSON.stringify(payload)
    })
    .then(statusHelper)
    .then(response => response.json());
  },
};


export default restfulapi;

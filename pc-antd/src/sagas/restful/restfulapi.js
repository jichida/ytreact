import config from '../../env/config';
// import streamSaver from 'streamsaver';
// import map from 'lodash.map';
const fetchurl =`${config.serverurlrestful}`;
const getForm =(url, target, value, method)=> {
  const {tokenid,momentstart,momentend} = value;
  let form = document.createElement("form");
  form.method = method;
  form.action = url;
  form.target = target;

  let input = document.createElement("input");
  input.type = "hidden";
  input.value = tokenid;
  input.name = 'tokenid';
  form.appendChild(input);

  input = document.createElement("input");
  input.type = "hidden";
  input.value = momentstart;
  input.name = 'momentstart';
  form.appendChild(input);

  input = document.createElement("input");
  input.type = "hidden";
  input.value = momentend;
  input.name = 'momentend';
  form.appendChild(input);

  return form;
};
const statusHelper = (response)=> {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(new Error(response.statusText))
  }
}

const restfulapi = {
  getexcelfile({deviceid,tokenid,momentstart,momentend}){
    return new Promise((resolve,reject) => {
      const form = getForm(`${fetchurl}/exportsrvdata/${deviceid}`, "_self", {tokenid,momentstart,momentend}, "post");
      document.body.appendChild(form);
      form.submit();
      form.parentNode.removeChild(form);
      resolve();
    });
  },
  geturlauth:({cmd,payload})=>{
    const usertoken = localStorage.getItem(`ytreact_${config.softmode}_token`);
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

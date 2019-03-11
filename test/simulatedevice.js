const net=require('net');
const ip = 'yt.i2u.top';//'47.97.174.215';//47.97.174.215 //目标ip
const port = parseInt('4102');//目标端口


const client= net.connect({port:port,host:ip},()=>{
  console.log(`connected!!`);
  // let deviceid = 'GHCA0488';
  // client.write(`$deviceid:${deviceid}%`);
});

client.on('data',(data)=>{
  const recvbuf = data.toString();
  console.log(`接收到数据为${recvbuf}`);
  let objstring = '';
  const istart = recvbuf.indexOf('$',0);
  if(istart >= 0){
    const iend = recvbuf.indexOf('%',istart);
    if(iend >= 0){
      objstring = recvbuf.substr(istart,iend - istart);
      console.log(objstring)
      if(recvbuf === '$deviceid%'){
        let deviceid = 'GHCA0488';
        client.write(`$deviceid:${deviceid}%`);
      }
      else if(recvbuf === '$data%'){
        client.write(`$50,0,300,50000,125,5000,720,50,30,10,0,10,120,0,90,50,10,30,10,0,60,0,0,0,91,1,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,1,0,300,0,7,22,2,7,600,300,20,%`);
      }
      else{
        client.write(`${objstring}ok%`);
      }

    }
  }
  // if(recvstring !== `$ok%`){
  //   client.write(`$ok%`);
  // }
  // timerTimeout = setTimeout(()=>{
  //   client.write(`$ok%`);
  //   clearTimeout(timerTimeout);
  // },parseInt(config.senddatainterval))
});

client.on('end',()=>{
  console.log(`和服务器断开`);

});

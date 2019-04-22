const net=require('net');
const ip = 'yt.i2u.top';//
const port = 4103;//目标端口


console.log(`ip:port->${ip}:${port}`)
const httpteststring = `GET /units/GHCA0488/datapoints/post?d[a]=420&d[b]=6&d[c]=1001&d[d]=1009&d[e]=987&d[f]=1007&d[g]=14&d[h]=1&d[i]=6&d[j]=40&d[k]=42&d[l]=0&d[m]=0&d[n]=0&d[o]=0&d[p]=0&d[q]=0&d[r]=0&d[s]=0&d[t]=0&d[u]=46&d[v]=0&d[w]=0&d[x]=0&d[y]=0&d[z]=0&d[A]=0&d[B]=0&d[C]=237&d[D]=235&d[E]=238&d[F]=247&d[G]=720&d[H]=0&d[I]=0&d[J]=0&d[K]=0&d[L]=0&d[M]=0&d[N]=0&d[O]=0&d[P]=0&d[Q]=0&d[R]=0&d[S]=0&d[T]=0&d[U]=0 HTTP/1.1\r\nAccept: text/plain\r\nHost: localhost\r\n\r\n\r\n\r\n`;
const httpteststring2 = `GET /units/GHCA0488/messages/post?message[type]=Message&message[body]=HW:%20HD_G2_100VAPP%20,%20SW:%200%20/%206 HTTP/1.1\r\nAccept: text/plain\r\nHost: localhost\r\n\r\n`;

// const httpteststring = `GET /units/5c32f959436dc4000a01448c/datapoints/post?d[a]=237&d[b]=6&d[c]=0&d[d]=0&d[e]=0&d[f]=0&d[g]=0&d[h]=0&d[i]=0&d[j]=162&d[k]=6&d[l]=0&d[m]=0&d[n]=0&d[o]=720&d[p]=0&d[q]=0&d[r]=0&d[s]=0&d[t]=0&d[u]=0&d[v]=0&d[w]=0&d[x]=0&d[y]=50000&d[z]=0&d[A]=0&d[B]=0&d[C]=9934&d[D]=0&d[E]=0&d[F]=0&d[G]=0&d[H]=0&d[I]=0&d[J]=0 HTTP/1.1\r\n
// Accept: text/plain\r\n
// Host: hydrodi-monk.herokuapp.com\r\n\r\n`;
const client= net.connect({port:port,host:ip},()=>{
  console.log(`connected!!`);
  // let deviceid = 'GHCA0488';
  console.log(`send:${httpteststring}`);
  // client.write(`$deviceid:${deviceid}%`);
  client.write(httpteststring);
});

client.on('data',(data)=>{
  const recvbuf = data.toString();
  if(recvbuf === `$ok%`){
    //donothing
    return;
  }
  if(recvbuf === '$ver%'){
    client.write(httpteststring2);
    return;
  }

  console.log(`接收到数据为${recvbuf}`);
  let objstring = '';
  const istart = recvbuf.indexOf('$',0);
  if(istart >= 0){
    const iend = recvbuf.indexOf('%',istart);
    if(iend >= 0){
      objstring = recvbuf.substr(istart,iend - istart);
      console.log(objstring)

      if(recvbuf === '$data%'){
        client.write(`$50,0,300,50000,125,5000,720,50,30,10,0,10,120,0,90,50,10,30,10,0,60,0,0,0,91,1,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,1,0,300,0,7,22,2,7,600,300,20,%`);
      }
      else{
        client.write(`${objstring}ok%`);
      }

    }
  }
});

client.on('end',(err)=>{
  console.log(err)
  console.log(`和服务器断开`);
});

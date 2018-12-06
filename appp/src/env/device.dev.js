

const getssidlist = (fncallback)=>{
  console.log(`getssidlist`);
  fncallback(['wifi1','wifi2','wifi3']);
}

const setcurwifi = (values,fncallback)=>{
  console.log(values);
  fncallback('ok');
}

const setsocketrecvcallback = (fncallback)=>{
    fncallback(`$ok%`)
}

export {getssidlist,setcurwifi,setsocketrecvcallback}

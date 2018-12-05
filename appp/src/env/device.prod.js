

const getssidlist = (fncallback)=>{
  fncallback(['wifi1','wifi2','wifi3']);
}

const setcurwifi = (values,fncallback)=>{
  fncallback('ok');
}

const setsocketrecvcallback = (fncallback)=>{
    fncallback(`$ok%`)
}

export {getssidlist,setcurwifi,setsocketrecvcallback}

const openLocation = ()=>{
  console.log(`openLocation`);
}

const checkLocation = (fncallback)=>{
  window.setTimeout(()=>{
    fncallback({
      "code": -1
    })
  },0);
}

export {openLocation,checkLocation};

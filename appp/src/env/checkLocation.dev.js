const checkLocation = (fncallback)=>{
  window.setTimeout(()=>{
    fncallback({
      "code": 0
    })
  },0);
}

export {checkLocation};

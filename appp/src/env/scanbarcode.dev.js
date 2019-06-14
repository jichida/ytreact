export const scanbarcode=(fncallback)=>{
    window.setTimeout(()=>{
      fncallback({
        "code": 0,
        "data": "GHDD1201",
      })
    },0);
};

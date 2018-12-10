export const scanbarcode=(fncallback)=>{
    window.setTimeout(()=>{
      fncallback({
        "code": "0",
        "data": "123456",
      })
    },0);
};

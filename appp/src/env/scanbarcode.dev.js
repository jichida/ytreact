export const scanbarcode=(fncallback)=>{
    window.setTimeout(()=>{
      fncallback({
        "code": 0,
        "data": "GHCA0488",
      })
    },0);
};

// import imageA from './IMG_3861.JPG';
import {xviewfun} from './xviewfun';
let xviewUploadImage;


// 拍照  注意 base64  图片很大 前端一定要异步 接收数据 刷新 UI
//
//     拍照 和 多图选择 回调数据均为 data :"[{  "imageType":（图片的类型）
//                                       "imagePrefix"：(显示的前缀)
//                                       "imageBase64"：(实际值)
//                                       }
//                                       ]"
//            前端使用示例 显示 data[0].imagePrefix + data[0].imageBase64
//     this.xviewData.componentName = "ComponentMedia";
//     this.xviewData.action = "camera"; 拍照
//     this.xviewData.callback = '前端自定义';
//     this.xviewData.data = ""; 需要数据在此添加
//     window["xview"].callNativeXView(JSON.stringify(xviewData));
//

if(!!window["xview"] || !!window["webkit"]){
  xviewUploadImage = (param,callback)=>{
    // 多图上传
    //
    //     this.xviewData.componentName = "ComponentMedia";
    //     this.xviewData.action = "photo"; 拍照
    //     this.xviewData.callback = '前端自定义';
    //     this.xviewData.data = { maxSelectNum: 9}"; 图片最大选择数量
    //     window["xview"].callNativeXView(JSON.stringify(xviewData));
    //
    const xviewData = {
      componentName:"ComponentMedia",
      action:"photo",
      callback:"callback_xviewUploadImage",
      data:{ maxSelectNum: 9}
    }
    window.callback_xviewUploadImage = (result)=>{
      // alert(`${JSON.stringify(result)}`)
      let jsonret = {
        code:0,
        message:'success',
        data:[]
      }
      for(let i = 0 ;i < result.data.length;i++){
        jsonret.data.push(`${result.data[i].imagePrefix}${result.data[i].imageBase64}`);
      }
      callback(jsonret);
    };


    xviewfun(JSON.stringify(xviewData));
  };
}



export {xviewUploadImage};

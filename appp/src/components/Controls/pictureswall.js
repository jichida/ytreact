import React from 'react';
import { connect } from 'react-redux';
import { Upload, Icon, Modal } from 'antd';
import {newtopicfileuploadsetpreview,newtopicfileuploadreset} from '../../actions/index.js';
import './pictureswall.less';
import config from '../../env/config.js';
import PicaDisposePhoto from '../../util/pica_dispose_photo';

class PicturesWall extends React.Component {
  // state = {
  //   previewVisible: false,
  //   previewImage: '',
  //   fileList: [{
  //     uid: -1,
  //     name: 'xxx.png',
  //     status: 'done',
  //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  //   }],
  // };
  componentDidMount(){
    //init
    if(this.props.value.length > 0){
      let filelistnew = [];
      for(let i=0 ;i < this.props.value.length; i++){
        const url = this.props.value[i];
        filelistnew.push({
          uid:`uid_${i}`,
          status: 'done',
          url: url
        });
      }
      this.props.dispatch(newtopicfileuploadsetpreview({ fileList:filelistnew }));
    }
  }
  componentWillUnmount() {
    this.props.dispatch(newtopicfileuploadreset());
  }

  handleCancel = () =>{
    this.props.dispatch(newtopicfileuploadsetpreview({ previewVisible: false }));
  } 

  handlePreview = (file) => {
    let fileobj = file;
    console.log('onClick handlePreview file:' + JSON.stringify(file));
    if (fileobj.status === 'done') {
      let url = '';
      if(fileobj.hasOwnProperty('url')){
        url = fileobj.url;
      }
      else{
        url = fileobj.response.files[0].url;
      }
      fileobj = {
        status: 'done',
        url: url
      };
    }

    console.log('onClick handlePreview fileobj:' + JSON.stringify(fileobj));
    this.props.dispatch(newtopicfileuploadsetpreview({
      previewImage: fileobj.url || fileobj.thumbUrl,
      previewVisible: true,
    }));
  }

  handleChange = ({ fileList }) => {
    console.log('fileList' + JSON.stringify(fileList));
    let filelistnew = [];
    let uploadedfiles =[ ];
    fileList.forEach((fileobj)=>{
      if (fileobj.status === 'done') {
        if(fileobj.hasOwnProperty('url')){
          uploadedfiles.push(fileobj.url);
          filelistnew.push(fileobj);
        }
        else{
          uploadedfiles.push(fileobj.response.files[0].url);
          filelistnew.push({
            name:fileobj.name,
            uid:fileobj.uid,
            status: 'done',
            url: fileobj.response.files[0].url
          });
        }

      }
      else {
        filelistnew.push(fileobj);
      }

    });

    this.props.dispatch(newtopicfileuploadsetpreview({ fileList:filelistnew }));

    console.log('uploadedfiles:' + JSON.stringify(uploadedfiles));
    this.props.onChange(uploadedfiles);
  }

  render() {
    const { previewVisible, previewImage, fileList, width, height } = this.props;

    const uploadButton = (
      <div onClick={()=>{console.log('Click')}}>
        <Icon type="plus" />
        <div className="ant-upload-text">上传</div>
      </div>
    );

    let beforeUpload =(v)=> {
      let imgInfo = {};
      let restconfig = {
        width:width || -1,
        height:height || -1,
        maxWidthOrHeight:800
      };
      return new Promise((resolve) => {
        const picaphoto = new PicaDisposePhoto(restconfig);
        picaphoto.disposePhotoWithFile(v,imgInfo).then((file)=>{
          file.uid = v.uid;
          resolve(file);
        }).catch((err) => {
          console.log(err);
        });
      });
    }


    return (
      <div className="pictureswall clearfix">
        <Upload
          beforeUpload={beforeUpload}
          action={config.serverurl + "/uploadavatar"}
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 9 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = ({newtopicfileupload}) => {
  return newtopicfileupload;
}
PicturesWall = connect(mapStateToProps)(PicturesWall);
export default PicturesWall;

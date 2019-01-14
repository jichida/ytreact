import React from 'react'
import config from '../../env/config.js';
import FineUploaderTraditional from 'fine-uploader-wrappers';
import Gallery from '../reactfineupload/gallery';
import '../reactfineupload/gallery/gallery.css';
import {xviewUploadImage} from '../../env/selphoto';
import WxImageViewer from 'react-wx-images-viewer';

const uploader = new FineUploaderTraditional({
    options: {
        chunking: {
            enabled: false
        },
        deleteFile: {
            enabled: true,
            endpoint: `${config.serverurl}/fineuploads`
        },
        request: {
            endpoint: `${config.serverurl}/fineuploads`
        },
        retry: {
            enableAuto: true
        }
    }
})

class Index extends React.Component {

    state = {
        index: 0,
        previewVisible: false,
        fileList: this.props.value
    }

    handleChange = (files) => {
        this.setState({
          fileList: files
        })
        this.props.onChange(files);
    }

    handlePreview = (url) => {
        this.setState({
          index: this.findIndex(url),
          previewVisible: true
        })
    }

    findIndex = (url) => {
        let fileIndex = -1

        this.state.fileList.some((file, index) => {
            if (file === url) {
                fileIndex = index
                return true
            }
        })

        return fileIndex;
    }

    onClose = () =>{
        this.setState({
          previewVisible: false
        })
    }
    
    render () {
        const { previewVisible, index, fileList } = this.state;

        return (
            <div>
                <Gallery uploader={ uploader }
                    files={fileList}
                    onChange={this.handleChange}
                    onPreview={this.handlePreview}
                    xviewUploadImage={xviewUploadImage}
                />
                {
                    previewVisible 
                    ? <WxImageViewer onClose={this.onClose} urls={this.state.fileList} index={index} /> 
                    : ""
                }
            </div>
        )
    }
}

export default Index;
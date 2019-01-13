import React from 'react'
import config from '../../env/config.js';
import FineUploaderTraditional from 'fine-uploader-wrappers';
import Gallery from '../reactfineupload/gallery';
import '../reactfineupload/gallery/gallery.css';
import {xviewUploadImage} from '../../env/selphoto';

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
        previewImage: '',
        previewVisible: false,
        fileList: this.props.value
    }

    handleChange = (files) => {
        this.setState({
          fileList: files
        })
        // this.props.input.onChange(files);
    }

    handlePreview = (url) => {
        this.setState({
          previewImage: url,
          previewVisible: true
        })
      }

    render () {
        const { previewVisible, previewImage, fileList } = this.state;

        return (
                <Gallery uploader={ uploader }
                    files={fileList}
                    onChange={this.handleChange}
                    // onPreview={this.handlePreview}
                    xviewUploadImage={xviewUploadImage}
                />
        )
    }
}

export default Index;
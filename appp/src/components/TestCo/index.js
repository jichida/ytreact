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

class TestCo extends React.Component {

    state = {
        previewImage: '',
        previewVisible: false,
        // fileList: props.input.value
        fileList: []
    }

    handleChange = (files) => {
        this.setState({
          fileList: files
        })
        // this.props.input.onChange(files);
    }

    render () {
        const { previewVisible, previewImage, fileList } = this.state;

        return (
            <div className="item_children">
                <Gallery uploader={ uploader }
                    files={fileList}
                    onChange={this.handleChange}
                    // onPreview={this.handlePreview}
                    xviewUploadImage={xviewUploadImage}
                />
            </div>
        )
    }
}

export default TestCo;
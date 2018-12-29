import React from 'react'
import ImageUpload from 'antd-mobile-upload/lib/ImageUpload'
import config from '../../env/config.js';


class TestCo extends React.Component {

    render () {
        const onChange = (value)=>{
            console.log('upload:')
            console.log(value);
        }

        return (
            <div className="item_children">
                {/* <PicturesWall value={['https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg','https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg']}
                onChange={onChange}/> */}
                <ImageUpload multiple action={config.serverurl + "/uploadavatar"} />
            </div>
        )
    }
}

export default TestCo;
import React from 'react'
import PicturesWall from '../Controls/pictureswall'


class TestCo extends React.Component {

    render () {
        const onChange = (value)=>{
            console.log('upload:')
            console.log(value);
        }

        return (
            <div className="item_children">
                <PicturesWall value={['https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg','https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg']}
                onChange={onChange}/>
            </div>
        )
    }
}

export default TestCo;
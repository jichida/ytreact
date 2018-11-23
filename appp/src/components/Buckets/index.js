import React from 'react';
import './index.less';

class Buckets extends React.PureComponent{

    handleChange = (value)=>{
        const { onChange } = this.props;
        onChange(value);
    }

    render(){
        const { value } = this.props;

        return (            
            <div className="bucket_container">
                <p className={value==='50gal' ? 'bk_item_on' : 'bk_item'} onClick={()=>{this.handleChange('50gal')}}>50gal</p>
                <p className={value==='80gal' ? 'bk_item_on' : 'bk_item'} onClick={()=>{this.handleChange('80gal')}}>80gal</p>
            </div>
        )
    }
}

export default Buckets;
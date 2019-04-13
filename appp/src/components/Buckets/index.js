import React from 'react';
import './index.less';

class Buckets extends React.PureComponent{

    handleChange = (value)=>{
        const { onChange } = this.props;
        onChange(value);
    }

    render(){
        const { value, unit } = this.props;

        return (            
            <div className="bucket_container">
                <p className={value==='50gal' ? 'bk_item_on' : 'bk_item'} onClick={()=>{this.handleChange('50gal')}}>
                    {unit === 'in' ? '50gal' : '192升'}
                </p>
                <p className={value==='80gal' ? 'bk_item_on' : 'bk_item'} onClick={()=>{this.handleChange('80gal')}}>
                {unit === 'in' ? '80gal' : '302升'}
                </p>
            </div>
        )
    }
}

export default Buckets;
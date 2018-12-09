import React, { PureComponent } from 'react';
import { Flex,  Carousel, WingBlank } from 'antd-mobile';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
// import {getdevice_request} from '../../actions';
import './index.less';

import logo from '../../assets/logo.png';
import device1 from '../../assets/pimg1.png';
import device2 from '../../assets/pimg2.png';
import setup from '../../assets/setup.png';

const data = [
    {
        img: device1,
        name: 'Hydro D1 G1',
    },
    {
        img: device2,
        name: 'Hydro D1 G2',
    },
]

 class DeviceSelect extends PureComponent{
   constructor(props, context) {
        super(props, context);
        this.state = {
            imgHeight: 176,
        }
    }
   componentDidMount () {
    //  const {dispatch} = this.props;
    //  dispatch(getdevice_request({}));
   }

    render () {
        console.log('render')
        return (
            <WingBlank style={{marginLeft:0, marginRight:0}}>
                <div className="fp_container">
                    <div className="pannel">
                        <Flex direction="column" justify="between" className="container">
                            <div className="logo" ><img className="logo_img" alt="" src={logo} /></div>
                            <div className="pimg" >
                                <Carousel
                                    autoplay={true}
                                    infinite
                                    dotActiveStyle={{backgroundColor: "#b0babd", width: 20, borderRadius: "10px"}}
                                    beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                                    afterChange={index => console.log('slide to', index)}
                                    >
                                    {data.map(val => (
                                        <div key={val.name} href="#"  style={{ display: 'inline-block', width: '100%' , height: this.state.imgHeight}} >
                                            <img src={val.img} alt="" style={{ height: '100%' }}  onLoad={() => {
                                                // fire window resize event to change height
                                                window.dispatchEvent(new Event('resize'));
                                                this.setState({ imgHeight: 'auto' });
                                            }}/>
                                            <p style={{color:"#cccccc", marginTop: "-25px", fontSize: 20}}>{val.name}</p>
                                        </div>
                                    ))}
                                </Carousel>
                            </div>
                            <div className="add_btn" >
                                <Link to="/home"><img src={setup} alt="" />
                                    <span><FormattedMessage id="start.setting" /></span>
                                </Link>
                            </div>
                        </Flex>
                    </div>
                </div>
            </WingBlank>
        )
    }
}


DeviceSelect = connect()(DeviceSelect);
export default DeviceSelect;

import React, { PureComponent } from 'react';
import { Flex, WhiteSpace, Carousel } from 'antd-mobile';
import { Link } from 'react-router-dom';

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

    render () {
        return (
            <div className="fh_container">
                <div className="fp_container">
                    <div className="panel">
                        <Flex direction="column" justify="between" className="container">
                            <WhiteSpace size="xl" />
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
                                        <a key={val.name} href="#"  style={{ display: 'inline-block', width: '100%', height: "100%" }} >
                                            <img src={val.img} alt="" style={{ height: '100%' }}/>
                                            <p style={{color:"#cccccc", marginTop: "-25px", fontSize: 20}}>{val.name}</p>
                                        </a>
                                    ))}
                                </Carousel>
                            </div>
                            <div className="add_btn" >
                                <Link to="/home"><img src={setup} alt="" /><span>请先进行设定</span></Link>
                            </div>
                            <WhiteSpace size="xl" />
                        </Flex>
                    </div>
                </div>
            </div>
        )
    }
}

export default DeviceSelect;
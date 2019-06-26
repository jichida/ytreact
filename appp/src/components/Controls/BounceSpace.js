import React, { Component } from 'react'
import './BounceSpace.less'

class BounceSpace extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowBounce: this.props.params.isShowBounce? {display:'block'} : {display:'none'},
            classNameStr:"public-bounce-space "+ (this.props.params.className? this.props.params.className : "" ),
        };
    }
    componentDidMount() {
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            isShowBounce: nextProps.params.isShowBounce? {display:'block'} : {display:'none'},
            classNameStr:"public-bounce-space "+ (nextProps.params.className? nextProps.params.className : "" ),
        });
    }
    
    render() {
        return (
            <div className = 'bounce-space-content' style={this.state.isShowBounce}>
                <div className={this.state.classNameStr} ></div>
            </div>
        );
    }

}
export  default BounceSpace;

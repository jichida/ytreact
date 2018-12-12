import React from 'react';
// import moment from 'moment';
import { Field } from 'redux-form';
import get from 'lodash.get';
import { Map } from 'react-amap';
import TextField from '@material-ui/core/TextField';


class UIMarker extends React.Component {
	constructor(props){
  	super(props);
    this.loadUI(props.__map__);
  }

  loadUI(map){
    window.AMapUI.loadUI(['misc/PositionPicker'], (PositionPicker)=> {
       new PositionPicker({
           mode: 'dragMap',
           map: map
       }).on('success', (positionResult)=>{
         console.log(positionResult);
				 const position = positionResult.position;
				 const address = positionResult.address;
				 this.props.onChangeValue ({position,address})
       }).start();
    });
  }

  render(){
  	return null;
  }
}



class MapDragSelC extends React.Component {
  constructor(props) {
    super(props);
		// const longitude = get(props,'Longitude.input.value',121);
		// const latitude = get(props,'Latitude.input.value',30);
		// const aliasaddress = get(props,'aliasaddress','address');
		// const address = get(props,`${aliasaddress}.input.value`,'');
		this.state = {
			address:''
		}
  }
	onChangeLng = (v)=>{
		const loc = get(this.props,'input.value',[121,30]);
		const onChange = get(this.props,'input.onChange');
		if(!!onChange){
			onChange([parseFloat(v),loc[1]]);
		}
	}
	onChangeLat = (v)=>{
		const loc = get(this.props,'input.value',[121,30]);
		const onChange = get(this.props,'input.onChange');
		if(!!onChange){
			onChange([loc[0],parseFloat(v)]);

		}
	}
	onChangeValue(v) {
		const longitude = get(v,'position.lng');
		const latitude = get(v,'position.lat');
		const address = get(v,'address');
		const onChange = get(this.props,'input.onChange');
		if(!!onChange){
			onChange([longitude,latitude]);
		}
		this.setState({address});
	}
  render() {
				console.log(this.props);
				const {
					address
				} = this.state;
				// const longitude0 = get(this.props,'Longitude.input.value',121);
				// const latitude0 = get(this.props,'Latitude.input.value',30);
				const loc = get(this.props,'input.value',[121,30]);
				console.log(loc);

        return (
                  <div style={{width: '100%'}}>
										<div style={{padding:'10px 0px'}}>
											<span style={{marginRight: '20px'}}>经度:<TextField hinttext="经度" value={loc[0]} onChange={
												(e)=>{this.onChangeLng(e.target.value)}
											}/></span>
											<span style={{marginRight: '20px'}}>纬度:<TextField hinttext="纬度" value={loc[1]} onChange={
												(e)=>{this.onChangeLat(e.target.value)}
											}/></span>
											<br />
											<span style={{marginRight: '20px'}}>地址:{address}</span>
										</div>
										<div style={{width: '100%', height: '400px'}}>
                    <Map useAMapUI center={loc} zoom={16} >
                      <UIMarker onChangeValue={(v)=>this.onChangeValue(v)}/>
                    </Map></div>
                  </div>

        );
  }
}


const MapDragSel = (props) => {
  let {source,label,...rest} = props;
  return(
    <span>
      <Field name={source} component={MapDragSelC} label={label} {...rest}/>
    </span>
)
}


export  {MapDragSel};

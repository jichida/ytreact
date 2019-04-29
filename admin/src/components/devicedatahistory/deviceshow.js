import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { ShowController, ReferenceField, TextField } from 'react-admin';

const itemStyle = {
    display: 'flex', 
    flexDirection: 'column', 
    alignItems:'center', 
    justifyContent: 'space-every', 
    width: '10%', 
    margin: '10px'
}

const itemTitle = {
    textAlign: 'center',
    fontSize: '12px',
    fontWeight: 600
}

const itemData = {
    textAlign: 'center',
    fontSize: '10px'
}

const ShowSrvdataField = ({ record }) => {
  const {srvdata} = record;
  // "Pressure3" : "0",
  //      "Pressure4" : "0",
  //      "tempt1" : "237",
  //      "tempt2" : "234",
  //      "tempt3" : "237",
  //      "tempt4" : "247",
  //      "MODLife" : "720",
  //      "Pre_filter1" : "0",
  //      "Pre_filter2" : "0",
  //      "Pre_filter3" : "0",
  //      "Post_filter1" : "0",
  //      "Post_filter2" : "0",
  //      "Post_filter3" : "0",
  //      "MODLifePercent" : "100",
  //      "Pre_filter1_percent" : "90",
  //      "Pre_filter2_percent" : "50",
  //      "Pre_filter3_percent" : "10",
  //      "Pos_filter1_percent" : "70",
  //      "Pos_filter2_percent" : "30",
  //      "Pos_filter3_percent" : "11",
  //      "UV" : "100",
  //      "Reserve1" : "25",
  //      "Reserve2" : "100",
  //      "systime" : "3510",
  //      "currentstate" : "6",
  //      "ModIn" : "1002",
  //      "Concentration" : "1009",
  //      "ModOut" : "974",
  //      "Waste" : "983",
  //      "cutAbs" : "28",
  //      "cutPer" : "2",
  //      "ModCurrent" : "18",
  //      "ModVoltage" : "0",
  //      "solenoidCurrent" : "45",
  //      "ProductQualityAverage" : "160",
  //      "ONtime" : "1000",
  //      "productDvol" : "30",
  //      "wasteDvol" : "10",
  //      "Yield" : "90",
  //      "DailyVolume" : "300",
  //      "WasteVolumeDaily" : "75",
  //      "FeedVolumeDaily" : "375",
  //      "totalVol" : "50000",
  //      "p1" : "61",
  //      "p2" : "0",
  //      "Ieff" : "0",
  //      "Energy" : "0",
  //      "Pressure1" : "0",
  //      "Pressure2" : "0"
  return  (
    <Typography>
        <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-every', alignItems: 'center'}}>
            <div style={itemStyle}>
                <div style={itemTitle}>systime</div>
                <div style={itemData}>{srvdata.systime}</div>
            </div>
            {/* <div style={itemStyle}>
                <div style={itemTitle}>updated_at</div>
                <div style={itemData}>{srvdata.updated_at}</div>
            </div> */}
            <div style={itemStyle}>
                <div style={itemTitle}>currentstate</div>
                <div style={itemData}>{srvdata.currentstate}</div>
            </div>
            <div style={itemStyle}>
                <div style={itemTitle}>ModIn</div>
                <div style={itemData}>{srvdata.ModIn}</div>
            </div>
            <div style={itemStyle}>
                <div style={itemTitle}>Concentration</div>
                <div style={itemData}>{srvdata.Concentration}</div>
            </div>
            <div style={itemStyle}>
                <div style={itemTitle}>ModOut</div>
                <div style={itemData}>{srvdata.ModOut}</div>
            </div>
            <div style={itemStyle}>
                <div style={itemTitle}>Waste</div>
                <div style={itemData}>{srvdata.Waste}</div>
            </div>
            <div style={itemStyle}>
                <div style={itemTitle}>cutAbs</div>
                <div style={itemData}>{srvdata.cutAbs}</div>
            </div>
            <div style={itemStyle}>
                <div style={itemTitle}>cutPer</div>
                <div style={itemData}>{srvdata.cutPer}</div>
            </div>
            <div style={itemStyle}>
                <div style={itemTitle}>ModCurrent</div>
                <div style={itemData}>{srvdata.ModCurrent}</div>
            </div>
            <div style={itemStyle}>
                <div style={itemTitle}>ModVoltage</div>
                <div style={itemData}>{srvdata.ModVoltage}</div>
            </div>
            <div style={itemStyle}>
                <div style={itemTitle}>solenoidCurrent</div>
                <div style={itemData}>{srvdata.solenoidCurrent}</div>
            </div>
            <div style={itemStyle}>
                <div style={itemTitle}>ProductQualityAverage</div>
                <div style={itemData}>{srvdata.ProductQualityAverage}</div>
            </div>
            <div style={itemStyle}>
                <div style={itemTitle}>ONtime</div>
                <div style={itemData}>{srvdata.ONtime}</div>
            </div>
            <div style={itemStyle}>
                <div style={itemTitle}>productDvol</div>
                <div style={itemData}>{srvdata.productDvol}</div>
            </div>
            <div style={itemStyle}>
                <div style={itemTitle}>wasteDvol</div>
                <div style={itemData}>{srvdata.wasteDvol}</div>
            </div>
            <div style={itemStyle}>
                <div style={itemTitle}>Yield</div>
                <div style={itemData}>{srvdata.Yield}</div>
            </div>
            <div style={itemStyle}>
                <div style={itemTitle}>DailyVolume</div>
                <div style={itemData}>{srvdata.DailyVolume}</div>
            </div>
            <div style={itemStyle}>
                <div style={itemTitle}>WasteVolumeDaily</div>
                <div style={itemData}>{srvdata.WasteVolumeDaily}</div>
            </div>
            <div style={itemStyle}>
                <div style={itemTitle}>FeedVolumeDaily</div>
                <div style={itemData}>{srvdata.FeedVolumeDaily}</div>
            </div>
            <div style={itemStyle}>
                <div style={itemTitle}>totalVol</div>
                <div style={itemData}>{srvdata.totalVol}</div>
            </div>
            <div style={itemStyle}>
                <div style={itemTitle}>p1</div>
                <div style={itemData}>{srvdata.p1}</div>
            </div>
            <div style={itemStyle}>
                <div style={itemTitle}>p2</div>
                <div style={itemData}>{srvdata.p2}</div>
            </div>
            <div style={itemStyle}>
                <div style={itemTitle}>Ieff</div>
                <div style={itemData}>{srvdata.Ieff}</div>
            </div>
            <div style={itemStyle}>
                <div style={itemTitle}>Energy</div>
                <div style={itemData}>{srvdata.Energy}</div>
            </div>
            <div style={itemStyle}>
                <div style={itemTitle}>Pressure1</div>
                <div style={itemData}>{srvdata.Pressure1}</div>
            </div>
            <div style={itemStyle}>
                <div style={itemTitle}>Pressure2</div>
                <div style={itemData}>{srvdata.Pressure2}</div>
            </div>
            <div style={itemStyle}>
                <div style={itemTitle}>Pressure3</div>
                <div style={itemData}>{srvdata.Pressure3}</div>
            </div>
            <div style={itemStyle}>
                <div style={itemTitle}>Pressure4</div>
                <div style={itemData}>{srvdata.Pressure4}</div>
            </div>
            <div style={itemStyle}>
                <div style={itemTitle}>tempt1</div>
                <div style={itemData}>{srvdata.tempt1}</div>
            </div>
            <div style={itemStyle}>
                <div style={itemTitle}>tempt2</div>
                <div style={itemData}>{srvdata.tempt2}</div>
            </div>
            <div style={itemStyle}>
                <div style={itemTitle}>tempt3</div>
                <div style={itemData}>{srvdata.tempt3}</div>
            </div>
            <div style={itemStyle}>
                <div style={itemTitle}>tempt4</div>
                <div style={itemData}>{srvdata.tempt4}</div>
            </div>
            <div style={itemStyle}>
                <div style={itemTitle}>MODLife</div>
                <div style={itemData}>{srvdata.MODLife}</div>
            </div>
            <div style={itemStyle}>
                <div style={itemTitle}>Pre_filter1</div>
                <div style={itemData}>{srvdata.Pre_filter1}</div>
            </div>
            <div style={itemStyle}>
                <div style={itemTitle}>Pre_filter2</div>
                <div style={itemData}>{srvdata.Pre_filter2}</div>
            </div>
            <div style={itemStyle}>
                <div style={itemTitle}>Pre_filter3</div>
                <div style={itemData}>{srvdata.Pre_filter3}</div>
            </div>
            <div style={itemStyle}>
                <div style={itemTitle}>Post_filter1</div>
                <div style={itemData}>{srvdata.Post_filter1}</div>
            </div>
            <div style={itemStyle}>
                <div style={itemTitle}>Post_filter2</div>
                <div style={itemData}>{srvdata.Post_filter2}</div>
            </div>
            <div style={itemStyle}>
                <div style={itemTitle}>Post_filter3</div>
                <div style={itemData}>{srvdata.Post_filter3}</div>
            </div>
            <div style={itemStyle}>
                <div style={itemTitle}>MODLifePercent</div>
                <div style={itemData}>{srvdata.MODLifePercent}</div>
            </div>
            <div style={itemStyle}>
                <div style={itemTitle}>Pre_filter1_percent</div>
                <div style={itemData}>{srvdata.Pre_filter1_percent}</div>
            </div>
            <div style={itemStyle}>
                <div style={itemTitle}>Pre_filter2_percent</div>
                <div style={itemData}>{srvdata.Pre_filter2_percent}</div>
            </div>
            <div style={itemStyle}>
                <div style={itemTitle}>Pre_filter3_percent</div>
                <div style={itemData}>{srvdata.Pre_filter3_percent}</div>
            </div>
            <div style={itemStyle}>
                <div style={itemTitle}>Pos_filter1_percent</div>
                <div style={itemData}>{srvdata.Pos_filter1_percent}</div>
            </div>
            <div style={itemStyle}>
                <div style={itemTitle}>Pos_filter2_percent</div>
                <div style={itemData}>{srvdata.Pos_filter2_percent}</div>
            </div>
            <div style={itemStyle}>
                <div style={itemTitle}>Pos_filter3_percent</div>
                <div style={itemData}>{srvdata.Pos_filter3_percent}</div>
            </div>
            <div style={itemStyle}>
                <div style={itemTitle}>UV</div>
                <div style={itemData}>{srvdata.UV}</div>
            </div>
        </div>
    </Typography>
  );
}

const showDevice = ({ record })=>{
  console.log(record);
  if(record.hasOwnProperty('srvdata')){
    return ShowSrvdataField({ record });
  }
  return (<Card style={{ width: 600, margin: 'auto' }}>
        <CardContent>
            <Grid container spacing={16}>
                <Grid item xs={6}>
                    <Typography variant="title" gutterBottom>
                        Posters Galore
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography
                        variant="title"
                        gutterBottom
                        align="right"
                    >
                        Invoice {record.id}
                    </Typography>
                </Grid>
            </Grid>
            <Grid container spacing={16}>
                <Grid item xs={12} align="right">
                </Grid>
            </Grid>
            <div style={{ height: 20 }}>&nbsp;</div>
            <Grid container spacing={16}>
                <Grid item xs={6}>
                    <Typography
                        variant="title"
                        gutterBottom
                        align="center"
                    >
                        Date{' '}
                    </Typography>
                    <Typography gutterBottom align="center">
                        {new Date(record.date).toLocaleDateString()}
                    </Typography>
                </Grid>

                <Grid item xs={5}>
                    <Typography
                        variant="title"
                        gutterBottom
                        align="center"
                    >
                        Order
                    </Typography>
                    <Typography gutterBottom align="center">

                    </Typography>
                </Grid>
            </Grid>
            <div style={{ margin: '10px 0' }}>

            </div>
        </CardContent>
    </Card>
  );
}


const DeviceShow = props => (
    <ShowController {...props} title=" ">
        {({ record }) =>
            record && showDevice({record})
        }
    </ShowController>
);

export default DeviceShow;

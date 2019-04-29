import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { ShowController, ReferenceField, TextField } from 'react-admin';


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
  return  (<Typography>
        Pressure3: {srvdata.Pressure3}
        <br />
        {record.address}
        <br />
        {record.city}, {record.zipcode}
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

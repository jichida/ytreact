import moment from 'moment';

const stringtodate = (stringdate)=>{
  let retdate = moment(stringdate).toDate();
  if(!retdate){
    retdate = new Date();
  }

  return retdate;
}

export {stringtodate};

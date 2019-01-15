import { normalize, schema } from 'normalizr';
// import lodashmap from 'lodash.map';
// import lodashget from 'lodash.get';
// Define a users schema
const distributor = new schema.Entity('distributors',{},{
  idAttribute: '_id',
});


const notice =  new schema.Entity('notices',{
  distributorids:[distributor],
  creatordistributorid:distributor,
},{
  idAttribute: '_id',
});

const noticeListSchma = {docs:[notice]};
const normalizr_notice = (resultlist)=>{
  const {entities}= normalize(resultlist, noticeListSchma);
  return entities;
}

export {
  normalizr_notice,
};

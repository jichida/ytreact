/* eslint jsx-a11y/anchor-has-content: off */
import React, { Component } from "react";
// import PropTypes from "prop-types";
import { connect } from "react-redux";
import { findOneAction } from "./action";
import CircularProgress from "@material-ui/core/CircularProgress";
import _ from "lodash";
import {
  Create,
  Edit
}  from "react-admin";
// import {redirect} from "react-admin";
/*
{
    "_id" : ObjectId("5bc8428295c4141e94fee498"),
    "pointlimitperday" : 10000,
    "expressapiurl" : "http://poll.kuaidi100.com/poll/query.do",
    "expressapicustomer" : "FE88C77449846749F9A80BC5D466984D",
    "expressapikey" : "piOqvhjg755",
    "productcategoryid_hardware" : ObjectId("58e74e6ac965ed04e8768ae1"),
    "productcategoryid_point" : ObjectId("58e74e8dc965ed04e8768ae2"),
    "__v" : 0
}
*/
class Page extends Component {
  componentWillMount() {
    const { dispatch, resource } = this.props;
    findOneAction({ resource }, dispatch);
  }


    renderCreate = () => {
      const { isLoading,title, ...rest } = this.props;
      return (
        <Create title={title}
          actions={null}
          {...rest}
          isLoading={isLoading}
          >
            {this.props.children}
        </Create>
      );
    };


      renderEdit = () => {
        const { record, resource,basePath,title } = this.props;
        const defaultProps = {
          basePath,
          data: { ...record, id: record._id },
          id: record._id,
          isLoading: false,
          location: { pathname: `${resource}/${record._id}` },
          params: { id: record._id },
          match: { params: { id: record._id } },
          resource: resource
        };
        return <Edit {...defaultProps} title={title}>
        {this.props.children}
        </Edit>;
        // return cloneElement(Edit, {
        //   ...defaultProps});
      };

  render() {
    console.log(this.props);
    const { isLoading, isget,  } = this.props;
    if (isLoading) {
      //等待图标
      return <CircularProgress size={60} thickness={7} />;
    }
    // return (<div>
    //   1、外面是List
    //   2、里面是Form
    //   3、根据记录个数，判断是新增还是编辑
    // </div>);
    if (!isget) {
      return this.renderCreate();
    }

    return this.renderEdit();
  }
}

const mapStateToProps = ({ singledocumentpage }, props) => {
  const { mapdata } = singledocumentpage;
  const dataobj = _.get(mapdata, props.resource, {
    isLoading: true,
    isget: false,
    record: {}
  });
  console.log(`${props.resource}==>${JSON.stringify(dataobj)}`);
  return { ...dataobj };
  // return { ...state };
};

Page = connect(mapStateToProps)(Page);
export default Page;

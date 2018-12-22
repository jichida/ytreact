import React, { PureComponent }  from 'react';
import { List } from 'antd';
import map from 'lodash.map';
import get from 'lodash.get';
import { connect } from 'react-redux';
// import styles from './index.module.less';
import {set_weui} from '../../actions';

const listtypeiddata = {

};
/*
'productlist':{
    currentpage
}
*/
class AntdTable extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
          dataSource: [],
          pagination: {
            current:1,
            pageSize:this.props.pagenumber,
            total:1
          },
          refreshing: false,
          pos:0
        }
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //   const nextData = get(nextProps,'query',{});
    //   const curData = get(this.props,'query',{});
    //   if( nextData.length === curData.length ){
    //     if(JSON.stringify(nextData) === JSON.stringify(curData)){
    //       return false;
    //     }
    //   }
    //   window.setTimeout(()=>{
    //     this.onRefresh();
    //   },0);
    //
    //   return true;//render
    // }

    // componentWillUnmount() {
    //   this.mounted = false;
    // }
    // handleTableChange = (pagination, filters, sorter) => {
    //   const pager = { ...this.state.pagination };
    //   pager.current = pagination.current;
    //   this.setState({
    //     pagination: pager,
    //   });
    //   this.onAjax(this.props.query,this.props.sort,this.props.pagenumber,pager.current);
    // }

    onChangePage = (curpage)=>{
      const pager = { ...this.state.pagination };
      pager.current = curpage;
      this.setState({
        pagination: pager,
      });
      this.onAjax(this.props.query,this.props.sort,this.props.pagenumber,pager.current);
    }

    onAjax(query,sort,pagenumber,page){
      let that = this;
      this.props.dispatch(this.props.queryfun({
          query: query,
          options: {
              select:this.props.select || {},
              sort: sort,
              page: page,
              limit: pagenumber,
          }
      })).then(({result})=> {
        if (that.mounted){
          let initData = [];
          if(!!result){
            map(result.docs,(item)=>{
              item = that.props.onItemConvert(item);
              initData.push(item);
            });
          }
          that.setState({
            dataSource:[...initData],
            refreshing: false,
            pagination:{
              pageSize:pagenumber,
              current:result.page,
              total:result.total,
            }
          });
        }
      }).catch((e)=>{
        this.setState({ refreshing: false });
        console.log(e);
        this.props.dispatch(set_weui({
          toast:{
          text:e,
          show: true,
          type:'warning'
        }}));
      });
    }

    // componentWillMount() {
    //
    // }
    componentWillUnmount() {
      this.mounted = false;
      let pos = get(this,'refs.antdtable.scrollProperties.offset',0);
      listtypeiddata[this.props.listtypeid] = {
        dataSource:this.state.dataSource,
        pagination:this.state.pagination,
        pos:pos//document.body.scrollTop||document.documentElement.scrollTop
      };

    }

    componentDidMount() {
      this.mounted = true;
      let saveddata = listtypeiddata[this.props.listtypeid];
      if(!!saveddata && this.props.usecache){//first time
        this.setState({
          dataSource:saveddata.dataSource,
          refreshing:false,
          pagination:saveddata.pagination
        });
      }
      else{
        if(!!saveddata){
          delete listtypeiddata[this.props.listtypeid];
        }
        this.onRefresh();
      }
      // this.refs.antdtable.scrollTo(0,this.state.pos);
      // this.setState({ refreshing: true });
      // this.onAjax(this.props.query,this.props.sort,this.props.pagenumber,1);
     }
     onRefresh() {
       if(!!this.props.query){
         this.setState({ refreshing: true });
         this.onAjax(this.props.query,this.props.sort,this.props.pagenumber,1);
       }
     }

    // In the fifth row, other columns are merged into first column
    // by setting it's colSpan to be 0
    onRow(record){
      return {
        onClick: () => {
          if(!!this.props.onClickRow){
            this.props.onClickRow(record);
          }
        },       // 点击行
        onMouseEnter: () => {},  // 鼠标移入行
      };
    }
    render() {

        const { tableprops } = this.props;

        return (
            <List
                {...tableprops}
                ref='antdtable'
                dataSource={this.state.dataSource}
                pagination={{
                  onChange: (page) => {   // 分页逻辑
                    console.log(page);
                    this.onChangePage(page);
                  },
                  pageSize: this.state.pagination.pageSize,
                  current:this.state.pagination.current,
                  total:this.state.pagination.total,
                }}
                renderItem={this.props.renderItem}
            />
        );
    }
}
export default connect(null, null, null, { withRef: true })(AntdTable);

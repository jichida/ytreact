import React from 'react';

const IndexSearch = ()=>{

  return (<div className="contain">
        <ul>
            <li>
                <h2>选择省市区</h2>
                <select name="" id="">
                            <option value="">请选择省</option>
                    </select>
                <select name="" id=""><option value="">请选择市</option></select>
                <select name="" id=""><option value="">请选择区</option></select>
            </li>
            <li>
                <h2>经销商名称</h2>
                <select name="" id="" className="select2"><option value="">请选择经销商名称</option></select>
            </li>

            <li>
                <h2>客户名称</h2>
                <input type="text" placeholder="请输入客户名称" />
            </li>
            <button className="jban"><a href="sjlb.html">立即搜索</a></button>
            <div className="clear"></div>
        </ul>


    </div>);
}

export default IndexSearch;

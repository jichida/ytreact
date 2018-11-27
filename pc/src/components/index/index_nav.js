import React from 'react';

const IndexNav = ()=>{

  return (<ul className="choose">
              <a href="ycjq.html">
                  <li className="search1" 
                  style={{backgroundImage: `url(${require("../img/search_a.png")})`}}>
                  </li>
              </a>
              <a href="qbsb.html">
                  <li className="search2"
                  style={{backgroundImage: `url(${require("../img/search_b.png")})`}}>
                  </li>
              </a>
              <a href="qqfb.html">
                  <li className="search3" 
                  style={{backgroundImage: `url(${require("../img/search_c.png")})`}}>
                  </li>
              </a>
              <div className="clear"></div>
          </ul>);
}

export default IndexNav;

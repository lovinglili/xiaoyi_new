
import styled from "styled-components";

export const Footer = styled.div`
  min-width: 1190px;
  overflow:hidden;
  margin-top:24px;
  
  .cf:after, .cf:before {
    content: "";
    display: table;
  }

  .foot-panel {
    height: 75px;
    background: #fff;
    .foot-panel-inner {
      width: 1190px;
      padding: 0 30px;
      margin: 0 auto;

    }
    
    .up-left {
      float: left;
    }
    .up-left-slogan {
      max-width: 530px;
      margin-top: 20px;
      font-size: 20px;
    }
    .up-right {
      float: right;
      text-align: right;
    }
  }
  .foot-bar {
    background: #2e2e2e;
  }
  .foot-bar-inner {
    width: 1190px;
    margin: 0 auto;
    text-align: center;
  }
  .foot-bar-up {
    margin: 30px 0 10px;

    span {
      display: inline-block;
      padding: 0 20px;
      border-right: 1px solid #999;
      font-size: 12px;
      color: #999;
   }
   span:last-child {
    border-right: none;
   }
  }
  .foot-bar-down {
    margin-bottom: 30px;
    
    a, span {
      padding: 0 10px;
      font-size: 12px;
      color: #999;
    }
  }
`;

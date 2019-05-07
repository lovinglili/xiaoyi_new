import styled from "styled-components";

export const Category = styled.div`
  .ant-layout-header {
    background: #fff;
    height: 80px;
    line-height: 80px;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 12;
    box-shadow: 10px 5px 5px #eee;
  }
`;

export const ContentCon = styled.div`
  padding: 104px 104px 0 104px;
  width: 1040px;
  margin: 0 auto;
  .ant-card-meta-detail > div:not(:last-child) {
    margin-bottom: 0;
  }
  .ant-card-body {
    text-align: left;
    padding: 16px;
  }
  >.ant-card {
    .ant-card-body {
      padding: 12px;  
      ul{
        display:inline-block;
      }  
      ul:last-child{
        float:right;
      }   
      ul:first-child {
        list-style:none;
        margin-bottom:0;
        li{
            float:left;
            cursor:pointer;
            padding: 0 8px;
            margin: 0;
            line-height: 24px;
            height: 24px;
            background:#fff;
        }
      }
    }
  }
`;

export const DetailCardContainer = styled.div`
  > div:nth-of-type(3n-1) {
    margin: 0 25px;
  }
`;

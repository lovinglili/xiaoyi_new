import styled from "styled-components";

export const HomeContainers = styled.div`
text-align: center;
  height: 500px;
  margin: 104px auto;
  .ant-carousel .slick-slide {
    text-align: center;
    height: 250px;
    line-height: 350px;
    overflow: hidden;
  }
`;

export const ContentContainer = styled.div`
  margin-top: 32px;
  .ant-radio-group.ant-radio-group-outline {
    margin: 16px;
  }
`;

export const XiaoYiStyle = styled.div`
  ul {
    list-style: none;
  }
  .ant-layout-header {
    background: #fff;
    height: 80px;
    line-height: 80px;
    position:fixed;
    width: 100%;
    z-index: 12;
    top:0;
    box-shadow: 0 5px 3px #eee;
    border-bottom: 1px solid #ccc
    }
`;

export const BuyContainer = styled.div`
  li {
    margin-top: 24px;
    a {
      display: inline-block;
    }
  }
`;


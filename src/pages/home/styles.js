import styled from "styled-components";

export const HomeContainers = styled.div`
text-align: center;
  height: 500px;
  margin: 80px auto;
  .ant-carousel .slick-slide {
    text-align: center;
    height: 300px;
    line-height: 350px;
    overflow: hidden;
  }
`;

export const ContentContainer = styled.div`
  width:70%;
  margin:32px auto 0 auto;
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

export const RedBlock=styled.div`
height:30px;
background:red;
width:10px;
margin-bottom:8px;
&:after{
  content:'${props=>props.title}';
  display:inline-block;
  width:80px;
  font-weight:600;
  line-height:30px;
  margin-left:15px;
  font-size:16px;
}
`
export const ImgWrapper=styled.div`
width:100%;
height:100px;
overflow:hidden;
img{
  &:hover{
    transform: scale(1.1);
    transition-duration:500ms;
  }
}
`
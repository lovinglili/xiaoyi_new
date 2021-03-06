
import styled from "styled-components";

export const Header = styled.div`
.ant-col-8 {
    a {
      display: inline-block;
      padding: 0 16px;
      cursor: pointer;
        &:hover{
          color:#df9c9c;
        }
      
    }
  }
`;
export const CategoryContainer =styled.div`
background:#fff;
display:flex;
width:600px;
padding:12px;
justify-content:space-between;
dt{
  margin-bottom:8px;
}
dd{
  font-size:12px;
  float:left;
  padding:0 6px;
  a{
    &:hover{
      color:#df9c9c;
    }
  }
}
>div:first-child{
  width:120px;
  margin-right:12px;
  border-right:1px dashed #bbb;
}
div:last-child{
  flex:1;
}
`;
import styled from 'styled-components';

export const Detail =  styled.div`
width:100%;
height:100%;
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

export const DetailTop =  styled.div`
width:100%;
height:600px;
margin-top: 84px;
`;

export const DetailBottom =  styled.div`
width:100%;
background:blue;
`;

export const GoodTitle = styled.div`
font-size: 20px;
color: #333;
margin-bottom: 20px;
display: -webkit-box;
-webkit-line-clamp: 2;
overflow: hidden;
`

export const GoodPrice = styled.div`
padding: 25px 30px;
background: #f7f7f7;
>div {
  margin-bottom: 16px;
  display: flex;
  .text {
    font-size: 14px;
    margin-right: 24px;
    color: #999;
  }
}
.sale-price {
  margin-bottom: 16px;
  .price {
    font-family: jdzh-r;
    font-size: 28px;
    font-weight: 700;
    color: #ff3434;
    line-height: 28px;
  }
}
.production-price {
  margin-bottom: 16px;
  .price {
    font-family: jdzh-r;
    font-size: 20px;
    text-decoration: line-through;
    color: #666;
    line-height: 20px;
  }
}
.sale-address {
  margin-bottom: 16px;
  .price {
    font-size: 14px;
    color: #333;
  }
}
`

export const BusinessMessage = styled.div`
position: relative;
margin-top: 10px;
padding: 20px 30px 16px;
border: 1px solid #e9e9e9;
.contact {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: start;
  justify-content: flex-start;
  -ms-flex-align: center;
  align-items: center;
  ${ props => props.inputColor || "blue" };
  .contact-seller {
    padding: 6px 16px;
    background: ${ props =>((props.nickName===props.userName || props.status===1) ?' #eee' : '#ff3434')};
    color: #fff;
    cursor:'pointer';
    .phone-number {
      display: inline-block; 
      vertical-align: middle;
      font-family: jdzh-r;
      line-height: 28px;
      font-size: 24px;
    }
  }
}
`

export const ProductDetail = styled.div`
float: left;
width: 790px;
margin-right: 10px;
background: #fff;
padding: 40px 80px;

.clearfix:after {
  content: "";
  display: table;
  line-height: 0;
  clear: both;
}

.title {
  text-align: center;
  margin-bottom: 22px;
}
.con {
  margin-bottom: 20px;
  p {
    font-size: 14px;
    line-height: 24px;
    color: #333;
    letter-spacing: 1px;
    text-align: center;
  }
}
.img-info {
  .bigImg {
    width: 630px;
    height: 630px;
    overflow: hidden;
  }

  .commonImg {
    margin-right: -20px;
    
    ul li {
      float: left;
      margin: 20px 20px 0 0;
    }
  }
}
`
import styled from 'styled-components';

export const SubmitOrder =  styled.div`
width:100%;
height:100%;
background:red;
`;

export const BusinessMessage = styled.div`
position: relative;
margin-top: 10px;
padding: 20px 30px 16px;
.contact {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: end;
  justify-content: flex-end;
  -ms-flex-align: center;
  align-items: center;

  .contact-seller {
    padding: 6px 16px;
    background: #ff3434;
    color: #fff;
    cursor: pointer;

    .phone-number {
      display: inline-block;
      vertical-align: middle;
      font-family: jdzh-r;
      line-height: 28px;
      font-size: 22px;
    }
  }
}
`
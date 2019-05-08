import styled from 'styled-components';

export const MySelf =  styled.div`
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
.ant-layout-content {
    margin: 20px 88px;
}
`;

export const PopoverContainer=styled.div`
width:300px;
height:86px;
margin:8px 0;
.ant-form.ant-form-horizontal{
    >.ant-row.ant-form-item:nth-child(2){
        text-align: right;
        margin-bottom:0 !important;
    }   
}
.ant-input-number{
    min-width:200px;
}
`

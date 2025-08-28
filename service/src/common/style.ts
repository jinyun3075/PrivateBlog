import styled from "styled-components";



export const BothPadding = styled.div`
  width:100%;
  height:100%;
  padding:0 160px;

  @media screen and (max-width: 1400px){
    padding:0 140px;
  }

  @media screen and (max-width: 1200px){
    padding:0 120px;
  }

  @media screen and (max-width: 992px){
    padding:0 100px;
  }

  @media screen and (max-width: 768px){
    padding:0 36px;
  }

  @media screen and (max-width: 576px){
    padding:0 24px;
  }
`

export const GlobalContainer = styled.section`
  width:100%;
  height:auto;
  position:relative;

  @media screen and (max-width: 992px){
  }

  @media screen and (min-width: 992px){

  }

  @media screen and (max-width: 992px){
  }

  @media screen and (min-width: 992px){
  }
  
`


export const MainArea = styled.div`
  width: 1200px;
  margin:0 auto;
`
import { Outlet } from "react-router-dom"
import Header from "../components/header/header"
import Footer from "../components/footer/footer"
import styled from "styled-components"
import TopBtn from "../components/topBtn/topBtn";
import { useEffect, useState } from "react";

const HEADER_HEIGHT = 60;

const Root = () => {

  const [searchKeyword, setSearchKeyword] = useState<string>("");

  return(
    <Container>

      <HeaderWrapper>
        <Header searchKeyword={searchKeyword} setSearchKeyword={setSearchKeyword}/>
      </HeaderWrapper>

      <OutLetWrapper>
        <Outlet context={searchKeyword}/>
      </OutLetWrapper>

      <Footer />
      
      <TopBtn />
    </Container>
  )
}

const Container = styled.div`
  width:100%;
  height:100%;
  display: flex;
  flex-direction: column;
`

const HeaderWrapper = styled.div`
  width: 100%;
  height:${HEADER_HEIGHT}px;
  position: fixed;
  top:0px;
  right:0;
`

const OutLetWrapper = styled.div`
  padding-top: ${HEADER_HEIGHT}px;
  height:100%;
`

export default Root
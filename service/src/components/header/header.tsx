import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";



interface HeaderProps {
  searchKeyword:string;
  setSearchKeyword:(value:string)=>void;
}
const Header = ({searchKeyword,setSearchKeyword}:HeaderProps) => {


  const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value)
  }


  return (
    <Container>
      <Main>

        <Link to ="/">
          <Logo src="/img/스케일jpg"/>
        </Link>

        <SearchBar placeholder ="검색어를 입력하세요." value = {searchKeyword} onChange={onChange}/>
      </Main>
    </Container>
  );
};


const Container = styled.header`
  width: 100%;
  height: 100%;
`

const Main = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin:0 auto;
  width: 1280px;
  height:100%;
`

const Logo = styled.img`
  width: 100px;
  height: 40px;
  cursor: pointer;
`

const SearchBar = styled.input`
  
`


export default Header;

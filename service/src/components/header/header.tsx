import { Link } from "react-router-dom";
import styled from "styled-components";
import SearchBar from "../searchBar/searchBar";
import { MainArea } from "../../common/style";
import { useEffect } from "react";



interface HeaderProps {
  searchKeyword:string;
  setSearchKeyword:(value:string)=>void;
}
const Header = ({searchKeyword,setSearchKeyword}:HeaderProps) => {

  useEffect(()=>{
    console.log(searchKeyword)
  },[searchKeyword])


  return (
    <Container>
      <Main>

        <Link to ="/">
          <Logo src="/img/mainLogo.png"/>
        </Link>

        <SearchBar 
          placeholder ="검색어를 입력하세요." 
          searchKeyword = {searchKeyword} 
          setSearchKeyword={setSearchKeyword}
        />
      </Main>
    </Container>
  );
};


const Container = styled.header`
  width: 100%;
  height: 76px;
  background-color: #FFFFFF;
`

const Main = styled(MainArea)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin:0 auto;
  height:100%;
`

const Logo = styled.img`
  width: 151px;
  height: 36px;
  cursor: pointer;
`


export default Header;

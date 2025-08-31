import { Link } from "react-router-dom";
import styled from "styled-components";
import SearchBar from "../searchBar/searchBar";
import { MainArea } from "../../common/style";

const Header = () => {

  return (
    <Container>
      <Main>

        <Link to ="/">
          <Logo src="/img/mainLogo.png"/>
        </Link>

        <SearchBar 
          placeholder ="검색어를 입력하세요." 
        />
      </Main>
    </Container>
  );
};


const Container = styled.header`
  width: 100%;
  height: 76px;
  background-color: #FFFFFF;
  z-index: 1000;
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

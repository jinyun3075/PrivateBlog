import styled from "styled-components";

const Header = () => {
  return (
    <Container>
      <Main>
        <h1>My Blog</h1>
        <Navbar>
          <ul>
            <Nav>Home</Nav>
            <Nav>About</Nav>
            <Nav>Contact</Nav>
          </ul>
        </Navbar>
      </Main>
    </Container>
  );
};



const Container = styled.header`
  position: fixed;
  height: 80px; 
  top:0px;
  right:0;
  width: 100%;
  background-color: aliceblue;
`

const Main = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin:0 auto;
  width: 1280px;
  height:100%;
`

const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  ul{
    padding: 0;
    width: 100%;
    gap:20px;
    display: flex;
  }
`

const Nav = styled.li`
  font-size: 16px;
  list-style: none;
  cursor: pointer;
`

export default Header;

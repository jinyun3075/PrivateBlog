import styled from "styled-components";
import { MainArea } from "../common/style";

const Home = () => {

  return (
    <Container>
      <Main>
        <h1>Main</h1>
      </Main>
    </Container>
  );
};



const Container = styled.div`
  height: 100%;
  background-color: #d4e2c6;
`

const Main = styled(MainArea)`
  height: 100%;
  background-color: #a2c57f;
`

export default Home;

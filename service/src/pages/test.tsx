import styled from "styled-components";
import { MainArea } from "../common/style";

const Test = () => {

  return (
    <Container>
      <Main>
        <h1>Test</h1>
      </Main>
    </Container>
  );
};



const Container = styled.div`
  height: 100%;
  background-color: transparent;
`

const Main = styled(MainArea)`
  height: 100%;
  background-color: transparent;
`

export default Test;

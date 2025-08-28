import styled from "styled-components";
import { MainArea } from "../common/style";
import { useParams } from "react-router-dom";

const Detail = () => {

  const {id:blogId} = useParams();

  
  return (
    <Container>
      <Main>
        <Thumbnail />
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

const Thumbnail = styled.img`
  width: 100%;
  height:60px;
`
export default Detail;

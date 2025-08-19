import styled from "styled-components";
import { MainArea } from "../../common/style";

const Footer = () => {
  return (
    <Container>
      <MainArea>
        <h1>footer</h1>      
      </MainArea>
    </Container>
  );
};



const Container = styled.footer`
  width: 100%;
  height: 200px;
  background-color: #224747;
`




export default Footer;

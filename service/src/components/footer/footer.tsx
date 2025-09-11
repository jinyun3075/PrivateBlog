import styled from "styled-components";
import { MainArea } from "../../common/style";

const Footer = () => {
  return (
    <Container>
      <Content>
        <CopyRight>Copyright © Iting. All Rights Reserved.</CopyRight>
      </Content>
    </Container>
  );
};



const Container = styled.footer`
  margin-top:80px;
  width: 100%;
  height: 160px;
  background-color: transparent;
`

const Content = styled(MainArea)`
  padding:71px 20px;  
`

const CopyRight = styled.p`
  font-size: 13px;
  color:#9CA3AF;
`

export default Footer;

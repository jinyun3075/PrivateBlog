import styled from "styled-components";
import { MainArea } from "../../common/style";

const Footer = () => {
  return (
    <Container>
      <Content>
        <SocialWrapper>
          <SocialIcon src="/img/icon_instagram.png"/>
          <SocialIcon src="/img/icon_youtube.png"/>
          <SocialIcon src="/img/icon_blog.png"/>
        </SocialWrapper>

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
  padding:47px 20px;  
`

const SocialWrapper = styled.div`
  display: flex;
  gap:16px;
`

const SocialIcon = styled.img`
  width: 30px;
  height: 30px;
  cursor: pointer;
`

const CopyRight = styled.p`
  margin-top: 18px;
  font-size: 13px;
  color:#9CA3AF;
`

export default Footer;

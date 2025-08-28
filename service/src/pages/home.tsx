import styled from "styled-components";
import { MainArea } from "../common/style";
import BlogList from "../components/home/mainContents/mainContents";
import NotExistHeadline from "../components/home/headline/notExistHeadline";
import HeadlineList from "../components/home/headline/headlineList";
import MainContents from "../components/home/mainContents/mainContents";

const Home = () => {
  const notExistBestBlog = false;
  return (
    <Container>
      <Main>
        {notExistBestBlog ? <NotExistHeadline /> :<HeadlineList/>}
        
        <MainContents />
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

export default Home;

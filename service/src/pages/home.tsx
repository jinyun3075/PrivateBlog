import styled from "styled-components";
import { MainArea } from "../common/style";
import BlogList from "../components/home/blogList/blogList";
import NotExistHeadline from "../components/home/headline/notExistHeadline";
import HeadlineList from "../components/home/headline/headlineList";

const Home = () => {
  const notExistBestBlog = false
  return (
    <Container>
      <Main>
        {notExistBestBlog ? <NotExistHeadline /> :<HeadlineList/>}
        
        <BlogList />
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

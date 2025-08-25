import styled from 'styled-components';
import Footer from './components/footer/footer';
import Header from './components/header/header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import "./common/reset.css";

const App = () => {

  return (
    <Container>
      <Header />
      <Main>
        <Router>  
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Router>
      </Main>
      <Footer />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width:100%;
  min-height: 100vh;
`;

const Main = styled.main`
  width:100%;
  flex: 1;  // 남은 공간 모두 차지
  padding-top: 80px;
`;

export default App;

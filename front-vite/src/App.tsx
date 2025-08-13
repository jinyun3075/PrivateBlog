import Footer from './components/footer/footer';
import Header from './components/header/header';
import Home from './pages/home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


const App = () => {

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;

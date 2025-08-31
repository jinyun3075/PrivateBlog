import styled from 'styled-components';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/home';
import "./common/reset.css";
import Root from './pages/root';
import Detail from './pages/detail';
import Search from './pages/search';


const router = createBrowserRouter([
  {
    path:"/",
    element:<Root />,
    children:[
      {
        index:true,
        element:<Home />
      },
      {
        path:"search",
        element:<Search />
      },
      {
        path:"detail/:id",
        element:<Detail />
      },
    ]
  }
  // errorElement:<Test />, 
])


const App = () => {

  return (
    <Container>
      <RouterProvider router = {router} />
    </Container>
  );
};

const Container = styled.div`
  position:relative;
  width:100%;
`;


export default App;

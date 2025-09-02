import styled from 'styled-components';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import "./common/reset.css";
import Login from './pages/login';
import Root from './pages/root';
import Dashboard from './pages/dashboard';



const router = createBrowserRouter([
  {
    path: '/',
    element:<Root />,
    children: [
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
    ],
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

import styled from 'styled-components';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import "./common/reset.css";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import Login from './pages/login';
import Root from './pages/root';
import Dashboard from './pages/dashboard';
import PostCreate from './pages/postCreate';



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
      {
        path: 'post/create',
        element: <PostCreate />, 
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

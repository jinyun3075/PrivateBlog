import styled from 'styled-components';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import "./common/reset.css";
import "./common/designSystem";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import Login from './pages/login';
import Root from './pages/root';
import Dashboard from './pages/dashboard';
import PostCreate from './pages/postCreate';
import Category from './pages/category';
import TopHeadline from './pages/topHeadline';
import Post from './pages/post';

const router = createBrowserRouter([
  {
    path: '/',
    element:<Root />,
    children: [
      {
        index: true,
        element: <Navigate to="/login" replace />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'topHeadline',
        element: <TopHeadline />,
      },
      {
        path: 'category',
        element: <Category />,
      },
      {
        path: 'post',
        element: <Post />,
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

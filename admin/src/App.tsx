import styled from 'styled-components';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
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
      {
        path: 'post/update/:id',
        element: <PostCreate />, 
      },
    ],
  }
  // errorElement:<Test />, 
], {
  basename: '/admin'
})


const App = () => {
  const queryClient = new QueryClient();
  
  return (
    <Container>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router = {router} />
      </QueryClientProvider>
    </Container>
  );
};

const Container = styled.div`
  position:relative;
  width:100%;
`;


export default App;

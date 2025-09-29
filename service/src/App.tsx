import styled from 'styled-components';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/home';
import "./common/reset.css";
import Root from './pages/root';
import Detail from './pages/detail';
import Search from './pages/search';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Error from './pages/error';
import { useEffect } from 'react';
import { incrementVisitorCountOnceToday } from './utils/visitorCount';


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
    ],
    errorElement:<Error />, 
  }
])


const App = () => {

  const queryClient = new QueryClient();

  // 사용자가 사이트에 접속할 때 방문자 수 증가 (하루에 한 번만)
  useEffect(() => {
    incrementVisitorCountOnceToday();
  }, []);

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

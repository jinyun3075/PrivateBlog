import { Outlet, useLocation, useNavigate } from "react-router-dom"
import styled from "styled-components"
import { useEffect, useMemo, useState } from "react";
import SideNavigationBar from "../components/snb/sideNavigationBar";
import GlobalHeader from "../components/gnb/globalHeader";
import { loadAccessToken, useAuthStore } from "../store/useAuth";

const HEADER_HEIGHT = 76;

const Root = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn, onLogout } = useAuthStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarWidth =  useMemo<number>(()=>isSidebarOpen ? 216 : 0,[isSidebarOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === ']' || e.code === 'BracketRight') {
        setIsSidebarOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Redirect to login if not authenticated (except login route)
  useEffect(() => {
    const token = loadAccessToken();
    const isLoginRoute = location.pathname === '/login';
    if (!token && !isLoginRoute) {
      navigate('/login', { replace: true });
      return;
    }
    if (token && isLoginRoute) {
      navigate('/dashboard', { replace: true });
    }
  }, [location.pathname, navigate]);

  useEffect(() => {
    const interval = setInterval(() => {
      const { sessionExpiresAt, onLogout } = useAuthStore.getState();
      if (sessionExpiresAt && Date.now() > sessionExpiresAt) {
        onLogout();
        navigate('/login', { replace: true });
      }
    }, 1000 * 10); 
  
    return () => clearInterval(interval);
  }, [navigate]);

  return(
    <Container>

      <HeaderWrapper $isSidebarOpen={isSidebarOpen} $sidebarWidth={sidebarWidth}>
        <GlobalHeader 
          isSidebarOpen={isSidebarOpen}
          onToggle={() => setIsSidebarOpen(prev => !prev)}/>
      </HeaderWrapper>

      {location.pathname !== '/login' && (
        <SideNavigationBar
          isOpen={isSidebarOpen}
        />
      )}

      <OutLetWrapper style={{ marginLeft: `${sidebarWidth}px` }}>
        <Outlet />
      </OutLetWrapper>

    </Container>
  )
}

const Container = styled.div`
  width:100%;
  height:100%;
  display: flex;
  flex-direction: column;
`

const HeaderWrapper = styled.div<{$isSidebarOpen:boolean; $sidebarWidth:number;}>`
  width: ${props=> props.$isSidebarOpen ? `calc(100% - ${props.$sidebarWidth})`:`100%`};
  height:${HEADER_HEIGHT}px;
  position: fixed;
  top:0px;
  right:0;
  left:${props=>props.$isSidebarOpen ? props.$sidebarWidth:0}px;
`

const OutLetWrapper = styled.div`
  padding-top: ${HEADER_HEIGHT}px;
  min-height: 100vh;
  height:100%;
  transition: margin-left 0.2s ease-in-out;
`

export default Root
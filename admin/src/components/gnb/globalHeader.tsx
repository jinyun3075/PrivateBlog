import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { colors } from "../../common/designSystem";
import { useAuthStore } from "../../store/useAuth";

type HeaderProps = {
  isSidebarOpen: boolean;
  onToggle: () => void;
}

const GlobalHeader = ({isSidebarOpen,onToggle}:HeaderProps) => {
  const { isLoggedIn, userName, sessionExpiresAt, onLogout, extendSession } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();
  const isLoginPage = location.pathname === '/login';
  const toggleImg = useMemo<string>(() => isSidebarOpen ? 'icon_gnb_arrowLeft.png':'icon_gnb_arrowRight.png',[isSidebarOpen]);

  const [remainingSec, setRemainingSec] = useState<number | null>(null);

  useEffect(() => {
    if (!sessionExpiresAt) { setRemainingSec(null); return; }
    const update = () => setRemainingSec(Math.max(0, Math.floor((sessionExpiresAt - Date.now()) / 1000)));
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [sessionExpiresAt]);

  const handleLogout = () => {
    onLogout();
    navigate('/login', { replace: true });
  };

  const handleExtend = () => {
    // extend by 60 minutes
    extendSession(60 * 60 * 1000);
  };

  return (
    <Container>
      <LeftArea>
        {!isLoginPage && <ToggleButton src={`/admin/img/${toggleImg}`} onClick={onToggle}/>}
        <Link to={isLoggedIn ? "/dashboard" : "/login"}>
          <MainLogo src="/admin/img/mainLogo.png"/>
        </Link>
      </LeftArea>

      {!isLoginPage && isLoggedIn && (
        <RightArea>
          <UserName>{userName} <span>님</span></UserName>
          <TimeArea>
            <div>
              <ClockIcon src="/admin/img/icon_clock.png" />
              <SessionText>{formatTime(remainingSec)}</SessionText>
            </div>
            <ExtendButton onClick={handleExtend}>시간연장</ExtendButton>
          </TimeArea>
          <LogoutArea onClick={handleLogout}>
            <LogoutText>로그아웃</LogoutText>
            <LogoutImg src="/admin/img/icon_logout.png"/>
          </LogoutArea>
        </RightArea>
      )}
    </Container>
  );
};

const formatTime = (sec: number | null) => {
  if (sec === null) return '—';
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
}


const Container = styled.header`
  position:relative;

  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 76px;
  background-color: #FFFFFF;
  padding: 20px 32px;
  z-index: 1000;
  border: 1px solid ${colors.LightGray[300]};
`

const LeftArea = styled.div`
  display: flex;
  align-items: center;
  gap:20px;
`
const ToggleButton = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
`

const MainLogo = styled.img`
  width: 197px;
  height: 36px;
  cursor: pointer;
`

const RightArea = styled.div`
  display: flex;
  align-items: center;
  gap:20px;
`

const UserName = styled.p`
  font-family: 'Pretendard-SemiBold';
  color: ${colors.Black};
  font-size: 14px;

  span{
    font-family: 'Pretendard-Regular'; 
  }
`

const ClockIcon = styled.img`
  width: 16px;
  height: 16px;
`

const TimeArea = styled.div`
  display: flex;
  align-items: center;
  gap:15px;
  cursor: pointer;
  padding: 10px 8px;
  div{
    display: flex;
    align-items: center;
    gap:5px;
  }
`

const SessionText = styled.span`
  font-family: 'Pretendard-Regular'; 
  font-size: 14px;
  color: ${colors.Gray[100]};
  min-width:38px;
`

const ExtendButton = styled.button`
  padding: 4px 10.5px;
  font-family: 'Pretendard-SemiBold';
  font-size: 14px;
  color:${colors.LightGray[400]};
  background: ${colors.White};
  border: 1px solid ${colors.LightGray[400]};
  border-radius: 4px;
  cursor: pointer;
`

const LogoutArea = styled.div`
  display: flex;
  align-items: center;
  gap:4px;
  cursor: pointer;
  padding:10px;
`

const LogoutText = styled.span`
  font-family: 'Pretendard-Regular'; 
  font-size: 14px;
  color: ${colors.Black};
  cursor: pointer;
`

const LogoutImg = styled.img`
  width: 14px;
  height: 14px;
`


export default GlobalHeader;

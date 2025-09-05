import { Link } from "react-router-dom";
import styled from "styled-components";

type HeaderProps = {
  isSidebarOpen: boolean;
  onToggle: () => void;
}

const Header = ({isSidebarOpen,onToggle}:HeaderProps) => {

  return (
    <Container>
      <ToggleButton 
        src={`/img/${isSidebarOpen ? `icon_gnb_arrowLeft.png` : `icon_gnb_arrowRight.png`}`}
        onClick={onToggle}
         />
      

      <LogoWrapper>
        <Link to ="/dashboard">
          <MainLogo src="/img/mainLogo.png"/>
        </Link>
        <AdminLogo src="/img/adminLogo.png"/>
      </LogoWrapper>
      

    </Container>
  );
};


const Container = styled.header`
  position:relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 76px;
  background-color: #FFFFFF;
  padding: 20px 0 20px 64px;
  z-index: 1000;
`
const ToggleButton = styled.img`
  width: 28px;
  height: 28px;
  border-radius: 14px;
  border: 1px solid #D1D5DB;
  background: #FFFFFF;
  color: #1E1E1E;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  margin-right: 16px;
`

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`

const MainLogo = styled.img`
  width: 151px;
  height: 36px;
  cursor: pointer;
`

const AdminLogo = styled.img`
  width: 103px;
  height: 32px;
  cursor: pointer;
`


export default Header;

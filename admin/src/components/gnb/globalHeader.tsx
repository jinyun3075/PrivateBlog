import { useMemo } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { colors } from "../../common/designSystem";

type HeaderProps = {
  isSidebarOpen: boolean;
  onToggle: () => void;
}

const GlobalHeader = ({isSidebarOpen,onToggle}:HeaderProps) => {

  const toggleImg = useMemo<string>(() => isSidebarOpen ? 'icon_gnb_arrowLeft.png':'icon_gnb_arrowRight.png',[isSidebarOpen]);

  return (
    <Container>
      <ToggleButton src={`/img/${toggleImg}`} onClick={onToggle}/>
      
      <Link to ="/dashboard">
        <MainLogo src="/img/mainLogo.png"/>
      </Link>

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
  padding: 20px 0 20px 32px;
  z-index: 1000;
  border: 1px solid ${colors.LightGray[300]};
`
const ToggleButton = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 14px;
  cursor: pointer;
  margin-right: 16px;
`

const MainLogo = styled.img`
  width: 197px;
  height: 36px;
  cursor: pointer;
`


export default GlobalHeader;

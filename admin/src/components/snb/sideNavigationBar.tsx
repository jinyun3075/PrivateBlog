import styled from "styled-components"
import { useNavigate } from "react-router-dom"

type SideNavigationBarProps = {
  isOpen: boolean;
}

const SIDEBAR_WIDTH = 216;

const SideNavigationBar = ({ isOpen }: SideNavigationBarProps) => {
  const navigate = useNavigate();
  const goCreate = () => navigate('/post/create');
  return(
    <Sidebar $isHide={!isOpen}>
      <Create onClick={goCreate}>글쓰기</Create>

      
    </Sidebar>
  )
}

const Sidebar = styled.aside<{$isHide:boolean}>`
  position: fixed;
  top: 0;
  left: 0;
  transform: ${props=>props.$isHide && `translateX(-100%)`};
  
  padding:16px 8px;
  width: ${SIDEBAR_WIDTH}px;
  height: 100vh;

  background: #ffffff;
  border-right: 1px solid #E5E7EB;
  z-index: 900;
`

const Create = styled.button`
  width: 100%;
  height: 40px;
  color:#FFFFFF;
  background-color: #1B7EFF;
  border-radius: 4px;
`

export default SideNavigationBar
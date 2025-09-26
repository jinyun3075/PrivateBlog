import styled from "styled-components"
import { useLocation, useNavigate } from "react-router-dom"
import { colors } from "../../common/designSystem"
import { MENU_CONFIG, MenuItemType, SIDEBAR_WIDTH } from "../../common/constants";

type SideNavigationBarProps = {
  isOpen: boolean;
}

const SideNavigationBar = ({ isOpen }: SideNavigationBarProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (path?: string) => () => {
    if (path) navigate(path);
  };

  const isActive = (path?: string) => {
    if (!path) return false;
    return location.pathname.startsWith(path);
  };

  return(
    <Sidebar $isHide={!isOpen}>
      
      <Create onClick={handleNavigate('/post/create')}>글쓰기</Create>

      <MenuWrapper>
        {MENU_CONFIG.map((item:MenuItemType) => (
          <div key={item.label}>
            <Menu $active={isActive(item.path)} onClick={handleNavigate(item.path)}>
              {item.label}
            </Menu>
            {item.children && (
              <>
                {item.children.map((child) => (
                  <SubMenu
                    key={child.label}
                    $active={isActive(child.path)}
                    onClick={handleNavigate(child.path)}> {child.label}        
                  </SubMenu>
                ))}
              </>
            )}
          </div>
        ))}
      </MenuWrapper>
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
  font-family: 'Pretendard-SemiBold';
  font-size: 14px;
  color:${colors.White};
  background-color: ${colors.Black};
  border-radius: 4px;
  &:hover{
    opacity: 0.5;
  }
`

const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap:4px;
  margin-top:30px;
  width: 100%;
`

const Menu = styled.div<{$active?: boolean}>`
  width: 100%;
  height: 40px;
  padding:9px 24px;
  cursor: ${props=>props.$active&&`pointer`};
  color: ${colors.Black};
  
  font-family:${props=>props.$active? `'Pretendard-Bold'`:`'Pretendard-Regular'`};
  font-size:14px;

  &:hover{
    color:${props=>props.$active && colors.Gray[0]};
    background-color: ${props=>props.$active && colors.LightGray[100]};
  }

`

const SubMenu = styled.div<{$active?: boolean}>`

  padding: 9px 42px;
  width: 100%;
  height: 40px;
  font-family:${props=>props.$active? `'Pretendard-Bold'`:`'Pretendard-Regular'`};
  font-size:14px;
  letter-spacing: 0;

  cursor: pointer;
  line-height: 1.6;

  &:hover{
    color:${colors.Gray[0]};
    background-color: ${colors.LightGray[100]};
  }
`
export default SideNavigationBar
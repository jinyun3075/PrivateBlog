import { Children, ReactNode } from "react";
import styled from "styled-components"

interface HeaderProps {
  title:string;
  children?: ReactNode;
}
const Header = ({title,children}:HeaderProps) => {
  return(
    <Container>
      <Title>{title}</Title>
      {children}
    </Container>
  )
}



const Container = styled.div`
  width: 100%;
  height: 100%;

  padding:20px 32px;
  margin-bottom: 20px;

  display: flex;
  justify-content: space-between;
  text-align: center;
`

const Title = styled.h1`
  font-family: 'Pretendard-Bold';
  font-size: 24px;
` 
export default Header 
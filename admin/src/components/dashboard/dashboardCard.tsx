import styled from "styled-components";
import { colors } from "../../common/designSystem";

interface DashboardCardProps {
  text:string;
  number:string;
}

const DashboardCard = ({text,number}:DashboardCardProps) => {
  return(
    <Container>
      <Text>{text}</Text>
      <Number>{number}</Number>
    </Container>
  )
  
}


const Container = styled.div`
  flex:1;
  padding:24px;
  background-color: ${colors.LightGray[0]};
  border-radius: 12px;

  display: flex;
  flex-direction: column;
  gap:25px;
`

const Text = styled.span`
  font-family: 'Pretendard-SemiBold';
  font-size: 14px;
  color:${colors.Black};  
`

const Number = styled.span`
  font-family: 'Pretendard-Bold';
  font-size: 24px;
  color:${colors.Black};  
`

export default DashboardCard
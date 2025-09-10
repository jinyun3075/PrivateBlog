import styled from "styled-components"
import { colors } from "../../common/designSystem";

interface BestBlogProps {
  ranking:number;
  category:string;
  date:string;
  author:string;
  title:string;
}
const BestBlog = ({ranking, category, date, author, title}:BestBlogProps) => {
  return(
    <Container>
      <BoldText>{ranking}</BoldText>
      <RegularText>{category}</RegularText>
      <RegularText>{date}</RegularText>
      <RegularText>{author}</RegularText>
      <BoldText>{title}</BoldText>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap:30px;
`


const BoldText = styled.span`
  font-family: 'Pretendard-SemiBold';
  font-size: 14px;
  color:${colors.Black};
`

const RegularText = styled.p`
  font-family: 'Pretendard-Regular';
  font-size: 14px;
  color:${colors.Black};
`
export default BestBlog
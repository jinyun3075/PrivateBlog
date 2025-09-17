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
      <Category>{category}</Category>
      <Date>{date}</Date>
      <Author>{author}</Author>
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

const Text = styled.p`
  font-family: 'Pretendard-Regular';
  font-size: 14px;
  color:${colors.Black};
`

const Category = styled(Text)`
  min-width: 80px;
`

const Date = styled(Text)`
  min-width: 75px;
`

const Author = styled(Text)`
  min-width: 50px;
`
export default BestBlog
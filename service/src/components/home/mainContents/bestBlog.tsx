import { Link } from "react-router-dom";
import styled from "styled-components"

type BestBlogProps = {
  ranking: number;
  title: string;
  author: string;
  postId:string;
}

const BestBlog = ({ ranking, title, author, postId }: BestBlogProps) => {
  return(
    <Container>
      <Ranking>{ranking}</Ranking>
      
      <Link to ={`/detail/${postId}`}>
        <Info>
          <Title>{title}</Title>
          <Author>{author}</Author>
        </Info>
      </Link>
    </Container>
  )
}


const Container = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  gap:10px;
  cursor: pointer;
`

const Ranking = styled.span`
	font-family: 'Pretendard-SemiBold';
  font-size: 12px;
  line-height: 1.6;
  color:#282943;
`

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap:3px;
`

const Title = styled.p`
	font-family: 'Pretendard-Regular';
  font-size: 14px;
  letter-spacing: -0.02em;
  line-height: 1.6;
  color:#1E1E1E;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 275px;
`

const Author = styled.span`
	font-family: 'Pretendard-Regular';
  font-size: 9px;
  line-height: 1.6;
  color:#1E1E1E;
  opacity: 0.61;
`

export default BestBlog
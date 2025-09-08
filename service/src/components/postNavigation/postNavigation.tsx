import styled from "styled-components"


interface PostNavigationProps { 
  postDirection:string;
  imgSrc:string;
  title:string;
  createdDate:string;
  author:string;
}
const PostNavigation = ({postDirection,imgSrc,title,createdDate,author}:PostNavigationProps) => {
  return(
    <Container>
      <Header><img src ={`/img/${imgSrc}`}/><span>{postDirection}</span></Header>

      <Title>{title}</Title>

      <Info>
        <span>{createdDate}</span>
        <span>|</span>
        <span>{author}</span>
        <span>|</span>
      </Info>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  background-color: #F7F7F8;
  padding:38px 0 38px 84px;
  border-radius: 16px;
`

const Header= styled.div`
  display: flex;
  align-items: center;
  gap:4px;

  img{
    width: 16px;
    height: 16px;
  }

  span{
    font-size: 16px;
    color:#1E1E1E;
  }
`

const Title = styled.p`
  margin-top: 20px;
  font-size: 20px;
  font-family: 'Pretendard-Bold';
  line-height: 1.34;
  letter-spacing: -0.02em;
  color:#1E1E1E;
`

const Info = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;
  gap:8px;
  
  span{
    font-family: 'Pretendard-Light';
    color:#767676;
    font-size: 10px;
    line-height: 1.4;
  }
`


export default PostNavigation
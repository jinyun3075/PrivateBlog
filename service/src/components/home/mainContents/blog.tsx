import styled from "styled-components"

interface BlogProps {
  category:string;
  title:string;
  desc:string;
  createdDate:string;
  author:string;
  viewer:number;
  imgSrc?:string;
  textWrapperWith:number;
}
const Blog = ({category,title,desc,createdDate,author,viewer,imgSrc,textWrapperWith}:BlogProps) => {
  return(
    <Container>
      <TextWrapper $textWrapperWith={textWrapperWith}>
        <Category>{category}</Category>
        <Title>{title}</Title>
        <Desc>{desc}</Desc>
        <Etc>
          <span>{createdDate}</span>
          <span>|</span>
          <span>{author}</span>
          <span>|</span>
          <ViewWrapper>
            <ViewIcon src="/img/icon_view.png"/>
            <span>{viewer}</span>
          </ViewWrapper>
        </Etc>
      </TextWrapper>

      <Thumbnail src={`/img/${imgSrc}`}/>
    </Container>
  )
}



const Container = styled.div`
  width: 100%;
  height: 150px;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
`

const TextWrapper = styled.div<{$textWrapperWith:number}>`
  width: ${props=>props.$textWrapperWith}px;
  padding:11.5px 0;
`

const Category = styled.p`
	font-family: 'Pretendard-SemiBold';
  font-size: 12px;
  color:#1E1E1E;
`

const Title = styled.p`
  margin-top: 8px;
  font-family: 'Pretendard-Bold';
  font-size: 20px;
  letter-spacing: 1.4;
  line-height: -0.02em;
  color:#1E1E1E;
  
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
`
const Desc = styled.p`
  margin-top: 8px;
  font-family: 'Pretendard-Regular';
  font-size: 12px;
  letter-spacing: 0;
  line-height: 1.6;
  color:#767676;
  
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`
const Etc = styled.div`
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

const Thumbnail = styled.img`
  width: 150px;
  height: 100%;
  font-size: 10px;
  color:#767676;
`

const ViewWrapper = styled.div`
  display: flex;
  align-items: center;
  gap:4px;
`

const ViewIcon = styled.img`
  width:10px;
  height:10px;
`
export default Blog 
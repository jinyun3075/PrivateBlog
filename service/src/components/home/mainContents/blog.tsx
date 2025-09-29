import styled from "styled-components"
import { formatDate } from "../../../common/date"
import { useEffect } from "react";

interface BlogProps {
  category:string;
  title:string;
  desc:string;
  createdDate:string;
  author:string;
  viewer:number;
  imgSrc?:string;
  textWrapperWith:number;
  searchKeyword?:string;
  thumbnailNumber?:number;
}
const Blog = ({category,title,desc,createdDate,author,viewer,imgSrc,textWrapperWith,searchKeyword,thumbnailNumber}:BlogProps) => {
  
  // 검색 키워드 하이라이트 함수
  const highlightText = (title: string, searchKeyword?: string) => {
    if (!searchKeyword) return title;
    
    const regex = new RegExp(`(${searchKeyword})`, 'gi');
    const parts = title.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <HighlightedText key={index}>{part}</HighlightedText>
      ) : part
    );
  };

  // highlightText("React is reactive", "react") 를 넣으면 결과 아래와 같이.
  // [
  //   "",
  //   <HighlightedText key={1}>React</HighlightedText>,
  //   " is ",
  //   <HighlightedText key={3}>react</HighlightedText>,
  //   "ive"
  // ]
  

  return(
    <Container>
      <TextWrapper $textWrapperWith={textWrapperWith}>
        <Category>{category}</Category>
        <Title>{highlightText(title, searchKeyword)}</Title>
        <Desc>{highlightText(desc, searchKeyword)}</Desc>
        <Etc>
          <span>{formatDate(createdDate)}</span>
          <span>|</span>
          <span>{author}</span>
          <span>|</span>
          <ViewWrapper>
            <ViewIcon src="/img/icon_view.png"/>
            <span>{viewer}</span>
          </ViewWrapper>
        </Etc>
      </TextWrapper>

      <ThumbnailContainer>
        <Thumbnail src={ imgSrc || (thumbnailNumber ? `/img/defaultThumbnail/defaultThumbnail_square${thumbnailNumber}.png` : '/img/defaultThumbnail/defaultThumbnail_square1.png') } />
      </ThumbnailContainer>
    </Container>
  )
}


const ThumbnailContainer = styled.div`
  width: 150px;
  height: 100%;
  overflow: hidden;
`

const Thumbnail = styled.img`
  width: 100%;
  height: 100%;
  font-size: 10px;
  color:#767676;
  transition: transform 0.3s ease;
  object-fit: cover;
  transform-origin: center;
`

const Container = styled.div`
  width: 100%;
  height: 150px;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  
  &:hover {
    ${Thumbnail} {
      transform: scale(1.1);
    }
  }
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
  min-height: 40px;
  
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


const ViewWrapper = styled.div`
  display: flex;
  align-items: center;
  gap:4px;
`

const ViewIcon = styled.img`
  width:10px;
  height:10px;
`

const HighlightedText = styled.span`
  color: #9747FF;
  font-weight: bold;
`

export default Blog 
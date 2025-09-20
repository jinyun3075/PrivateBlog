import styled from "styled-components"
import { formatDate } from "../../../common/date"
import { useMemo } from "react";

type HeadlineItemProps = {
  thumbnail: string;
  category: string;
  title: string;
  desc: string;
  createdDate: string;
  author: string;
}

const HeadlineItem = ({ thumbnail, category, title, desc, createdDate, author }: HeadlineItemProps) => {
  


  const thumbnailSrc = useMemo(()=>thumbnail ? `/${thumbnail}`:"/img/defaultThumbnail/defaultThumbnail.png",[thumbnail]);
  
  return(
    <Container>
      <Thumbnail src={thumbnailSrc} />
      <Category>{category}</Category>
      <Title>{title}</Title>
      <Desc>{desc}</Desc>
      <Etc> {formatDate(createdDate)} | {author}</Etc>
    </Container>
  )
}



const Container = styled.div`
  cursor: pointer;
`

const Thumbnail = styled.img`
  width: 100%;
  height:373px;
  font-family: "Pretendard";
`

const Category = styled.p`
  margin-top: 30px;

  font-family: 'Pretendard-Regular';
  font-size: 16px;
  color:#767676;
`

const Title = styled.p`
  margin-top: 10px;

  min-height:78px;

	font-family: 'Pretendard-Bold';
  font-size: 28px;
  letter-spacing: -0.024em;
  line-height: 1.4;
  color:#1E1E1E;
  
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`
const Desc = styled.p`
  margin-top: 10px;

  min-height:52px;

  font-family: 'Pretendard-Regular';
  font-size: 16px;
  letter-spacing: 0;
  line-height: 1.6;
  color:#767676;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`
const Etc = styled.p`
  margin-top: 20px;
  
	font-family: 'Pretendard-Light';
  font-size: 13px;
  color:#767676;
`
export default HeadlineItem
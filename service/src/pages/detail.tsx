import styled from "styled-components";
import { MainArea } from "../common/style";
import { useParams } from "react-router-dom";
import PostNavigation from "../components/postNavigation/postNavigation";
import { PostType } from "../common/type";
import { useMemo } from "react";
import { usePosts } from "../hooks/usePosts";
import { formatDate } from "../common/date";

const Detail = () => {

  const {id:blogId} = useParams();
  const { data: posts = [] } = usePosts();
  const post = useMemo(() => posts.find((item:PostType) => item.post_id === Number(blogId)), [posts, blogId]);

  if(!post) return null
  return (
    <Container>
      <MainArea>
        <Thumbnail src = {`/img/${post?.thumbnail}`}/>
        <Category>{post.category.name}</Category>
        <Title>{post.title}</Title>
        <Etc>
          <span>{formatDate(post.regDate)}</span>
          <span>|</span>
          <span>{post.reg_user}</span>
          <span>|</span>
          <ViewWrapper>
            <ViewIcon src="/img/icon_view.png"/>
            <span>{post.postView.view}</span>
          </ViewWrapper>
        </Etc>     

        <Desc>{post.content.content}</Desc>



        <PostNavigationWrapper>
          <PostNavigation 
            imgSrc="icon_arrowLeft.png" 
            postDirection="이전글" 
            title="어쩌구 저쩌구" 
            createdDate="2025.08.31" 
            author="최성실" />

          <PostNavigation 
            imgSrc="icon_arrowRight.png" 
            postDirection="다음글" 
            title="어쩌구 저쩌구" 
            createdDate="2025.08.31" 
            author="최성실" />
        </PostNavigationWrapper>


      </MainArea>
    </Container>
  );
};



const Container = styled.div`
  width: 100%;
`


const Thumbnail = styled.img`
  margin-top: 80px;
  width: 100%;
  height: 580px;
  border-radius: 16px;
  object-fit: cover;
  object-position: center;
`

const Category = styled.p`
  margin-top: 30px;
	font-family: 'Pretendard-SemiBold';
  font-size: 16px;
  color:#767676;
`

const Title = styled.p`
  margin-top: 10px;
  font-family: 'Pretendard-Bold';
  font-size: 28px;
  letter-spacing: 1.4;
  line-height: -0.02em;
  color:#1E1E1E;
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
    line-height: 1.6;
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

const Desc = styled.p`
  margin-top: 30px;
  font-size: 16px;
  letter-spacing: 0;
  line-height: 1.8;
  color:#1E1E1E;
`

const PostNavigationWrapper = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  gap:20px;
`

export default Detail;

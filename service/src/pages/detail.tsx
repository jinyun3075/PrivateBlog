import styled from "styled-components";
import { MainArea } from "../common/style";
import { useParams } from "react-router-dom";
import PostNavigation, { PostNavigationProps } from "../components/postNavigation/postNavigation";
import { PostType } from "../common/type";
import { useEffect, useMemo } from "react";
import { usePosts } from "../hooks/usePosts";
import { formatDate } from "../common/date";

const Detail = () => {

  const {id:blogId} = useParams();
  const { data: posts = [] } = usePosts();
  const post = useMemo(() => posts.find((item:PostType) => item.post_id === blogId), [posts, blogId]);
  console.log(posts);

  // 기본 썸네일 랜덤 선택 함수
  const getRandomThumbnail = () => {
    const randomNum = Math.floor(Math.random() * 7) + 1; // 1~7 사이의 랜덤 숫자
    return `defaultThumbnail/defaultThumbnail${randomNum}.png`;
  };

  // 이전글과 다음글 찾기
  const { prevPost, nextPost } = useMemo(() => {
    if (!post) return { prevPost: null, nextPost: null };
    
    // regDate 기준으로 정렬 (오래된순)
    const sortedPosts = [...posts].sort((a, b) => new Date(a.regDate).getTime() - new Date(b.regDate).getTime());
    const currentIndex = sortedPosts.findIndex(p => p.post_id === post.post_id);
    
    const prevPost = currentIndex > 0 ? sortedPosts[currentIndex - 1] : null;
    const nextPost = currentIndex < sortedPosts.length - 1 ? sortedPosts[currentIndex + 1] : null;
    
    return { prevPost, nextPost };
  }, [posts, post]);

  if(!post) return null; 
  
  return (
    <Container>
      <MainArea>
        <Thumbnail src = {`/img/${post?.thumbnail || getRandomThumbnail()}`}/>
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
          {prevPost && (
            <PostNavigation 
              imgSrc="icon_arrowLeft.png" 
              postDirection="이전글" 
              title={prevPost.title} 
              createdDate={formatDate(prevPost.regDate)} 
              author={prevPost.reg_user}
              postId={prevPost.post_id} />
          )}

          {nextPost && (
            <PostNavigation 
              imgSrc="icon_arrowRight.png" 
              postDirection="다음글" 
              title={nextPost.title} 
              createdDate={formatDate(nextPost.regDate)} 
              author={nextPost.reg_user}
              postId={nextPost.post_id} />
          )}
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

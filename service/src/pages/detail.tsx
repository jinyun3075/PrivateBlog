import styled from "styled-components";
import { MainArea } from "../common/style";
import { useParams } from "react-router-dom";
import PostNavigation, { PostNavigationProps } from "../components/postNavigation/postNavigation";
import { PostType } from "../common/type";
import { useEffect, useMemo } from "react";
import { usePosts } from "../hooks/usePosts";
import { formatDate } from "../common/date";
import MDEditor from '@uiw/react-md-editor';

const Detail = () => {

  const {id:blogId} = useParams();
  const { data: posts = [] } = usePosts();
  const post = useMemo(() => posts.find((item:PostType) => item.post_id === blogId), [posts, blogId]);
  console.log(post);

  // 기본 썸네일 랜덤 선택 함수
  const getRandomThumbnail = () => {
    const randomNum = Math.floor(Math.random() * 7) + 1; // 1~7 사이의 랜덤 숫자
    return `/img/defaultThumbnail/defaultThumbnail${randomNum}.png`;
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
  const encodedContent = post.content.content.replace(
    /\]\((.*?)\)/g,
    (match, url) => {
      const parts = url.split('/');
      const filename = parts.pop();
      const encodedFilename = encodeURIComponent(filename);
      const encodedUrl = [...parts, encodedFilename].join('/');
      return `](${encodedUrl})`;
    }
  );
  return (
    <Container>
      <MainArea>
        <Thumbnail src={ post.thumbnail ? `/${post.thumbnail}` :  getRandomThumbnail() } />
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

        <Desc>
          <MDEditor.Markdown source={post.content.content} />
        </Desc>



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

const Desc = styled.div`
  margin-top: 30px;
  font-size: 16px;
  letter-spacing: 0;
  line-height: 1.8;
  color: #1E1E1E;
  
  /* 마크다운 스타일 커스터마이징 */
  .w-md-editor-text-pre {
    font-family: 'Pretendard-Regular', sans-serif;
  }
  
  .w-md-editor-text-pre h1,
  .w-md-editor-text-pre h2,
  .w-md-editor-text-pre h3,
  .w-md-editor-text-pre h4,
  .w-md-editor-text-pre h5,
  .w-md-editor-text-pre h6 {
    font-family: 'Pretendard-Bold', sans-serif;
    color: #1E1E1E;
    margin: 20px 0 10px 0;
  }
  
  .w-md-editor-text-pre p {
    font-family: 'Pretendard-Regular', sans-serif;
    color: #1E1E1E;
    margin: 10px 0;
  }
  
  .w-md-editor-text-pre code {
    background-color: #f5f5f5;
    padding: 2px 4px;
    border-radius: 3px;
    font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
    font-size: 14px;
  }
  
  .w-md-editor-text-pre pre {
    background-color: #f5f5f5;
    padding: 15px;
    border-radius: 5px;
    overflow-x: auto;
    margin: 15px 0;
  }
  
  .w-md-editor-text-pre blockquote {
    border-left: 4px solid #ddd;
    margin: 15px 0;
    padding-left: 15px;
    color: #666;
  }
  
  .w-md-editor-text-pre ul,
  .w-md-editor-text-pre ol {
    margin: 10px 0;
    padding-left: 20px;
  }
  
  .w-md-editor-text-pre li {
    margin: 5px 0;
  }
  
  .w-md-editor-text-pre a {
    color: #007bff;
    text-decoration: none;
  }
  
  .w-md-editor-text-pre a:hover {
    text-decoration: underline;
  }
  
  .w-md-editor-text-pre img {
    max-width: 100%;
    height: auto;
    border-radius: 5px;
    margin: 15px 0;
  }
  
  .w-md-editor-text-pre table {
    border-collapse: collapse;
    width: 100%;
    margin: 15px 0;
  }
  
  .w-md-editor-text-pre th,
  .w-md-editor-text-pre td {
    border: 1px solid #ddd;
    padding: 8px 12px;
    text-align: left;
  }
  
  .w-md-editor-text-pre th {
    background-color: #f5f5f5;
    font-weight: bold;
  }
`

const PostNavigationWrapper = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  gap:20px;
`

export default Detail;

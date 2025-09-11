import styled from "styled-components"
import HeadlineItem from "./headline"
import { usePosts } from "../../../hooks/usePosts"
import { Link } from "react-router-dom"
import { PostType } from "../../../common/type"

const HeadlineList = () => {

  const { data: posts = [], isError } = usePosts();

  // main_sort가 1, 2, 3인 항목들을 필터링하여 상위 3개 노출
  const headline = posts
    .filter((post: PostType) => post.main_sort && post.main_sort >= 1 && post.main_sort <= 3)
    .sort((a: PostType, b: PostType) => (a.main_sort || 0) - (b.main_sort || 0))
    .slice(0, 3);

  const getRandomHeadline = () => {
    const randomNum = Math.floor(Math.random() * 2) + 1; // 1~7 사이의 랜덤 숫자
    return `defaultHeadline/defaultHeadline${randomNum}.png`;
  };

  return(
    <Container>
      { 
        (headline.length>0 ||isError) ? headline.map((post: PostType) => (
          <HeadlineCardLink to={`/detail/${post.post_id}`} key={post.post_id}>
            <HeadlineItem 
              thumbnail={`/img/${post.thumbnail}`}
              category={post.category.name}
              title={post.title}
              desc={post.content.content}
              createdDate={post.regDate}
              author={post.reg_user}
            />
          </HeadlineCardLink>)):
        <DefaultHeadline src={`/img/${getRandomHeadline()}`} />
      }
    </Container>
  )
}




const Container = styled.section`
  margin-top: 80px;
  width: 100%;
  display: flex;
  gap:40px;
`

const HeadlineCardLink = styled(Link)`
  flex: 1;
  display: block;
  min-width: 0;
`

const DefaultHeadline = styled.img`
  width: 100%;
  height: 250px;
  cursor:pointer;
`

export default HeadlineList
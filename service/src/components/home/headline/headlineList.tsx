import styled from "styled-components"
import HeadlineItem from "./headline"
import { usePosts } from "../../../hooks/usePosts"
import { Link } from "react-router-dom"
import { PostType } from "../../../common/type"

const HeadlineList = () => {

  const { data: posts = [] } = usePosts();

  // 상위 3개 노출 (정렬 기준 필요 시 수정)
  const headline = posts.slice(0, 3);

  return(
    <Container>
      {headline.map((post: PostType) => (
        <HeadlineCardLink to={`/detail/${post.post_id}`} key={post.post_id}>
          <HeadlineItem 
            thumbnail={`/img/${post.thumbnail}`}
            category={post.category.name}
            title={post.title}
            desc={post.content.content}
            createdDate={post.regDate}
            author={post.reg_user}
          />
        </HeadlineCardLink>
      ))}
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

export default HeadlineList
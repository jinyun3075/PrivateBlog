import styled from "styled-components"
import HeadlineItem from "./headline"
import { usePosts } from "../../../hooks/usePosts"
import { Link } from "react-router-dom"
import { PostType } from "../../../common/type"

const HeadlineList = () => {

  const { data: posts = [], isError } = usePosts();

  // main_sort가 1, 2, 3인 항목들을 필터링
  const headlineList = posts.filter((post: PostType) => post.main_sort && post.main_sort >= 1 && post.main_sort <= 3);
  
  // main_sort가 1, 2, 3인 항목이 모두 있는지 확인
  const hasAllMainSorts = headlineList.length === 3 && 
    [1, 2, 3].every(sort => headlineList.some(post => post.main_sort === sort));
  
  // 모든 main_sort가 있을 때만 정렬하여 상위 3개 노출
  const headline = hasAllMainSorts 
    ? headlineList
        .sort((a: PostType, b: PostType) => (a.main_sort || 0) - (b.main_sort || 0))
        .slice(0, 3)
    : [];


  const getRandomHeadline = () => {
    const randomNum = Math.floor(Math.random() * 2) + 1; // 1 또는 2
    const image = `defaultHeadline${randomNum}`;
    const pdf = randomNum === 1 ? "jyj_portfolio.pdf" : "jsc_portfolio.pdf";
    return { image, pdf };
  };

  const randomHeadline = getRandomHeadline();

  return(
    <Container>
      { 
        (hasAllMainSorts && !isError) ? headline.map((post: PostType) => (
          <HeadlineCardLink to={`/detail/${post.post_id}`} key={post.post_id}>
            <HeadlineItem 
              thumbnail={post.thumbnail}
              category={post.category.name}
              title={post.title}
              desc={post.content.content}
              createdDate={post.regDate}
              author={post.reg_user}
            />
          </HeadlineCardLink>)):
            <a href={`/pdf/${randomHeadline.pdf}`} target="_blank" rel="noopener noreferrer">
              <DefaultHeadline src={`/img/defaultHeadline/${randomHeadline.image}.png`} alt="default headline" />
            </a>
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
  max-width: 373px;
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
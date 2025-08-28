import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import styled from "styled-components"
import Category from "./category";
import Blog from "./blog";
import axios from 'axios';
import usePagination from "../../../hooks/usePagination";
import BestBlog from "./bestBlog";

const categories = ["전체","개발","데이터/ML","프로덕트","해커톤","박람회"];

type Post = {
  title: string;
};

const MainContents = () => {
  
  const searchKeyword = useOutletContext()
  const [currentCategory,setCurrentCategory] = useState("전체");
  
  const [data,setData] = useState<Post[]>([]);
  const [loading,setLoading] = useState(false);
  const {currentPage,totalPages,currentPosts,goToPage} = usePagination(data, 10)


  
  const getData = async() => {
    setLoading(true);
    const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
    setData(res.data);
    setLoading(false);
  }
  
  useEffect(()=>{
    

  },[searchKeyword,currentCategory])  
  
  useEffect(()=>{
    getData();
  },[])

  return(
    <Container>

      <BlogListWrapper>
        <CategoryWrapper>
          {categories.map(category => 
            <Category 
              key = {category}
              category={category} 
              currentCategory = {currentCategory}
              setCurrentCategory={setCurrentCategory}
            />)}     
        </CategoryWrapper>

        <BlogList>
          {currentPosts.map(post => <Blog key={post.title} title = {post.title}/>)}
        </BlogList>

        <PaginationWrapper>
          {Array.from({ length: totalPages }, (_, idx) => (
            <PageButton $currentPage = {currentPage==idx+1} key={idx + 1} onClick={() => goToPage(idx + 1)}>
              {idx + 1}
            </PageButton>
          ))}
        </PaginationWrapper>

      </BlogListWrapper>
      
      <BestBlogArea>
        <BestBlogHeader>
          <img src="/img/icon_fire.png" />
          <p>인기 게시글 <span>TOP 5</span></p>
        </BestBlogHeader>
        <BestBlog />
        <BestBlog />
        <BestBlog />
        <BestBlog />
        <BestBlog />
      </BestBlogArea>
      
    </Container>
  )
}


const Container = styled.section`
  width: 100%;
  margin-top:80px;
  display: flex;
  justify-content: space-between;
  gap:70px;
`

const CategoryWrapper = styled.div`
  display: flex;
  width: 810px;
`

const BlogListWrapper = styled.div`
  width: 810px;

`
const BlogList = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  width: 100%;
  gap:30px;
`


const PaginationWrapper = styled.div`
  margin:40px auto 0 auto;
  width: 100%;
  display: flex;
  justify-content: center;
  gap:6px;
`

const PageButton = styled.button<{$currentPage:boolean}>`
  width: 32px;
  height: 32px;
  font-size: 14px;
  background-color: ${props=>props.$currentPage ? `#1B7EFF` : `#FFFFFF`};
  color: ${props=>props.$currentPage ? `#FFFFFF` : `#1E1E1E`};
  border: 1px solid #E5E7EB;
  border-radius: 2px;
  cursor: pointer;
`

const BestBlogArea = styled.div`
  display: flex;
  flex-direction: column;
  gap:20px;

  width: 320px;
  padding:0 15px;
`


const BestBlogHeader = styled.header`
  display: flex;
  gap:5px;
  align-items: center;

  img{
    width: 16px;
    height: 16px;
  }

  p{
    font-size: 14px;
    letter-spacing: 0.014em;
    color:#1E1E1E;
  }

  span{
    font-size: 14px;
    letter-spacing: 0.014em;
    color:#1B7EFF;
  }

`

const BestBlogWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap:20px;
`

export default MainContents
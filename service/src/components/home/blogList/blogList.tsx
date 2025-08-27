import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import styled from "styled-components"
import Category from "./category";
import Blog from "./blog";
import axios from 'axios';
import usePagination from "../../../hooks/usePagination";
import BestBlog from "./bestBlog";

const categories = ["All","A","B","C"];

type Post = {
  title: string;
};

const BlogList = () => {
  
  const searchKeyword = useOutletContext()
  const [currentCategory,setCurrentCategory] = useState("All");
  
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

      <CategoryWrapper>
        {categories.map(category => 
          <Category 
            key = {category}
            category={category} 
            setCurrentCategory={setCurrentCategory}
          />)}     
      </CategoryWrapper>

      <MainArea>
        <BlogListWrapper>

          {currentPosts.map(post => <Blog title = {post.title}/>)}

          <PaginationWrapper>
            {Array.from({ length: totalPages }, (_, idx) => (
              <PageButton currentPage = {idx+1} key={idx + 1} onClick={() => goToPage(idx + 1)}>
                {idx + 1}
              </PageButton>
            ))}
          </PaginationWrapper>
        </BlogListWrapper>
        
        <BestBlogWrapper>
          <BestBlog />
          <BestBlog />
          <BestBlog />
          <BestBlog />
          <BestBlog />
        </BestBlogWrapper>
        
      </MainArea>
      
    </Container>
  )
}


const Container = styled.section`
  width: 100%;
`

const CategoryWrapper = styled.div`
  display: flex;
  width: 100%;
  gap:30px;
`


const MainArea = styled.section`
  width:100%;
  display: flex;
  justify-content: space-between;
  gap:20px;
`

const BlogListWrapper = styled.div`
  width: 80%;
  height:auto;
  background-color: transparent;
`

const BestBlogWrapper = styled.div`
  width: 20%;
  background-color: transparent;
`

const PaginationWrapper = styled.div`
  width: 100%;
`

const PageButton = styled.button<{$currentPage:boolean}>`
  margin-right: 5px;
  padding: 5px 10px;
  background-color: ${props=>props.$currentPage ? "#4caf50" : "#e0e0e0"};
  color: ${props=>props.$currentPage ? "#fff" : "#000"};
  border: "none";
  border-radius: "4px";
  cursor: "pointer";
`



export default BlogList
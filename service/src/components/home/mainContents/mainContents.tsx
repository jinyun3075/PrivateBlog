import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import styled from "styled-components"
import Category from "./category";
import Blog from "./blog";
import axios from 'axios';
import usePagination from "../../../hooks/usePagination";
import BestBlog from "./bestBlog";
import { DummyData, DummyDataType } from "../../../mockData/blogDummy";
import Pagination from "../../pagination/pagination";

const categories = ["전체","개발","데이터/ML","프로덕트","해커톤","박람회"];


const MainContents = () => {

  const [currentCategory,setCurrentCategory] = useState("전체");
  const [data,setData] = useState<DummyDataType[]>(DummyData);
  const [loading,setLoading] = useState(false);
  const {currentPage,totalPages,currentPosts,goToPage} = usePagination(data, 10)
  
  // const getData = async() => {
  //   setLoading(true);
  //   const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
  //   setData(res.data);
  //   setLoading(false);
  // }
  
  // useEffect(()=>{
  //   getData();
  // },[])


  useEffect(() => {
    let filteredData: DummyDataType[] = DummyData;
    if (currentCategory !== "전체") {
      filteredData = filteredData.filter((post) => post.category === currentCategory);
    }
    setData(filteredData);

  }, [currentCategory]); 
  

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
          {currentPosts.map((post:DummyDataType) => <Blog 
            key={post.id} 
            category={post.category}
            title = {post.title}
            desc = {post.desc}
            createdDate = {post.createdDate}
            author = {post.author}
            viewer = {post.viewer}
          />)}
        </BlogList>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={goToPage}
          noData={data.length === 0}
        />

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
    font-family: 'Pretendard-SemiBold';
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

export default MainContents
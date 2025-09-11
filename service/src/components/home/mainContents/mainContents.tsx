import { useEffect, useMemo, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import styled from "styled-components"
import Category from "./category";
import Blog from "./blog";
import axios from 'axios';
import usePagination from "../../../hooks/usePagination";
import BestBlog from "./bestBlog";
import Pagination from "../../pagination/pagination";
import { CategoryType, PostType } from "../../../common/type";
import { usePosts } from "../../../hooks/usePosts";

const MainContents = () => {

  const [currentCategory,setCurrentCategory] = useState<string>("전체");
  const [category,setCategory] = useState<CategoryType[]>([]);
  const [loading,setLoading] = useState<boolean>(false);
  const { data = [], isError } = usePosts();
  
  const getCategory = async() => {
    setLoading(true);
    try{
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_HOST}/api/client/category/select/all`);
      console.log(res.data);
      setCategory([{ category_id: 0, name: "전체" } as CategoryType, ...res.data]);
    }catch(e){
      console.log(e);
    }finally{
      setLoading(false);
    }
  }

  
  const filteredData = useMemo<PostType[]>(
    () => currentCategory === "전체"
      ? data
      : data.filter((post: PostType) => post.category.name === currentCategory),
    [currentCategory, data]
  );

  const {currentPage,totalPages,currentPosts,goToPage} = usePagination(filteredData, 10)

  const getTopPosts = () => {
    return [...data]
      .sort((a: PostType, b: PostType) => (b.postView?.view ?? 0) - (a.postView?.view ?? 0))
      .slice(0, 5);
  };

  useEffect(()=>{
    getCategory();
  },[])

  return(
    <Container>

      <BlogListWrapper>
        <CategoryWrapper>
          {category.map((category: CategoryType) => 
            <Category 
              key = {category.category_id}
              category={category.name} 
              currentCategory = {currentCategory}
              setCurrentCategory={setCurrentCategory}
            />)}     
        </CategoryWrapper>

        <BlogList>
          {(currentPosts.length>0 ||isError) ? currentPosts.map((post:PostType) => 
            <Link to ={`/detail/${post.post_id}`} key={post.post_id} >
              <Blog 
                category={post.category.name}
                title = {post.title}
                desc = {post.content.content}
                createdDate = {post.regDate}
                author = {post.reg_user}
                viewer = {post.postView.view}
                imgSrc = {post.thumbnail}
                textWrapperWith={600}
              />
            </Link>):
            <NotExistBlog>게시글이 존재하지 않습니다다</NotExistBlog>
          }
        </BlogList>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={goToPage}
          noData={filteredData.length === 0 || isError}
        />

      </BlogListWrapper>
      
      <BestBlogArea>
        <BestBlogHeader>
          <img src="/img/icon_fire.png" />
          <p>인기 게시글 <span>TOP 5</span></p>
        </BestBlogHeader>
        
        {(currentPosts.length>0 ||isError) ? 
          getTopPosts().map((post: PostType, idx: number) => (
            <BestBlog 
              key={post.post_id}
              ranking={idx + 1}
              title={post.title}
              author={post.reg_user}
            />)):
          <NotExistBestBlog>인기글이 존재하지 않습니다.</NotExistBestBlog>
        }
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


const NotExistBlog = styled.div`
  width: 100%;
  height: 236px;

  display: flex;
  justify-content: center;
  align-items: center;

  font-family: 'Pretendard-SemiBold';
  font-size: 14px;
  letter-spacing: -0.024em;
  color:#A1A1A1;
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
    color:#9747FF;
  }

`

const NotExistBestBlog = styled.div`
  width: 100%;

  font-family: 'Pretendard-Regular';
  font-size: 14px;
  letter-spacing: -0.02em;
  color:#A1A1A1;
`

export default MainContents
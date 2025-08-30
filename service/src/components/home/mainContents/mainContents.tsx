import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import styled from "styled-components"
import Category from "./category";
import Blog from "./blog";
import axios from 'axios';
import usePagination from "../../../hooks/usePagination";
import BestBlog from "./bestBlog";
import { DummyData, DummyDataType } from "../../../mockData/blogDummy";

const categories = ["전체","개발","데이터/ML","프로덕트","해커톤","박람회"];


const MainContents = () => {
  
  const searchKeyword = useOutletContext<string>()
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

    if (searchKeyword) {
      filteredData = filteredData.filter((post) =>
        post.title.includes(searchKeyword) || post.desc.includes(searchKeyword)
      );
    }

    setData(filteredData);

  }, [searchKeyword, currentCategory]); 
  

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


        {
          searchKeyword && 
          <>
            <SearchResult><span>`{searchKeyword}`</span>에 대한 검색 결과</SearchResult>
            <BlogCount>
              <Total>Total</Total>
              <Count>{data.length}</Count>
            </BlogCount>
          </>
        }

        {searchKeyword && !data.length ?
        <BlogNotExist>검색 결과가 존재하지 않습니다.</BlogNotExist>
        :<BlogList>
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
        }

        <PaginationWrapper>
          {
            searchKeyword && !data.length ?
            <PageButton $currentPage = {true}>1</PageButton>:
            Array.from({ length: totalPages }, (_, idx) => (
              <PageButton 
                $currentPage = {currentPage==idx+1} 
                key={idx + 1} 
                onClick={() => goToPage(idx + 1)}>{idx + 1}</PageButton>
            ))
          }
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

const SearchResult = styled.div`
  width: 100%;
  padding:80px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Pretendard-Bold';
  font-size: 28px;
  line-height: 1.36;
  letter-spacing: -0.024em;
  color:#767676;
  span{
    color:#1B7EFF;
  }

`
const BlogCount = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap:5px;
  padding:10px 0;
  margin-bottom:40px;
`

const Total = styled.span`
	font-family: 'Pretendard-Regular';
  font-size: 16px;
  color:#767676;
`

const Count = styled.span`
	font-family: 'Pretendard-Bold';
  font-size: 18px;
  color:#1E1E1E;
`
const BlogNotExist = styled.div`
  width: 100%;
  height: 358px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-family: 'Pretendard-SemiBold';
  color:#767676;
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
	font-family: 'Pretendard-Regular';
  font-size: 14px;
  background-color: ${props=>props.$currentPage ? `#1B7EFF` : `#FFFFFF`};
  color: ${props=>props.$currentPage ? `#FFFFFF` : `#1E1E1E`};
  border: ${props=>props.$currentPage ? `none`:`1px solid #E5E7EB`};
  border-radius: 2px;
  cursor: pointer;

  &:hover{
    background-color: #1B7EFF;
    opacity:0.3;
    color:#FFFFFF;
  }

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

const BestBlogWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap:20px;
`

export default MainContents
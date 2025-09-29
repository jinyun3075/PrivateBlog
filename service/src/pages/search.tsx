import styled from "styled-components"
import { MainArea } from "../common/style"
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import usePagination from "../hooks/usePagination";
import Blog from "../components/home/mainContents/blog";
import Pagination from "../components/pagination/pagination";
import { usePosts } from "../hooks/usePosts";
import { PostType } from "../common/type";

const Search = () => {
  const { data = [] } = usePosts();
  const [loading,setLoading] = useState(false);
  const [filteredData, setFilteredData] = useState(data);

  const [searchParams] = useSearchParams();
  const searchKeyword = searchParams.get("keyword") || "";

  const {currentPage,totalPages,currentPosts,goToPage} = usePagination(filteredData, 10);

  useEffect(() => {
    if (!searchKeyword) {
      setFilteredData(data);
      return;
    }

    const filtered = data.filter(post =>
      post.title.includes(searchKeyword) || post.content.content.includes(searchKeyword)
    );

    setFilteredData(filtered);
  }, [searchKeyword, data]); 


  return(
    <Container>
      <MainArea>
        <SearchResult><span>`{searchKeyword}`</span>에 대한 검색 결과</SearchResult>

        <BlogCount>
          <Total>Total</Total>
          <Count>{filteredData.length}</Count>
        </BlogCount>

        {filteredData.length ?
          <BlogList>
            {currentPosts.map((post:PostType) => 
              <Link to ={`/detail/${post.post_id}`}>
                <Blog 
                  key={post.post_id} 
                  category={post.category.name}
                  title = {post.title}
                  desc = {post.content.content }
                  createdDate = {post.regDate}
                  author = {post.reg_user}
                  viewer = {post.postView?.view}
                  imgSrc = {post.thumbnail}
                  textWrapperWith={990}
                  searchKeyword={searchKeyword}
                />
              </Link>)}
          </BlogList>:
          <NoDataContainer>
            <BlogNotExist>검색 결과가 존재하지 않습니다.</BlogNotExist>
            <Pagination
              currentPage={1}
              totalPages={1}
              onPageChange={() => {}}
              noData={true}
            />
          </NoDataContainer>
        }

        {filteredData.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={goToPage}
            noData={false}
          />
        )}

      </MainArea>
    </Container>
  )
}


const Container = styled.div`
  width: 100%;
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
    color:#9747FF;
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

const NoDataContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
`

export default Search 
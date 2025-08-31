import styled from "styled-components"
import { MainArea } from "../common/style"
import { useEffect, useState } from "react";
import { DummyData, DummyDataType } from "../mockData/blogDummy";
import { useSearchParams } from "react-router-dom";
import usePagination from "../hooks/usePagination";
import Blog from "../components/home/mainContents/blog";
import Pagination from "../components/pagination/pagination";

const Search = () => {
  const [data,setData] = useState<DummyDataType[]>(DummyData);
  const [loading,setLoading] = useState(false);

  const [searchParams] = useSearchParams();
  const searchKeyword = searchParams.get("keyword") || "";

  const {currentPage,totalPages,currentPosts,goToPage} = usePagination(data, 10);


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

    let filteredData = DummyData;

    filteredData = filteredData.filter(post =>
      post.title.includes(searchKeyword) || post.desc.includes(searchKeyword)
    );

    setData(filteredData);
  }, [searchKeyword]); 


  return(
    <Container>
      <MainArea>
        <SearchResult><span>`{searchKeyword}`</span>에 대한 검색 결과</SearchResult>

        <BlogCount>
          <Total>Total</Total>
          <Count>{data.length}</Count>
        </BlogCount>

        {data.length ?
          <BlogList>
            {currentPosts.map((post:DummyDataType) => 
              <Blog 
                key={post.id} 
                category={post.category}
                title = {post.title}
                desc = {post.desc}
                createdDate = {post.createdDate}
                author = {post.author}
                viewer = {post.viewer}
                imgSrc = {post.imgSrc}
                textWrapperWith={990}
              />)}
          </BlogList>:
          <BlogNotExist>검색 결과가 존재하지 않습니다.</BlogNotExist>
        }

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={goToPage}
          noData={data.length === 0}
        />

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

export default Search 
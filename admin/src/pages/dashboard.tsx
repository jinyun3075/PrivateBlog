import styled from "styled-components";
import Header from "../components/header/header";
import { colors } from "../common/designSystem";
import BestBlog from "../components/dashboard/bestBlog";
import { MainContents } from "../common/style";
import DashboardCard from "../components/dashboard/dashboardCard";
import axios from "axios";
import { useEffect, useState } from "react";
import { formatNumber } from "../utils/numberFormat";
import { calculateAllStats } from "../utils/stat";
import { usePosts } from "../hooks/usePosts";


interface ViewDataType {
  view_id: number;
  post_id: string;
  view: number
  regDate: string;
}

interface VisitDataType {
  visit_id: number,
  visit: number,
  regDate: string;
}

const Dashboard = () => {
  const [todayViews, setTodayViews] = useState<string>("0");
  const [totalViews, setTotalViews] = useState<string>("0");
  const [todayVisits, setTodayVisits] = useState<string>("0");
  const [totalVisits, setTotalVisits] = useState<string>("0");
  const [BackupPostCount, setBackupPostCount] = useState<number>(0);
  const [lastUpdated, setLastUpdated] = useState<string>("");

  const { data = [], refetch: refetchPosts } = usePosts();

  const formatCurrentTime = () => {
    const now = new Date();
    return `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, '0')}.${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} 기준`;
  };

  const getBestBlogs = () => {
    if (!data || data.length === 0) return [];
    
    return data
      .filter(post => post.postView && post.postView.view > 0)
      .sort((a, b) => (b.postView?.view || 0) - (a.postView?.view || 0))
      .slice(0, 5);
  };

  const getViewData = async () => {
    try {
      const { data } = await axios.get<ViewDataType[]>(
        `${process.env.REACT_APP_BACKEND_HOST}/api/admin/view/select/all`
      );
      return data;
    } catch (e) {
      console.log(e);
      return [];
    }
  };

  const getVisitData = async () => {
    try {
      const { data } = await axios.get<VisitDataType[]>(`${process.env.REACT_APP_BACKEND_HOST}/api/admin/viste/select/all`); 
      return data;
    } catch (e) {
      console.log(e);
      return [];
    }
  };

  const getBackupPost = async () => {
    try{
      const {data} = await axios.get(`${process.env.REACT_APP_BACKEND_HOST}/api/admin/post/select/tempList`);
      console.log(data);
      return data;
    }catch(e){
      console.log(e);
      return [];
    }
  }

  const fetchData = async () => {
    try {
      const [viewData, visitData, backupData] = await Promise.all([
        getViewData(),
        getVisitData(),
        getBackupPost(),
        refetchPosts()
      ]);
      
      const stats = calculateAllStats(viewData, visitData);
      
      setTodayViews(formatNumber(stats.todayViews));
      setTotalViews(formatNumber(stats.totalViews));
      setTodayVisits(formatNumber(stats.todayVisits));
      setTotalVisits(formatNumber(stats.totalVisits));
      setBackupPostCount(backupData.length);

      setLastUpdated(formatCurrentTime());
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return(
    <Container>
      <Header title = "대시보드" />

      <MainContents>
        <ViewArea>
          <ViewHeader>
            <ViewHeaderTitle>조회수/방문자수 현황황</ViewHeaderTitle>
            <TimeAndRefresh>
              <Time>{lastUpdated}</Time>
              <RefreshArea onClick={fetchData}>
                <RefreshTxt>새로고침</RefreshTxt>
                <RefreshImg src="/img/icon_refresh.png" alt="refresh"/>
              </RefreshArea>
            </TimeAndRefresh>
          </ViewHeader>
          
          <CardWrapper>
            <DashboardCard text={"오늘 조회수"} number={todayViews} />
            <DashboardCard text={"누적 조회수"} number={totalViews} />
            <DashboardCard text={"오늘 방문자"} number={todayVisits} />
            <DashboardCard text={"누적 방문자"} number={totalVisits} />
          </CardWrapper>
        </ViewArea>

        <PostArea>
          <PostHeader>게시물 현황</PostHeader>
          <CardWrapper>
            <DashboardCard text={"총 발행 게시글"} number={formatNumber(data.length)} />
            <DashboardCard text={"임시저장된 게시글글"} number={formatNumber(BackupPostCount)} />
          </CardWrapper>
        </PostArea>

        <BestArea>
          <BestAreaHeader>인기글</BestAreaHeader>
          <BestBlogWrapper>
            {getBestBlogs().map((post, index) => (
              <BestBlog 
                key={post.post_id}
                ranking={index + 1} 
                category={post.category?.name || "카테고리 없음"} 
                date={post.regDate ? new Date(post.regDate).toLocaleDateString('ko-KR').replace(/\./g, '.').replace(/\s/g, '') : "날짜 없음"} 
                author={post.reg_user || "작성자 없음"} 
                title={post.title || "제목 없음"}
              />
            ))}

            {/* {getBestBlogs().length === 0 && (
            <div>
              인기글이 없습니다 
            </div>)} */}


          </BestBlogWrapper>
        </BestArea>
      </MainContents>
    </Container>
  )
}

const Container = styled.div`
  width:100%;
`

const ViewArea = styled.div`
  width: 100%;
`

const ViewHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const ViewHeaderTitle = styled.h2`
  font-family: 'Pretendard-SemiBold';
  font-size: 18px;
  color:${colors.Black};
`

const TimeAndRefresh = styled.div`
  width: auto;
  display: flex;
  align-items: center;
  gap:16px;
`


const Time = styled.div`
  font-family: 'Pretendard-Regular';
  font-size: 14px;
  color:${colors.Black};

`

const RefreshArea = styled.div`
  display: flex;
  align-items: center;
  gap:4px;
  cursor: pointer;
`

const RefreshTxt = styled.div`
  font-family: 'Pretendard-Regular';
  font-size: 14px;
  color:${colors.Black};
`

const RefreshImg = styled.img`
  width: 16px;
  height: 16px;
`

const CardWrapper = styled.div`
  margin-top: 32px;
  display: flex;
  gap:20px;
  justify-content: space-between;
`

const PostArea = styled.div`
  width: 100%;
  margin-top: 50px;
`
const PostHeader = styled(ViewHeaderTitle)`
  padding:16.5px 0;
`

const BestArea = styled.div`
  min-height: 305px;
  margin-top: 32px;
  padding: 37px 32px;
  border: 1px solid ${colors.LightGray[300]};
  border-radius: 12px;
  margin-bottom: 63px;  
`

const BestAreaHeader = styled.div`
  font-family: 'Pretendard-SemiBold';
  font-size: 16px;
  color:${colors.Black};
`

const BestBlogWrapper = styled.div`
  margin-top: 16px;

  width: 100%;
  display: flex;
  flex-direction: column;
  gap:16px;
`



export default Dashboard;
import styled from "styled-components";
import Header from "../components/header/header";
import { colors } from "../common/designSystem";
import BestBlog from "../components/dashboard/bestBlog";
import { MainContents } from "../common/style";
import DashboardCard from "../components/dashboard/dashboardCard";
import axios from "axios";
import { useEffect, useState } from "react";
import { formatNumber } from "../utils/numberFormat";
import { calculateViewStats } from "../utils/stat";

interface ViewDataType {
  view_id:number;
  post_id:string;
  view:number;
}

interface VisitDataType {
  visite_id: number;
  visite: number;
  regDate: string;
}

const Dashboard = () => {
  const [todayViews, setTodayViews] = useState<string>("0");
  const [totalViews, setTotalViews] = useState<string>("0");
  const [todayVisits, setTodayVisits] = useState<string>("0");
  const [totalVisits, setTotalVisits] = useState<string>("0");
  const [PostCount, setPostCount] = useState<number>(0);
  const [BackupPostCount, setBackupPostCount] = useState<number>(0);

  const getViewStats = async () => {
    try {
      const { data } = await axios.get<ViewDataType[]>(
        `${process.env.REACT_APP_BACKEND_HOST}/api/admin/view/select/all`
      );
      console.log(data);
      const stats = calculateViewStats(
        data,
        item => "20" + item.post_id.slice(0, 6).replace(/(\d{2})(\d{2})(\d{2})/, "$1-$2-$3"),
        item => item.view
      );     
      setTodayViews(stats.todayTotal);
      setTotalViews(stats.allTotal);
      }catch (e) {
        console.log(e);
      }
    };

  const getVisitStats = async () => {
    try {
      const { data } = await axios.get<VisitDataType[]>(`${process.env.REACT_APP_BACKEND_HOST}/api/admin/visite/select/all`); 
      console.log('방문자 데이터:', data);
  
      const stats = calculateViewStats(
        data,
        item => item.regDate.slice(0, 10),
        item => item.visite
      );
  
      if (stats) {
        setTodayVisits(stats.todayTotal);
        setTotalVisits(stats.allTotal);
      }
    } catch (e) {
      console.log(e);
    }
  };


  // const getBackupPost = async () => {
  //   try{
  //     const {data} = await axios.get(`${process.env.REACT_APP_BACKEND_HOST}/api/admin/post/select/tempList`);
  //     console.log(data);
  //     setBackupPostCount(data.length);
  //   }catch(e){
  //     console.log(e);
  //   }
  // }


  useEffect(() => {
    getViewStats();
    getVisitStats();
    // getBackupPost()
  }, []);

  return(
    <Container>
      <Header title = "대시보드" />

      <MainContents>
        <ViewArea>
          <ViewHeader>
            <ViewHeaderTitle>조회수/방문자수 현황황</ViewHeaderTitle>
            <TimeAndRefresh>
              <Time>2025.08.25 23:11 기준</Time>
              <RefreshArea>
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
            <DashboardCard text={"총 발행 게시글"} number={formatNumber(PostCount)} />
            <DashboardCard text={"총 발행 게시글"} number={formatNumber(BackupPostCount)} />
          </CardWrapper>
        </PostArea>

        <BestArea>
          <BestAreaHeader>인기글</BestAreaHeader>
          <BestBlogWrapper>
            <BestBlog ranking={1} category="개발" date="2025.09.09" author="최성삼" title="React 훅 완벽 가이드: useState, useEffect 등 주요 훅 사용법 정리 들어갑니다."/>
            <BestBlog ranking={1} category="개발" date="2025.09.09" author="최성삼" title="React 훅 완벽 가이드: useState, useEffect 등 주요 훅 사용법 정리 들어갑니다."/>
            <BestBlog ranking={1} category="개발" date="2025.09.09" author="최성삼" title="React 훅 완벽 가이드: useState, useEffect 등 주요 훅 사용법 정리 들어갑니다."/>
            <BestBlog ranking={1} category="개발" date="2025.09.09" author="최성삼" title="React 훅 완벽 가이드: useState, useEffect 등 주요 훅 사용법 정리 들어갑니다."/>
            <BestBlog ranking={1} category="개발" date="2025.09.09" author="최성삼" title="React 훅 완벽 가이드: useState, useEffect 등 주요 훅 사용법 정리 들어갑니다."/>
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
  margin-top: 32px;
  padding: 37px 32px;
  border: 1px solid ${colors.LightGray[300]};
  border-radius: 12px;
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
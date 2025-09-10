import styled from "styled-components";
import Header from "../components/header/header";
import { colors } from "../common/designSystem";
import BestBlog from "../components/dashboard/bestBlog";
import { MainContents } from "../common/style";
import DashboardCard from "../components/dashboard/dashboardCard";


const Dashboard = () => {
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
            <DashboardCard text={"오늘 조회수"} number={1567} />
            <DashboardCard text={"오늘 조회수"} number={1567} />
            <DashboardCard text={"오늘 조회수"} number={1567} />
            <DashboardCard text={"오늘 조회수"} number={1567} />
          </CardWrapper>
        </ViewArea>

        <PostArea>
          <PostHeader>게시물 현황</PostHeader>
          <CardWrapper>
            <DashboardCard text={"총 발행 게시글"} number={2751} />
            <DashboardCard text={"총 발행 게시글"} number={2751} />
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
import styled from "styled-components"

interface BlogProps {
  title:string
}
const Blog = ({title}:BlogProps) => {
  return(
    <Container>
      <TextWrapper>
        <Category>개발</Category>
        <Title>Docker로 개발 환경 세팅하기</Title>
        <Desc>개발 환경을 표준화하는 것은 협업에서 매우 중요하다. Docker는 컨테이너 기반 가상화 기술을 통해, 동일한 환경을 누구나 손쉽게 재현할 수 있도록 도와준다. 이번 글에서는 Dockerfile과 docker-compose를 활용해 기본적인 개발 환경을 세팅하는 방법을 다룬다.</Desc>
        <Etc>
          <span>2025.08.30</span>
          <span>|</span>
          <span>최성오</span>
          <span>|</span>
          <ViewWrapper>
            <ViewIcon src="/img/icon_view.png"/>
            <span>2,340</span>
          </ViewWrapper>
        </Etc>
      </TextWrapper>

      <Thumbnail src="/img/docker.png"/>
    </Container>
  )
}



const Container = styled.div`
  width: 100%;
  height: 150px;
  display: flex;
  justify-content: space-between;
`

const TextWrapper = styled.div`
  width: 600px;
  padding:11.5px 0;
`

const Category = styled.p`
  font-size: 12px;
  color:#1E1E1E;
`
const Title = styled.p`
  margin-top: 8px;
  font-size: 20px;
  letter-spacing: 1.4;
  line-height: -0.02em;
  color:#1E1E1E;
  
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
`
const Desc = styled.p`
  margin-top: 8px;
  font-size: 12px;
  letter-spacing: 0;
  line-height: 1.6;
  color:#767676;
  
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`
const Etc = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;
  gap:8px;

  span{
    color:#767676;
    font-size: 10px;
    line-height: 1.4;
  }
`

const Thumbnail = styled.img`
  width: 150px;
  height: 100%;
  font-size: 10px;
  color:#767676;
`

const ViewWrapper = styled.div`
  display: flex;
  align-items: center;
  gap:4px;
`

const ViewIcon = styled.img`
  width:10px;
  height:10px;
`
export default Blog 
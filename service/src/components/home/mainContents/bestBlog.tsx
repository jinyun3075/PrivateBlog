import styled from "styled-components"

const BestBlog = () => {
  return(
    <Container>
      <Ranking>1</Ranking>
      <Info>
        <Title>React 훅 완벽 가이드: useState, useEffect 등 주요 훅 사용법 정리 들어갑니다.</Title>
        <Author>최성사</Author>
      </Info>
    </Container>
  )
}


const Container = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  gap:10px;
`

const Ranking = styled.span`
  font-size: 12px;
  line-height: 1.6;
  color:#282943;
`

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap:3px;
`

const Title = styled.p`
  font-size: 14px;
  letter-spacing: -0.02em;
  line-height: 1.6;
  color:#1E1E1E;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 275px;
`

const Author = styled.span`
  font-size: 9px;
  line-height: 1.6;
  color:#1E1E1E;
`

export default BestBlog
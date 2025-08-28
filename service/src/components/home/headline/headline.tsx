import styled from "styled-components"

const HeadlineItem = () => {
  return(
    <Container>
      <Thumbnail src="/img/headlineThumbnail.png"/>
      <Category>데이터/ML</Category>
      <Title>다양한 ML 모델을 만드는 법: FeatureKit</Title>
      <Desc>머신러닝 모델을 만들 때 가장 큰 고민은 ‘데이터 전처리’와 ‘특징 추출’이에요. FeatureKit은 이런 과정을 간단하게 도와줘요.</Desc>
      <Etc> 2025.08.28 | 최성삼</Etc>
    </Container>
  )
}



const Container = styled.div`
  flex:1;
`

const Thumbnail = styled.img`
  width: 100%;
  height:373px;
  font-family: "Pretendard";
`

const Category = styled.p`
  margin-top: 30px;

  font-size: 16px;
  color:#767676;
`

const Title = styled.p`
  margin-top: 10px;

  font-size: 28px;
  letter-spacing: -0.024em;
  line-height: 1.4;
  color:#1E1E1E;
`
const Desc = styled.p`
  margin-top: 10px;

  font-size: 16px;
  letter-spacing: 0;
  line-height: 1.6;
  color:#767676;
`
const Etc = styled.p`
  margin-top: 20px;

  font-size: 13px;
  color:#767676;
`
export default HeadlineItem
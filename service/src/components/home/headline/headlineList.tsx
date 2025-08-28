import styled from "styled-components"
import HeadlineItem from "./headline"

const HeadlineList = () => {

  return(
    <Container>
      <HeadlineItem />
      <HeadlineItem />
      <HeadlineItem />
    </Container>
  )
}




const Container = styled.section`
  margin-top: 80px;
  width: 100%;
  display: flex;
  gap:40px;
`

export default HeadlineList
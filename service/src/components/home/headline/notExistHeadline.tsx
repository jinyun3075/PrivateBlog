import styled from "styled-components"

const NotExistHeadline = () => {
  return(
    <Container>
      <NotExistImg src="/img/headline_basic.png"/>
    </Container>
  )
}

const Container = styled.section`
  margin-top: 80px;
  width: 100%;
`

const NotExistImg = styled.img`
  width: 100%;
  height:250px;
`

export default NotExistHeadline
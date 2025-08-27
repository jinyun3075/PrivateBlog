import styled from "styled-components"

interface BlogProps {
  title:string
}
const Blog = ({title}:BlogProps) => {
  return(
    <Container>
      <li>
        <h4>{title}</h4>
      </li>
    </Container>
  )
}



const Container = styled.div`

`


export default Blog 
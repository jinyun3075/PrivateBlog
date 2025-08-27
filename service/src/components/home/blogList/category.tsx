import styled from "styled-components"


interface CategoryProps {
  category:string;
  setCurrentCategory:(value:string)=>void;
}
const Category = ({category,setCurrentCategory}:CategoryProps) => {
  
  const onChangeCategory = ()=> setCurrentCategory(category)
  return(
    <Container onClick = {onChangeCategory}>
      {category}
    </Container>
  )
}


const Container = styled.div`
  border: 1px solid black;
  padding:10px;
  cursor: pointer;
`

export default Category
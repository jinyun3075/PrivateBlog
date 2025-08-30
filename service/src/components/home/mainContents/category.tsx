import styled from "styled-components"


interface CategoryProps {
  category:string;
  currentCategory:string;
  setCurrentCategory:(value:string)=>void;
}
const Category = ({category,currentCategory,setCurrentCategory}:CategoryProps) => {
  
  const onChangeCategory = ()=> setCurrentCategory(category)
  return(
    <Container onClick = {onChangeCategory} $currentCategory = {currentCategory==category}>
      {category}
    </Container>
  )
}


const Container = styled.div<{$currentCategory:boolean}>`
  width: 135px;
  height: 45px;
  cursor: pointer;
  text-align: center;
  padding:10px 0;
  font-family: ${props=>props.$currentCategory ? `'Pretendard-SemiBold'`:`'Pretendard-Regular'`};
  font-size:18px;
  color:${props=>props.$currentCategory ? `#1B7EFF`:`#1E1E1E`};
  border-bottom:${props=>props.$currentCategory ? `2px solid #1B7EFF`:'1px solid #F3F3F3'};

  &:hover{
    color:#1B7EFF;
  	font-family: 'Pretendard-SemiBold';
    opacity:0.3;
  }
`

export default Category
import { useState } from "react";
import styled from "styled-components"


interface CategoryProps {
  category:string;
  currentCategory:string;
  setCurrentCategory:(value:string)=>void;
}
const Category = ({category,currentCategory,setCurrentCategory}:CategoryProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const onChangeCategory = () => {
    setCurrentCategory(category);
    setIsHovered(false); 
  }
  
  return(
    <Container 
      onClick = {onChangeCategory} 
      $currentCategory = {currentCategory==category}
      $isHovered={isHovered}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {category}
    </Container>
  )
}


const Container = styled.div<{$currentCategory:boolean; $isHovered:boolean}>`
  width: 135px;
  height: 45px;
  cursor: pointer;
  text-align: center;
  padding:10px 0;
  font-family: ${props=>props.$currentCategory || props.$isHovered ? `'Pretendard-SemiBold'`:`'Pretendard-Regular'`};
  font-size:18px;
  color:${props=>props.$currentCategory || props.$isHovered ? `#9747FF`:`#1E1E1E`};
  border-bottom:${props=>props.$currentCategory ? `2px solid #9747FF`:'1px solid #F3F3F3'};
  opacity: ${props=>props.$isHovered ? '0.3' : '1'};
`

export default Category
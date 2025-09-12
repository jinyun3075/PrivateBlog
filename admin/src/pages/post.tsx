import styled from "styled-components"
import Header from "../components/header/header";
import { colors } from "../common/designSystem";

const Post = () => {
  return(
    <Container>
      <Header title="게시글 관리">
        <SaveBtn>등록</SaveBtn>
      </Header>
      
    </Container>
  )
}



const Container = styled.div`
  width: 100%;
`;


const SaveBtn = styled.button`
  background-color: ${colors.Black};
  width: 80px;
  padding: 10px 0;
  font-family: 'Pretendard-SemiBold';
  font-size: 16px;
  color: ${colors.White};
  border-radius: 4px;
  border: none;
  cursor: pointer;
`;
export default Post
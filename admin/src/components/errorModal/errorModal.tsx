import styled from "styled-components"

type ErrorModalrProps = {
  title:string;
  text:string;
  onClose: () => void;
}

const ErrorModal = ({ title, text, onClose }: ErrorModalrProps) => {
  

  return(
    <Overlay>
      <Container> 
        <Title>{title}</Title>
        <Text>{text}</Text>
        <Button onClick={onClose}>확인</Button>
      </Container>
    </Overlay>
  )
}

const Overlay = styled.div`
  position: fixed;
  z-index: 999;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`

const Container = styled.div`
  position: relative;
  padding:30px;
  width: 532px;
  height: 243px;
  border:none;
  border-radius: 10px;
  background-color: #FFFFFF;
`

const Title = styled.span`
  font-family: 'Pretendard-Bold';
  font-size: 22px;
  color:#4B5563;
  letter-spacing: 0;
`

const Text = styled.p`
  margin-top:20px;
  font-family: 'Pretendard-Medium';
  font-size: 16px;
  color:#4B5563;
`

const Button = styled.button`
  position: absolute;
  font-family: 'Pretendard-Bold';
  font-size: 15px;
  color:#FFFFFF;
  background-color: #1E1E1E;
  cursor: pointer;
  bottom:30px;
  right:30px;
  padding: 9px 23px;
  border: none;
`
  


export default ErrorModal
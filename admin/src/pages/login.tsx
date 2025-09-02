import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuthStore } from "../store/useAuth";
import LoginError from "../components/login/loginError";

const Login = () => {
  const navigate = useNavigate();
  
  const {onLogin}= useAuthStore();

  const [id,setId] = useState("");
  const [pw,setPw] = useState("");
  const [isLoginError,setIsLoginError] = useState(false);

  const handleIdChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  }

  const handlePwChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setPw(e.target.value)
  }

  const handleSubmit = async (e:React.FormEvent) => {
    e.preventDefault();
    const isInvalidId = id.length < 3 || id.length > 10;
    const isInvalidPw = pw.length < 8 || pw.length > 16;
    
    if (isInvalidId || isInvalidPw) {
      setIsLoginError(true);
      return;
    }

    try{
      const { data: data } = await axios.post(
      `http://220.71.90.91:3001/auth/login-with-email`,
        {
          id: id,
          password: pw,
        },
        {}
      );

      onLogin(data.token);
      navigate("/dashboard");
    }catch(e){
      console.log(e);
      setIsLoginError(true);
    }finally{
      setId("");
      setPw("");
    }
  }

  return(
    <Container>
      <LoginForm onSubmit={handleSubmit}>  
        <Title>관리자 로그인</Title>
        {isLoginError && <LoginError onConfirm={() => setIsLoginError(false)} />}

        <InputWrapper>
          <span>아이디</span>
          <Input 
            type="text" 
            placeholder="아이디를 입력하세요." 
            value={id} 
            onChange = {handleIdChange}
          />
        </InputWrapper>

        <InputWrapper>
          <span>비밀번호</span>
          <Input 
            type="password" 
            placeholder="비밀번호를 입력하세요." 
            value={pw} 
            onChange = {handlePwChange}
          />
        </InputWrapper>

        <LoginButton type="submit">로그인</LoginButton>
      </LoginForm>
    </Container>
  )

}


const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap:35px;
  margin:0 auto;
  width: 500px;
`

const Title = styled.h1`
  text-align: center;
  font-size: 30px;
	font-family: 'Pretendard-Bold';
  color:#1E1E1E;
`

const InputWrapper = styled.div`
  width: 100%;
  span{
    font-family: 'Pretendard-Bold';
    font-size: 14px;
    color:#1E1E1E;
  }
`
const Input = styled.input`
  margin-top: 5px;
  width: 100%;
  height: 50px;
  padding: 15px 0 15px 16px;
  border-radius: 4px;
  border:1px solid #D1D5DB;
  font-size: 14px;
  font-family: 'Pretendard-Regular';
  letter-spacing: 0;
  line-height: 0.2;
  color:#1E1E1E;


  &:focus,
  &:focus-visible{
    outline: none;
    border-color: #1B7EFF;

  }
  
  &::placeholder{
    font-size: 14px;
    font-family: 'Pretendard-Regular';
    letter-spacing: 0;
    line-height: 1.4;
    color:#9CA3AF;
  }
`

const LoginButton = styled.button`
  width: 100%;
  height: 50px;
  color:#FFFFFF;
  background-color: #1E1E1E;
  border-radius: 4px;

`





export default Login;
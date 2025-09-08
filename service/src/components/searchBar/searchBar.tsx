import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components"


interface SearchBarProps {
  placeholder:string;
}
const SearchBar = ({placeholder}:SearchBarProps) => {

  const [value,setValue] = useState("")
  const navigate = useNavigate();

  const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }
 
  const onSubmit = (e:React.FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;
    navigate(`/search?keyword=${encodeURIComponent(value.trim())}`);  }


  return(
    <Container onSubmit ={onSubmit}>
      <Search>
        <SearchInput 
          placeholder = {placeholder} 
          value = {value}
          onChange={onChange}
        />
        <SearchImg src="/img/icon_magnifier.png"/>
      </Search>

      <Button>검색</Button>
    </Container>
  )
}


const Container = styled.form`
  display: flex;
  gap: 30px;           // 피그마 확인 불가. 임시 픽셀
  height: 35px;
`

const Search = styled.div`
  width:400px;
  height:35px;
  padding:6.5px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  border:1px solid #D1D5DB;
  border-radius: 4px;

  @media screen and (max-width: 1200px) {

  }

  @media screen and (max-width: 576px) {
  }

`

const SearchInput = styled.input`
  width:100%;
  height:100%;
  border:none;
  font-size: 14px;
  background-color: #FFFFFF;
  color:#9CA3AF;
  letter-spacing: 0;


  &:focus{
    outline:none;
  }

  &::placeholder{
    font-family: 'Pretendard-Regular';
    font-size: 14px;
    color:#9CA3AF;
    letter-spacing: 0;
    @media screen and (max-width: 1200px) {
    }  
    @media screen and (max-width: 576px) {
    }
  }

  @media screen and (max-width: 1200px) {

  }

  @media screen and (max-width: 576px) {

  }
`

const SearchImg = styled.img`
  width: 13px;
  height: 13px;

  @media screen and (max-width: 576px) {

  }
`

const Button = styled.button`
  width: 70px;
  font-family: 'Pretendard-Regular';
  font-size: 14px;
  color:#1E1E1E;
  border: 1px solid #D1D5DB;
  border-radius:4px;
`

export default SearchBar
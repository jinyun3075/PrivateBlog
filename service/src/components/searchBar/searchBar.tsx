import styled from "styled-components"

const SearchBar = () => {
  return(
    <Search>
      <SearchImg src="/img/icon_search.png"/>
      <SearchInput />
    </Search>
  )
}

const Search = styled.div<{$isArabic:boolean}>`
  width:37%;
  height:auto;
  padding:8px 18px;
  display: flex;
  flex-direction:${props=> props.$isArabic ? `row-reverse`:`row`};  
  justify-content: space-between;
  align-items: center;

  border:1px solid #DDDDDD;
  border-radius: 17px;

  @media screen and (max-width: 1200px) {
    padding:18px 20px;
    width:100%;
    margin-top:50px;
    border-radius: 100px;
  }

  @media screen and (max-width: 576px) {
    margin-top:25px;
    padding:8px 14px;
  }

`

const SearchInput = styled.input<{$isArabic:boolean}>`
  width:100%;
  height:100%;

  border:none;

  font-size: 14px;
  font-family: "Inter-Medium";
  color:#333333;
  letter-spacing: -0.21px;
  direction:${props=>props.$isArabic ? `rtl`:`ltr`};

  &:focus{
    outline:none;
  }

  &::placeholder{
    font-size: 14px;
    font-family: "Inter-Medium";
    color:#B5B5B5;
    letter-spacing: -0.21px;
    text-align:${props=>props.$isArabic ? `right`:`left`};    
    @media screen and (max-width: 1200px) {
      font-size: 17px;
    }
  
    @media screen and (max-width: 576px) {
      font-size: 9px;
    }
  }

  @media screen and (max-width: 1200px) {
    font-size: 17px;
  }

  @media screen and (max-width: 576px) {
      font-size: 9px;
    }
`

const SearchImg = styled.img`
  width: 14px;
  height: 14px;

  @media screen and (max-width: 576px) {
    width: 10px;
    height: 10px;
  }
`

export default SearchBar
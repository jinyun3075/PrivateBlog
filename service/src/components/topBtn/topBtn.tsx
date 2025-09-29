import { useEffect, useState } from 'react';
import styled from 'styled-components';

const TopBtn = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      setIsVisible(scrollY > 20); 
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 컴포넌트가 사라질 때 호버 상태 리셋
  useEffect(() => {
    if (!isVisible) {
      setIsHovered(false);
    }
  }, [isVisible]);

  return(
    <>
      {  isVisible &&  
        <Container 
          onClick={scrollToTop} 
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}>
          <img src={isHovered ? '/img/topButton_hover.png' : '/img/topButton.png'} />
        </Container>
      }
    </>
  )

};

const Container = styled.button` 
  position: fixed;
  bottom: 18vh;   
  right: calc(50% - 550px);

  cursor: pointer;
  z-index: 1000;
  img {
    width: 50px;
    height: 50px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
    border-radius: 100%;
    transition: box-shadow 0.3s ease;

    &:hover{
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
      border-radius: 100%;
    }
  }
`;

export default TopBtn;

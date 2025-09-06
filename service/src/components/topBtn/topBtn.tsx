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
  1
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
  bottom: 210px;
  right: calc(50% - 625px);

  cursor: pointer;
  z-index: 1000;

  img {
    width: 50px;
    height: 50px;
  }
`;

export default TopBtn;

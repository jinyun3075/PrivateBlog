import { useEffect, useState } from 'react';
import styled from 'styled-components';

const TopBtn = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

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
        <Container onClick={scrollToTop}>
          <img src="img/스케일.jpg" alt="Scroll to top" />
        </Container>
      }
    </>
  )

};

const Container = styled.button`
  position: fixed;
  bottom: 40px;
  right: 30px;
  width: 50px;
  height: 50px;
  cursor: pointer;
  z-index: 1000;

  img {
    width: 100%;
    height: 100%;
  }
`;

export default TopBtn;

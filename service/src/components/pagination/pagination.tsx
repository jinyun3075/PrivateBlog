import styled from "styled-components";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  noData?: boolean;
}

const Pagination = ({ currentPage, totalPages, onPageChange, noData }: PaginationProps) => {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const leftArrowSrc = `/img/${isFirstPage ? "icon_arrowLeft_unactive.png" : "icon_arrowLeft.png"}`;
  const rightArrowSrc = `/img/${isLastPage ? "icon_arrowRight_unactive.png" : "icon_arrowRight.png"}`;

  const handleClickLeft = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleClickRight = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  const renderPageButtons = () => {
    if (noData) {
      return <PageButton $currentPage={true}>1</PageButton>;
    }

    return Array.from({ length: totalPages }, (_, idx) => (
      <PageButton
        key={idx + 1}
        $currentPage={currentPage === idx + 1}
        onClick={() => onPageChange(idx + 1)}
      >
        {idx + 1}
      </PageButton>
    ));
  };

  return (
    <PaginationWrapper>

      {/* <ArrowIcon
        src="/img/icon_doubleArrowLeft.png"
        onClick={() => onPageChange(1)}
        disabled={isFirstPage}
      /> */}

      <ArrowIcon src={leftArrowSrc} onClick={handleClickLeft} />
        {renderPageButtons()}
      <ArrowIcon src={rightArrowSrc} onClick={handleClickRight} />

      {/* <ArrowIcon
        src="/img/icon_doubleArrowRight.png"
        onClick={() => onPageChange(totalPages)} 
        disabled={isLastPage}
      /> */}
    </PaginationWrapper>
  );
};

export default Pagination;

const PaginationWrapper = styled.div`
  margin: 40px auto 0 auto;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 6px;
`;

const ArrowIcon = styled.img`
  width: 32px;
  height: 32px;
  cursor: pointer;
`;

const PageButton = styled.button<{ $currentPage: boolean }>`
  width: 32px;
  height: 32px;
  font-family: 'Pretendard-Regular';
  font-size: 14px;
  background-color: ${(props) => (props.$currentPage ? `#1B7EFF` : `#FFFFFF`)};
  color: ${(props) => (props.$currentPage ? `#FFFFFF` : `#1E1E1E`)};
  border: ${(props) => (props.$currentPage ? `none` : `1px solid #E5E7EB`)};
  border-radius: 2px;
  cursor: pointer;

  &:hover {
    background-color: #1B7EFF;
    opacity: 0.3;
    color: #FFFFFF;
  }
`;

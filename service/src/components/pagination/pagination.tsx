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

  const leftArrowSrc = `/img/${(isFirstPage || noData) ? "arrowLeft_off.png" : "arrowLeft_on.png"}`;
  const rightArrowSrc = `/img/${(isLastPage || noData) ? "arrowRight_off.png" : "arrowRight_on.png"}`;
  const leftArrow2Src = `/img/${(isFirstPage || noData) ? "arrowLeft2_off.png" : "arrowLeft2_on.png"}`;
  const rightArrow2Src = `/img/${(isLastPage || noData) ? "arrowRight2_off.png" : "arrowRight2_on.png"}`;

  const handleClickLeft = () => {
    if (!noData && currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleClickRight = () => {
    if (!noData && currentPage < totalPages) onPageChange(currentPage + 1);
  };

  const handleClickFirst = () => {
    if (!noData && currentPage > 1) onPageChange(1);
  };

  const handleClickLast = () => {
    if (!noData && currentPage < totalPages) onPageChange(totalPages);
  };

  const renderPageButtons = () => {
    if (noData) {
      return <PageButton $currentPage={true}>1</PageButton>;
    }

    // 0~10개: 1페이지만, 11~20개: 2페이지까지, 21~30개: 3페이지까지, 31~40개: 4페이지까지, 41~50개: 5페이지까지
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, idx) => (
        <PageButton
          key={idx + 1}
          $currentPage={currentPage === idx + 1}
          onClick={() => onPageChange(idx + 1)}
        >
          {idx + 1}
        </PageButton>
      ));
    }

    // 51개부터는 5개씩만 페이지 표시
    // 현재 페이지가 1~5 범위에 있으면 1~5 표시
    if (currentPage <= 5) {
      return Array.from({ length: 5 }, (_, idx) => {
        const pageNum = idx + 1;
        return (
          <PageButton
            key={pageNum}
            $currentPage={currentPage === pageNum}
            onClick={() => onPageChange(pageNum)}
          >
            {pageNum}
          </PageButton>
        );
      });
    }

    // 현재 페이지가 6 이상이면 현재 페이지부터 끝까지 표시 (최대 5개)
    const startPage = currentPage;
    const endPage = Math.min(currentPage + 4, totalPages);
    
    return Array.from({ length: endPage - startPage + 1 }, (_, idx) => {
      const pageNum = startPage + idx;
      return (
        <PageButton
          key={pageNum}
          $currentPage={currentPage === pageNum}
          onClick={() => onPageChange(pageNum)}
        >
          {pageNum}
        </PageButton>
      );
    });
  };

  return (
    <PaginationWrapper>
      <ArrowIcon src={leftArrow2Src} onClick={handleClickFirst} />
      <ArrowIcon src={leftArrowSrc} onClick={handleClickLeft} />
      {renderPageButtons()}
      <ArrowIcon src={rightArrowSrc} onClick={handleClickRight} />
      <ArrowIcon src={rightArrow2Src} onClick={handleClickLast} />
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
  background-color: ${(props) => (props.$currentPage ? `#9747FF` : `#FFFFFF`)};
  color: ${(props) => (props.$currentPage ? `#FFFFFF` : `#1E1E1E`)};
  border: ${(props) => (props.$currentPage ? `none` : `1px solid #E5E7EB`)};
  border-radius: 2px;
  cursor: pointer;

  &:hover {
    background-color: #9747FF;
    opacity: 0.3;
    color: #FFFFFF;
  }
`;

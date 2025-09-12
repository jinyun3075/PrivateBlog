// hooks/usePagination.ts
import { useState, useMemo } from "react";

function usePagination<T>(data: T[], postsPerPage:number) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = useMemo(() => {
    return Math.ceil(data.length / postsPerPage);
  }, [data.length, postsPerPage]);

  const currentPosts = useMemo(() => {
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    return data.slice(indexOfFirstPost, indexOfLastPost);
  }, [currentPage, data, postsPerPage]);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return {
    currentPage,
    totalPages,
    currentPosts,
    goToPage,
  };
}


//  const {currentPage,totalPages,currentPosts,goToPage} = usePagination(data, 10);

//  currentPosts.map(item => <li>{item.title}</li>)

// {Array.from({ length: totalPages }, (_, idx) => (
//   <PageButton currentPage = {idx+1} key={idx + 1} onClick={() => goToPage(idx + 1)}>
//     {idx + 1}
//   </PageButton>
// ))}

// const PageButton = styled.button<{$currentPage:boolean}>`
//   margin-right: 5px;
//   padding: 5px 10px;
//   background-color: ${props=>props.$currentPage ? "#4caf50" : "#e0e0e0"};
//   color: ${props=>props.$currentPage ? "#fff" : "#000"};
//   border: "none";
//   border-radius: "4px";
//   cursor: "pointer";
// `
export default usePagination;
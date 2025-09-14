import styled from "styled-components";
import { usePosts } from "../../hooks/usePosts";
import { useState, useMemo } from "react";
import { PostType } from "../../common/type";
import usePagination from "../../hooks/usePagination";
import Pagination from "../pagination/pagination";
import { colors } from "../../common/designSystem";

interface TopHeadlinePopupProps {
  onClose: () => void;
  onSelectPost: (post: PostType) => void;
  currentTopHeadlines: PostType[];
}

const TopHeadlinePopup = ({ onClose, onSelectPost, currentTopHeadlines }: TopHeadlinePopupProps) => {
  const { data = [], isError } = usePosts();
  const [selectedPost, setSelectedPost] = useState<PostType | null>(null);
  console.log(data);

  // 현재 Top Headline에 없는 게시글들만 필터링
  const availablePosts = useMemo(() => {
    const currentTopHeadlineIds = currentTopHeadlines.map(headline => headline.post_id);
    return data.filter((post: PostType) => !currentTopHeadlineIds.includes(post.post_id));
  }, [data, currentTopHeadlines]);

  const { currentPage, totalPages, currentPosts, goToPage } = usePagination(availablePosts, 10);

  const handleCheckboxChange = (post: PostType) => {
    setSelectedPost(post);
  };

  const handleSelect = () => {
    if (selectedPost) {
      onSelectPost(selectedPost);
    }
  };

  return(
    <Overlay>
      <Container>
        <Header>
          <Title>게시글 변경</Title>
          <CloseButton src="/img/icon_closeBtn.png" onClick={onClose} />
        </Header>
        
        <Content>
          <PostListHeader>
            <PostListTitle>게시글 목록</PostListTitle>
            <PostCount>총 <span>{availablePosts.length}</span>개</PostCount>
          </PostListHeader>

          <TableContainer>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHeaderCell width="32px"></TableHeaderCell>
                  <TableHeaderCell width="150px">카테고리</TableHeaderCell>
                  <TableHeaderCell>제목</TableHeaderCell>
                  <TableHeaderCell width="150px">작성자</TableHeaderCell>
                  <TableHeaderCell width="150px">작성일시</TableHeaderCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentPosts.map((post: PostType) => (
                  <TableRow key={post.post_id}>
                    <TableCell>
                      <Checkbox
                        type="checkbox"
                        checked={selectedPost?.post_id === post.post_id}
                        onChange={() => handleCheckboxChange(post)}
                      />
                    </TableCell>
                    <TableCell>
                      <TableText>{post.category.name}</TableText>
                    </TableCell>
                    <TableCell>
                      <TableText>{post.title}</TableText>
                    </TableCell>
                    <TableCell>
                      <TableText>{post.reg_user}</TableText>
                    </TableCell>
                    <TableCell>
                      <TableText>{new Date(post.regDate).toLocaleDateString('ko-KR')}</TableText>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={goToPage}
            noData={availablePosts.length === 0 || isError}
          />

          <ButtonContainer>
            <SelectButton onClick={handleSelect} disabled={!selectedPost}>
              선택
            </SelectButton>
          </ButtonContainer>
        </Content>
      </Container>
    </Overlay>
  )
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`

const Container = styled.div`
  width: 1030px;
  height:auto;
  max-height: 918px;
  background-color: ${colors.White};
  border-radius: 12px;

  overflow: hidden;
  display: flex;
  flex-direction: column;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 32px;
  border-bottom: 1px solid ${colors.LightGray[300]};
`

const Title = styled.h2`
  font-family: 'Pretendard-Bold';
  font-size: 16px;
  color: ${colors.Black};
`

const CloseButton = styled.img`
  width: 28px;
  height: 28px;
  cursor: pointer;
`

const Content = styled.div`
  padding: 20px 24px;
`

const PostListHeader = styled.div`
  width: 100%;
  padding:10px 0;
  display: flex;
  align-items: center;
  gap: 12px;
`

const PostListTitle = styled.h3`
  font-family: 'Pretendard-SemiBold';
  font-size: 16px;
  color: ${colors.Black};
`

const PostCount = styled.span`
  font-family: 'Pretendard-Regular';
  font-size: 16px;
  color: ${colors.Gray[0]};

  span{
    color: ${colors.Black};
  }
`

const TableContainer = styled.div`
  width: 100%;
  /* border: 1px solid ${colors.LightGray[300]}; */
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`

const TableHeader = styled.thead`
  background-color: ${colors.LightGray[0]};
  border-top: 1px solid ${colors.LightGray[300]};
  border-bottom: 1px solid ${colors.LightGray[300]};
`


const TableRow = styled.tr`
`

const TableHeaderCell = styled.th<{ width?: string }>`
  padding:16px;
  text-align: left;
  font-family: 'Pretendard-SemiBold';
  font-size: 14px;
  color: ${colors.Black};
  width: ${props => props.width || 'auto'};
  position: relative;
  
  &::before{
    content:"";
    position: absolute;
    width: 1.2px;
    height: 26px;
    top:calc(50% - 13px);
    left:0;
    
    background-color:${colors.LightGray[300]};
  }
  &:first-child {
    &::before{
      content: none;
    }
  }
  
`

const TableBody = styled.tbody``

const TableCell = styled.td`
  padding: 16.5px 15.5px;
`

const Checkbox = styled.input`
  width: 16px;
  height: 16px;
  cursor: pointer;
  appearance: none;
  background: url('/img/checkbox_off.png') no-repeat center / contain;

  &:checked {
    background-image: url('/img/checkbox_on.png');
  }
`

const TableText = styled.p`
  font-family: 'Pretendard-Regular';
  font-size: 14px;
  color: ${colors.Black};

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`

const SelectButton = styled.button<{ disabled?: boolean }>`
  padding: 10px 0;
  width: 330px;
  
  background-color: ${props => props.disabled ? colors.LightGray[300] : colors.Black};
  border: none;
  border-radius: 4px;
  
  font-family: 'Pretendard-SemiBold';
  font-size: 16px;
  color: ${colors.White};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
`

export default TopHeadlinePopup
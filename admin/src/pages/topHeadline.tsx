import styled from "styled-components"
import Header from "../components/header/header"
import { colors } from "../common/designSystem"
import { MainContents } from "../common/style"
import { usePosts } from "../hooks/usePosts"
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { useState, useMemo, useEffect, useCallback } from "react"
import { PostType } from "../common/type"
import TopHeadlinePopup from "../components/topHeadline/topHeadlinePopup"
import axios from "axios"
import { loadAccessToken } from "../store/useAuth"

const HEADLINE_SORT_RANGE = { min: 1, max: 3 } as const;
const API_ENDPOINTS = {
  UPDATE_POST: '/api/admin/post/update'
} as const;

const TopHeadline = () => {
  const { data = [], isError } = usePosts();
  const token = loadAccessToken();

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [topHeadlines, setTopHeadlines] = useState<PostType[]>([]);
  const [isHeadlineEnabled, setIsHeadlineEnabled] = useState(true);
  const [originalHeadlines, setOriginalHeadlines] = useState<PostType[]>([]);
  const [hasChanges, setHasChanges] = useState(false);

  // Computed values
  const sortedTopHeadlines = useMemo(() => {
    const headlines = data.filter((post: PostType) => 
      post.main_sort && 
      post.main_sort >= HEADLINE_SORT_RANGE.min && 
      post.main_sort <= HEADLINE_SORT_RANGE.max
    );
    return headlines.sort((a: PostType, b: PostType) => a.main_sort - b.main_sort);
  }, [data]);

  // 3개 슬롯을 모두 채우는 헤드라인 목록 생성 (빈 슬롯 포함)
  const displayHeadlines = useMemo(() => {
    const displayList: (PostType | null)[] = [];
    
    // 1, 2, 3번 슬롯을 순서대로 채움
    for (let i = 1; i <= 3; i++) {
      const existingHeadline = topHeadlines.find(headline => headline.main_sort === i);
      displayList.push(existingHeadline || null);
    }
    
    return displayList;
  }, [topHeadlines]);

  // API functions
  const updateSinglePost = useCallback(async (post: PostType) => {
    try {
      const updateData = {
        post_id: post.post_id,
        category_id: post.category.category_id,
        state_id: post.content.state.state_id,
        reg_user: post.reg_user,
        thumbnail: post.thumbnail,
        title: post.title,
        content: post.content.content,
        main_sort: post.main_sort,
        use_yn: post.use_yn
      };

      await axios.put(`${process.env.REACT_APP_BACKEND_HOST}${API_ENDPOINTS.UPDATE_POST}`, updateData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      console.log('Post updated successfully');
    } catch (error) {
      console.error('Failed to update post:', error);
    }
  }, [token]);

  // Event handlers
  const handleDragEnd = useCallback((result: DropResult) => {
    if (!result.destination) return;

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;
    
    const sourceItem = displayHeadlines[sourceIndex];
    if (!sourceItem) return; // 빈 슬롯은 드래그할 수 없음

    // 드래그된 아이템의 main_sort를 목적지 인덱스 + 1로 설정
    const updatedHeadlines = topHeadlines.map(headline => {
      if (headline.post_id === sourceItem.post_id) {
        return { ...headline, main_sort: destinationIndex + 1 };
      }
      return headline;
    });
    
    // 목적지에 기존에 있던 아이템이 있다면 그 아이템을 원래 위치로 이동
    const destinationItem = displayHeadlines[destinationIndex];
    if (destinationItem) {
      const finalHeadlines = updatedHeadlines.map(headline => {
        if (headline.post_id === destinationItem.post_id) {
          return { ...headline, main_sort: sourceIndex + 1 };
        }
        return headline;
      });
      setTopHeadlines(finalHeadlines);
    } else {
      setTopHeadlines(updatedHeadlines);
    }
    
    setHasChanges(true);
  }, [topHeadlines, displayHeadlines]);

  const handleChangeClick = useCallback((index: number) => {
    setSelectedIndex(index);
    setIsPopupOpen(true);
  }, []);

  const handleSelectPost = useCallback((selectedPost: PostType) => {
    if (selectedIndex !== null) {
      const updatedHeadlines = [...topHeadlines];
      
      // 기존에 같은 main_sort를 가진 헤드라인이 있다면 제거
      const existingIndex = updatedHeadlines.findIndex(h => h.main_sort === selectedIndex + 1);
      if (existingIndex !== -1) {
        updatedHeadlines.splice(existingIndex, 1);
      }
      
      // 새 헤드라인 추가
      updatedHeadlines.push({
        ...selectedPost,
        main_sort: selectedIndex + 1
      });
      
      setTopHeadlines(updatedHeadlines);
      setHasChanges(true);
    }
    setIsPopupOpen(false);
    setSelectedIndex(null);
  }, [selectedIndex, topHeadlines]);

  const handleToggleChange = useCallback((checked: boolean) => {
    setIsHeadlineEnabled(checked);
    setHasChanges(true);
    
    if (checked) {
      setTopHeadlines(originalHeadlines);
    } else {
      setTopHeadlines([]);
    }
  }, [originalHeadlines]);

  const handleSave = useCallback(async () => {
    try {
      if (!isHeadlineEnabled) {
        // OFF 상태: 모든 headline을 0으로 변경
        const disabledHeadlines = originalHeadlines.map(headline => ({
          ...headline,
          main_sort: 0
        }));
        
        await Promise.all(disabledHeadlines.map(headline => updateSinglePost(headline)));
      } else {
        // ON 상태: 현재 상태를 서버에 반영
        // 1. 기존 헤드라인 중 현재 표시되지 않는 것들은 main_sort를 0으로 설정
        const currentHeadlineIds = topHeadlines.map(headline => headline.post_id);
        const removedHeadlines = originalHeadlines.filter(headline => 
          !currentHeadlineIds.includes(headline.post_id)
        );
        
        // 2. 현재 표시되는 헤드라인들의 main_sort 업데이트
        const updatePromises = topHeadlines.map(headline => updateSinglePost(headline));
        
        // 3. 제거된 헤드라인들의 main_sort를 0으로 설정
        const removePromises = removedHeadlines.map(headline => 
          updateSinglePost({ ...headline, main_sort: 0 })
        );
        
        await Promise.all([...updatePromises, ...removePromises]);
      }
      
      setHasChanges(false);
      setOriginalHeadlines(topHeadlines);
    } catch (error) {
      console.error('Failed to save headlines:', error);
    }
  }, [isHeadlineEnabled, originalHeadlines, topHeadlines, updateSinglePost]);

  // Effects
  useEffect(() => {
    if (sortedTopHeadlines.length > 0 && topHeadlines.length === 0) {
      setTopHeadlines(sortedTopHeadlines);
      setOriginalHeadlines(sortedTopHeadlines);
    }
  }, [sortedTopHeadlines, topHeadlines.length]);

  // Render helpers
  const renderTableHeader = () => (
    <TableHeader>
      <TableRow>
        <TableHeaderCell width="50px">
          <DragHandle>⋮⋮</DragHandle>
        </TableHeaderCell>
        <TableHeaderCell width="96px">
          <HeaderContent>
            <HeaderText>No</HeaderText>
          </HeaderContent>
        </TableHeaderCell>
        <TableHeaderCell>
          <HeaderContent>
            <HeaderText>제목</HeaderText>
          </HeaderContent>
        </TableHeaderCell>
        <TableHeaderCell width="246px">
          <HeaderContent>
            관리
          </HeaderContent>
        </TableHeaderCell>
      </TableRow>
    </TableHeader>
  );

  const renderTableBody = () => (
    <Droppable droppableId="topHeadlines" type="topHeadlines">
      {(provided) => (
        <TableBody ref={provided.innerRef} {...provided.droppableProps}>
          {displayHeadlines.map((headline, index) => {
            const sortNumber = index + 1;
            
            if (headline) {
              // 기존 헤드라인이 있는 경우
              return (
                <Draggable key={headline.post_id} draggableId={headline.post_id} index={index}>
                  {(provided, snapshot) => (
                    <TableRow
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      $isDragging={snapshot.isDragging}
                    >
                      <TableCell>
                        <DragHandle {...provided.dragHandleProps}>⋮⋮</DragHandle>
                      </TableCell>
                      <TableCell>{sortNumber}</TableCell>
                      <TableCell>
                        <TitleText>{headline.title}</TitleText>
                      </TableCell>
                      <TableCell>
                        <ChangeButton onClick={() => handleChangeClick(index)}>
                          변경
                        </ChangeButton>
                      </TableCell>
                    </TableRow>
                  )}
                </Draggable>
              );
            } else {
              // 빈 슬롯인 경우
              return (
                <TableRow key={`empty-${sortNumber}`}>
                  <TableCell>
                    <DragHandle>⋮⋮</DragHandle>
                  </TableCell>
                  <TableCell>{sortNumber}</TableCell>
                  <TableCell>
                    <EmptySlotText>헤드라인을 지정해 주세요</EmptySlotText>
                  </TableCell>
                  <TableCell>
                    <ChangeButton onClick={() => handleChangeClick(index)}>
                      변경
                    </ChangeButton>
                  </TableCell>
                </TableRow>
              );
            }
          })}
          {provided.placeholder}
        </TableBody>
      )}
    </Droppable>
  );

  return (
    <Container>
      <Header title="Top 헤드라인">
        <SaveBtn onClick={handleSave} disabled={!hasChanges}>
          저장
        </SaveBtn>
      </Header>

      <MainContents>
        <ToggleSection>
          <ToggleLabel>헤드 사용 여부</ToggleLabel>
          <ToggleSwitch>
            <ToggleInput 
              type="checkbox" 
              checked={isHeadlineEnabled}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                handleToggleChange(e.target.checked)
              }
            />
            <ToggleSlider>
              <ToggleText $isEnabled={isHeadlineEnabled}>
                {isHeadlineEnabled ? 'on' : 'off'}
              </ToggleText>
            </ToggleSlider>
          </ToggleSwitch>
        </ToggleSection>

        {isHeadlineEnabled && (
          <TableContainer>
            <DragDropContext onDragEnd={handleDragEnd}>
              <Table>
                {renderTableHeader()}
                {renderTableBody()}
              </Table>
            </DragDropContext>
          </TableContainer>
        )}
      </MainContents>

      {isPopupOpen && (
        <TopHeadlinePopup
          onClose={() => setIsPopupOpen(false)}
          onSelectPost={handleSelectPost}
          currentTopHeadlines={topHeadlines}
        />
      )}
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  width: 100%;
`;

const SaveBtn = styled.button<{ disabled?: boolean }>`
  background-color: ${props => props.disabled ? colors.LightGray[300] : colors.Black};
  width: 80px;
  padding: 10px 0;
  font-family: 'Pretendard-SemiBold';
  font-size: 16px;
  color: ${colors.White};
  border-radius: 4px;
  border: none;
  cursor: ${props => props.disabled ? 'auto' : 'pointer'};
  opacity: ${props => props.disabled ? 0.6 : 1};
`;

const ToggleSection = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 18px 0;
`;

const ToggleLabel = styled.h2`
  font-family: 'Pretendard-SemiBold';
  font-size: 18px;
  color: ${colors.Black};
`;

const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 58.4px;
  height: 26.4px;
`;

const ToggleSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${colors.LightGray[300]};
  transition: 0.2s;
  border-radius: 100px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:before {
    position: absolute;
    content: "";
    height: 21.6px;
    width: 22px;
    left: 2px;
    bottom: 2px;
    background-color: white;
    transition: 0.2s;
    border-radius: 50%;
  }
`;

const ToggleText = styled.span<{ $isEnabled: boolean }>`
  font-family: 'Pretendard-SemiBold';
  font-size: 15px;
  color: ${colors.White};
  z-index: 1;
  position: absolute;
  left: ${props => props.$isEnabled ? '9.6px' : '29px'};
  transition: left 0.2s;
`;

const ToggleInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + ${ToggleSlider} {
    background-color: ${colors.Black};
  }

  &:checked + ${ToggleSlider}:before {
    transform: translateX(33px);
  }
`;

const TableContainer = styled.div`
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.thead`
  border-top: 1.2px solid ${colors.LightGray[300]};
  border-bottom: 1.2px solid ${colors.LightGray[300]};
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr<{ $isDragging?: boolean }>`
  border-bottom: 1px solid ${colors.LightGray[300]};
  background-color: ${props => props.$isDragging ? colors.LightGray[100] : 'transparent'};
  opacity: ${props => props.$isDragging ? 0.8 : 1};
`;

const TableHeaderCell = styled.th<{ width?: string }>`
  background-color: ${colors.LightGray[0]};
  padding: 16px 20px;
  text-align: left;
  font-family: 'Pretendard-SemiBold';
  font-size: 16px;
  color: ${colors.Black};
  width: ${props => props.width || 'auto'};
`;

const TableCell = styled.td`
  padding: 15.6px 19.2px;
  font-family: 'Pretendard-Medium';
  font-size: 16px;
  color: ${colors.Black};
`;

const HeaderContent = styled.div`
  position: relative;
  
  &::before {
    content: "";
    position: absolute;
    width: 1.2px;
    height: 26px;
    top: calc(50% - 13px);
    left: -19.2px;
    background-color: ${colors.LightGray[300]};
  }
`;

const HeaderText = styled.div`
  font-family: 'Pretendard-SemiBold';
  font-size: 16px;
`;

const DragHandle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 12px;
  height: 19px;
  color: ${colors.Gray[100]};
  cursor: grab;
  user-select: none;
  touch-action: none;
  
  &:active {
    cursor: grabbing;
  }
`;

const ChangeButton = styled.button`
  background-color: ${colors.White};
  color: ${colors.Black};
  text-align: center;
  width: 80px;
  height: 40px;
  border: 1px solid ${colors.LightGray[400]};
  border-radius: 4px;
  font-family: 'Pretendard-SemiBold';
  font-size: 16px;
  cursor: pointer;
`;

const TitleText = styled.div`
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const EmptySlotText = styled.div`
  font-family: 'Pretendard-Medium';
  font-size: 16px;
  color: ${colors.Gray[100]};
`;

export default TopHeadline;
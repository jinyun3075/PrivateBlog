import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";

interface Category {
  category_id: number;
  name: string;
  reg_user: string;
  mod_user: string;
  sort: number;
  post_count?: number;
  isModified?: boolean;
}

interface Post {
  category: {
    category_id: number;
    name: string;
    reg_user: string;
    mod_user: string;
    sort: number;
  };
}

const Category = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editedCategoryName, setEditedCategoryName] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [hasChanges, setHasChanges] = useState(false);
  const [fieldError, setFieldError] = useState<string | null>(null);
  const [originalCategoryName, setOriginalCategoryName] = useState("");
  const [tempIdCounter, setTempIdCounter] = useState(0);
  const [categoryErrors, setCategoryErrors] = useState<{[key: number]: string}>({});
  const [modifiedCategories, setModifiedCategories] = useState<{[key: number]: boolean}>({}); 

  const API_URL = process.env.REACT_APP_BACKEND_HOST || "http://localhost:3000";


  const generateTempId = () => {
    const newTempId = tempIdCounter - 1; // 임시 ID 생성 (음수)
    setTempIdCounter(newTempId);
    return newTempId;
  };

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/client/post/select/all`);
      setPosts(response.data || []);
    } catch (err) {
      console.error("게시글 로드 실패:", err);
    }
  };

  const getPostCountByCategory = (categoryId: number): number => {
    return posts.filter(post => post.category.category_id === categoryId).length;
  };

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_URL}/api/client/category/select/all`);
      const categoriesData = response.data || [];
      
      const categoriesWithPostCount = categoriesData.map((category: Category) => ({
        ...category,
        post_count: getPostCountByCategory(category.category_id)
      }));
      
      setCategories(categoriesWithPostCount);
    } catch (err) {
      console.error("카테고리 로드 실패:", err);
      setError("카테고리를 불러오는데 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const addCategory = async () => {
    if (categories.length >= 10) {
      setError("카테고리는 최대 10개까지 생성할 수 있습니다.");
      return;
    }

    setIsAddingCategory(true);
    setError(null);

    try {
      const newCategory = {
        category_id: generateTempId(),
        name: "새로운 카테고리",
        reg_user: localStorage.getItem('@user_name') || 'admin',
        mod_user: localStorage.getItem('@user_name') || 'admin',
        sort: categories.length + 1
      };

      const updatedCategories = [...categories, newCategory];
      setCategories(updatedCategories);
      setHasChanges(true);
      
      // 새 카테고리를 수정 상태로 설정
      setModifiedCategories(prev => ({
        ...prev,
        [newCategory.category_id]: true
      }));
    
      setSelectedCategory(newCategory);
      setEditedCategoryName("새로운 카테고리");
      setOriginalCategoryName("새로운 카테고리");
    } catch (err) {
      console.error("카테고리 추가 실패:", err);
      setError("카테고리 추가에 실패했습니다.");
    } finally {
      setIsAddingCategory(false);
    }
  };

  const handleCategoryNameChange = (newName: string) => {
    setEditedCategoryName(newName);
    
    if (!selectedCategory) return;
    
    // 유효성 검사
    if (newName.length > 15) {
      const errorMsg = "제한 글자수를 초과하였습니다.";
      setFieldError(errorMsg);
      setCategoryErrors(prev => ({
        ...prev,
        [selectedCategory.category_id]: errorMsg
      }));
      return;
    }
    
    if (newName.trim() === "") {
      const errorMsg = "필수 항목을 입력하세요.";
      setFieldError(errorMsg);
      setCategoryErrors(prev => ({
        ...prev,
        [selectedCategory.category_id]: errorMsg
      }));
      return;
    }
    
    // 유효한 입력일 때 에러 초기화
    setFieldError(null);
    setCategoryErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[selectedCategory.category_id];
      return newErrors;
    });
    
    if (newName !== originalCategoryName) {
      // 수정 상태를 별도로 관리
      setModifiedCategories(prev => ({
        ...prev,
        [selectedCategory.category_id]: true
      }));
      setHasChanges(true);
    }
  };

  const saveAllCategories = async () => {
    if (!hasChanges) {
      alert("변경사항이 없습니다.");
      return;
    }

    const emptyCategories = categories.filter(cat => !cat.name.trim());
    if (emptyCategories.length > 0) {
      const firstEmptyCategory = emptyCategories[0];
      setSelectedCategory(firstEmptyCategory);
      setEditedCategoryName(firstEmptyCategory.name);
      setOriginalCategoryName(firstEmptyCategory.name);
      setFieldError("필수 항목을 입력하세요.");
      setCategoryErrors(prev => ({
        ...prev,
        [firstEmptyCategory.category_id]: "필수 항목을 입력하세요."
      }));
      return;
    }

    const longNameCategories = categories.filter(cat => cat.name.length > 15);
    if (longNameCategories.length > 0) {
      const firstLongNameCategory = longNameCategories[0];
      setSelectedCategory(firstLongNameCategory);
      setEditedCategoryName(firstLongNameCategory.name);
      setOriginalCategoryName(firstLongNameCategory.name);
      setFieldError("제한 글자수를 초과하였습니다.");
      setCategoryErrors(prev => ({
        ...prev,
        [firstLongNameCategory.category_id]: "제한 글자수를 초과하였습니다."
      }));
      return;
    }

    setIsSaving(true);
    setError(null);
    setFieldError(null);

    try {
      const existingCategories = categories.filter(cat => cat.category_id > 0);
      const newCategories = categories.filter(cat => cat.category_id < 0);

      let allSuccess = true;
      if (existingCategories.length > 0) {
        try {
          const updateResponse = await axios.put(`${API_URL}/api/admin/categorys/update`, existingCategories);
          if (updateResponse.status !== 200) {
            allSuccess = false;
          }
        } catch (updateErr) {
          console.error("카테고리 수정 실패:", updateErr);
          allSuccess = false;
        }
      }

      if (newCategories.length > 0 && allSuccess) {
        try {
          const categoriesForInsert = newCategories.map(cat => ({
            ...cat,
            category_id: 0
          }));
          const insertResponse = await axios.post(`${API_URL}/api/admin/categorys/insert`, categoriesForInsert);
          if (insertResponse.status !== 200) {
            allSuccess = false;
          }
        } catch (insertErr) {
          console.error("카테고리 추가 실패:", insertErr);
          allSuccess = false;
        }
      }

      if (allSuccess) {
        setHasChanges(false);
        const resetCategories = categories.map(cat => ({ ...cat, isModified: false }));
        setCategories(resetCategories);
        setCategoryErrors({}); // 에러 상태 초기화
        setModifiedCategories({}); // 수정 상태 초기화
        await fetchPosts();
        await fetchCategories();
        alert("카테고리가 저장되었습니다.");
      } else {
        setError("카테고리 저장에 실패했습니다.");
      }
    } catch (err) {
      console.error("카테고리 저장 실패:", err);
      setError("카테고리 저장에 실패했습니다.");
    } finally {
      setIsSaving(false);
    }
  };

  const deleteCategory = async () => {
    if (!selectedCategory) {
      setError("삭제할 카테고리를 선택해주세요.");
      return;
    }

    if (selectedCategory.post_count && selectedCategory.post_count > 0) {
      setError("게시글이 있는 카테고리는 삭제할 수 없습니다.");
      return;
    }

    if (!confirm("선택한 카테고리를 삭제하시겠습니까?")) {
      return;
    }

    setIsDeleting(true);
    setError(null);

    try {
      if (selectedCategory.category_id < 0) {
        const remainingCategories = categories.filter(cat => cat.category_id !== selectedCategory.category_id);
        setCategories(remainingCategories);
        setSelectedCategory(null);
        setHasChanges(true);
        alert("카테고리가 삭제되었습니다.");
      } else {
          const deleteResponse = await axios.delete(`${API_URL}/api/admin/category/delete/${selectedCategory.category_id}`);
        
        if (deleteResponse.status === 200) {
          const remainingCategories = categories.filter(cat => cat.category_id !== selectedCategory.category_id);
          setCategories(remainingCategories);
          setSelectedCategory(null);
          await fetchPosts();
          await fetchCategories();
          alert("카테고리가 삭제되었습니다.");
        }
      }
    } catch (err) {
      console.error("카테고리 삭제 실패:", err);
      setError("카테고리 삭제에 실패했습니다.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCategorySelect = (category: Category) => {
    if (selectedCategory && editedCategoryName !== originalCategoryName) {
      const updatedCategories = categories.map(cat => 
        cat.category_id === selectedCategory.category_id 
          ? { ...cat, name: editedCategoryName }
          : cat
      );
      setCategories(updatedCategories);
    }
    
    setSelectedCategory(category);
    setEditedCategoryName(category.name);
    setOriginalCategoryName(category.name);
    
    // 해당 카테고리의 에러 상태 복원
    const categoryError = categoryErrors[category.category_id];
    setFieldError(categoryError || null);
  };

  const handleDragStart = (e: React.DragEvent, category: Category) => {
    e.dataTransfer.setData("text/plain", category.category_id.toString());
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetCategory: Category) => {
    e.preventDefault();
    const draggedCategoryId = parseInt(e.dataTransfer.getData("text/plain"));
    
    if (draggedCategoryId === targetCategory.category_id) return;

    const draggedCategory = categories.find(cat => cat.category_id === draggedCategoryId);
    if (!draggedCategory) return;

    const newCategories = categories.map(cat => {
      if (cat.category_id === draggedCategoryId) {
        return { ...cat, sort: targetCategory.sort };
      } else if (cat.category_id === targetCategory.category_id) {
        return { ...cat, sort: draggedCategory.sort };
      }
      return cat;
    });

    const sortedCategories = newCategories.sort((a, b) => a.sort - b.sort);
    setCategories(sortedCategories);
    setHasChanges(true);
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchPosts();
      await fetchCategories();
    };
    loadData();
  }, []);

  useEffect(() => {
    if (posts.length > 0) {
      fetchCategories();
    }
  }, [posts]);

  return (
    <Container>
      <Header>
        <Title>카테고리 관리</Title>
        <SaveButton onClick={saveAllCategories} disabled={!hasChanges || isSaving}>
          {isSaving ? "저장 중..." : "저장"}
        </SaveButton>
      </Header>

      <MainContent>
        <LeftPanel>
          <ActionButtons>
            <AddButton 
              onClick={addCategory} 
              disabled={isAddingCategory || categories.length >= 10}
            >
              {isAddingCategory ? "추가 중..." : "추가"}
            </AddButton>
            <DeleteButton 
              onClick={deleteCategory} 
              disabled={!selectedCategory || isDeleting}
            >
              {isDeleting ? "삭제 중..." : "삭제"}
            </DeleteButton>
          </ActionButtons>

          <CategoryListHeader>
            카테고리 전체 {categories.length}/10개
          </CategoryListHeader>

          <CategoryList>
            {isLoading ? (
              <LoadingMessage>카테고리를 불러오는 중...</LoadingMessage>
            ) : (
              categories.map((category) => (
                <CategoryItem
                  key={category.category_id}
                  $isSelected={selectedCategory?.category_id === category.category_id}
                  $isModified={category.isModified}
                  onClick={() => handleCategorySelect(category)}
                  draggable
                  onDragStart={(e: React.DragEvent) => handleDragStart(e, category)}
                  onDragOver={handleDragOver}
                  onDrop={(e: React.DragEvent) => handleDrop(e, category)}
                >
                  <DragHandle>⋮⋮⋮</DragHandle>
                  <CategoryName $isModified={modifiedCategories[category.category_id]}>{category.name}</CategoryName>
                  <CategoryCount>{category.post_count || 0}</CategoryCount>
                </CategoryItem>
              ))
            )}
          </CategoryList>
        </LeftPanel>

          {selectedCategory && (
          <RightPanel>
              <CategoryInfoForm>
                카테고리 정보
                <InfoField>
                  <Label>카테고리명</Label>
                  <InfoInput
                    value={editedCategoryName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCategoryNameChange(e.target.value)}
                    placeholder="카테고리를 입력해 주세요."
                    $hasError={!!fieldError}
                  />
                  {fieldError && (
                    <FieldErrorMessage>{fieldError}</FieldErrorMessage>
                  )}
                </InfoField>
                <InfoField>
                  <Label>게시글 수</Label>
                  <InfoValue>{selectedCategory.post_count || 0} 개</InfoValue>
                </InfoField>
              </CategoryInfoForm>
          </RightPanel>
          ) }
      </MainContent>

      {error && (
        <ErrorMessage>
          {error}
        </ErrorMessage>
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  padding: 24px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 600;
  color: #111827;
`;

const SaveButton = styled.button`
  padding: 8px 16px;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  background: #f3f4f6;
  color: #374151;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background: #e5e7eb;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const MainContent = styled.div`
  display: flex;
  gap: 24px;
  height: calc(100vh - 200px);
`;

const LeftPanel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const RightPanel = styled.div`
  flex: 1;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  padding: 20px;
  height: fit-content;
  display: flex;
  flex-direction: column;
`;

const CategoryInfoForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const InfoField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #374151;
`;

const InfoInput = styled.input<{ $hasError?: boolean }>`
  height: 40px;
  border: 1px solid ${props => props.$hasError ? '#dc2626' : '#e5e7eb'};
  border-radius: 4px;
  padding: 0 12px;
  font-size: 14px;
  color: #111827;

  &:focus {
    outline: none;
    border-color: ${props => props.$hasError ? '#dc2626' : '#1b7eff'};
  }
`;

const InfoValue = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #6b7280;
  background: #f3f4f6;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  padding: 0 12px;
`;

const NoSelectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 60px 20px;
  flex: 1;
  min-height: 300px;
`;

const NoSelectionIcon = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
  opacity: 0.6;
`;

const NoSelectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 8px;
`;

const NoSelectionDescription = styled.p`
  font-size: 14px;
  color: #6b7280;
  line-height: 1.5;
  margin: 0;
`;

const FieldErrorMessage = styled.div`
  color: #dc2626;
  font-size: 12px;
  margin-top: 4px;
`;

const ErrorMessage = styled.div`
  background: #fef2f2;
  border: 1px solid #fecaca;
  color: #dc2626;
  padding: 12px;
  border-radius: 4px;
  margin-bottom: 16px;
  font-size: 14px;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
`;

const AddButton = styled.button`
  padding: 8px 16px;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  background: #fff;
  color: #374151;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background: #f9fafb;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const DeleteButton = styled.button`
  padding: 8px 16px;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  background: #6b7280;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background: #4b5563;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    background: #9ca3af;
  }
`;

const AddCategoryForm = styled.div`
  margin-bottom: 24px;
`;

const Input = styled.input`
  width: 100%;
  max-width: 400px;
  height: 40px;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  padding: 0 12px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #1b7eff;
  }
`;

const CategoryListHeader = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 12px;
  padding: 8px 0;
`;

const CategoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const CategoryItem = styled.div<{ $isSelected: boolean; $isModified?: boolean }>`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  background: ${props => {
    if (props.$isModified) return '#f3f4f6'; // 수정된 카테고리는 회색 배경
    return props.$isSelected ? '#f3f4f6' : '#fff';
  }};
  border: 1px solid ${props => props.$isSelected ? '#d1d5db' : '#e5e7eb'};
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #f9fafb;
    border-color: #d1d5db;
  }

  &:active {
    transform: scale(0.98);
  }
`;

const DragHandle = styled.div`
  color: #9ca3af;
  font-size: 12px;
  margin-right: 12px;
  user-select: none;
`;

const CategoryName = styled.div<{ $isModified?: boolean }>`
  flex: 1;
  font-size: 14px;
  color: ${props => props.$isModified ? '#9ca3af' : '#374151'};
  font-weight: 500;
`;

const CategoryCount = styled.div`
  font-size: 14px;
  color: #6b7280;
  background: #f3f4f6;
  padding: 4px 8px;
  border-radius: 12px;
  min-width: 24px;
  text-align: center;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 40px;
  color: #6b7280;
  font-size: 14px;
`;

export default Category;

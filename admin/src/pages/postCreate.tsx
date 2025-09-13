import styled from "styled-components";
import { useState, useEffect } from "react";
import MDEditor from "@uiw/react-md-editor";
import axios from "axios";

interface Category {
  category_id: number;
  name: string;
  reg_user: string;
  mod_user: string;
  sort: number;
}

const PostCreate = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [content, setContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [username, setUsername] = useState<string>("");
  const [isUploadingContentImage, setIsUploadingContentImage] = useState(false);

  // API URL 상수
  const API_URL = process.env.REACT_APP_BACKEND_HOST || "http://localhost:3000";

  // 카테고리 목록 가져오기
  const fetchCategories = async () => {
    setIsLoadingCategories(true);
    try {
      const response = await axios.get(`${API_URL}/api/client/category/select/all`);
      console.log(response.data);
      setCategories(response.data || []);
    } catch (err) {
      console.error("카테고리 로드 실패:", err);
      setError("카테고리를 불러오는데 실패했습니다.");
    } finally {
      setIsLoadingCategories(false);
    }
  };

  const getCategoryId = (categoryValue: string): number => {
    const selectedCategory = categories.find(cat => cat.category_id.toString() === categoryValue);
    return selectedCategory?.category_id || 1;
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    setIsUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append('uploadFiles', file);
      
      const response = await axios.post(`${API_URL}/api/upload`, formData, {
        timeout: 30000,
        withCredentials: true,
      });
      
      if (response.status === 200 && response.data && Array.isArray(response.data) && response.data.length > 0) {
        const imageUrl = response.data[0].imageUrl;
        return imageUrl;
      }
      return null;
    } catch (err) {
      console.error("이미지 업로드 실패:", err);
      setError("이미지 업로드에 실패했습니다.");
      return null;
    } finally {
      setIsUploadingImage(false);
    }
  };

  const uploadContentImage = async (file: File): Promise<string | null> => {
    setIsUploadingContentImage(true);
    try {
      const formData = new FormData();
      formData.append('uploadFiles', file);
      
      const response = await axios.post(`${API_URL}/api/upload`, formData, {
        timeout: 30000,
        withCredentials: true, 
      });
      
      if (response.status === 200 && response.data && Array.isArray(response.data) && response.data.length > 0) {
        const imageUrl = response.data[0].imageUrl;
        return imageUrl;
      }
      return null;
    } catch (err) {
      console.error("이미지 업로드 실패:", err);
      setError("이미지 업로드에 실패했습니다.");
      return null;
    } finally {
      setIsUploadingContentImage(false);
    }
  };

  const savePost = async (isDraft: boolean = false) => {
    if (!title.trim()) {
      setError("제목을 입력해주세요.");
      return;
    }
    if (!category) {
      setError("카테고리를 선택해주세요.");
      return;
    }
    if (!content.trim()) {
      setError("내용을 입력해주세요.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${API_URL}/api/admin/post/insert`, {
          category_id: getCategoryId(category),
          thumbnail: uploadedImageUrl || "",
          title: title.trim(),
          reg_user: username || "err",
          state_id: isDraft ? 2 : 1, // 임시저장은 2, 등록은 1
          content: content.trim(),
          main_sort: 0,
          use_yn: true
        });

      if (response.status === 200) {
        const message = isDraft ? "임시저장되었습니다." : "게시글이 성공적으로 등록되었습니다.";
        alert(message);

        if (!isDraft) {
          setTitle("");
          setCategory("");
          setThumbnail(null);
          setUploadedImageUrl(null);
          setContent("");
        }
      }
    } catch (err) {
      console.error("게시글 저장 실패:", err);
      const errorMessage = isDraft ? "임시저장에 실패했습니다." : "게시글 등록에 실패했습니다.";
      setError(`${errorMessage} 다시 시도해주세요.`);
    } finally {
      setIsLoading(false);
    }
  };
  
  const createPost = () => savePost(false);
  const saveDraft = () => savePost(true);

  useEffect(() => {
    fetchCategories();
    // 로컬 스토리지에서 username 가져오기
    const storedUsername = localStorage.getItem('@user_name');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const onChangeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (!file.type.startsWith('image/')) {
      setError('이미지 파일만 업로드 가능합니다.');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError('파일 크기는 10MB 이하여야 합니다.');
      return;
    }
    
    const localUrl = URL.createObjectURL(file);
    setThumbnail(localUrl);
    
    const uploadedUrl = await uploadImage(file);
    if (uploadedUrl) {
      setUploadedImageUrl(uploadedUrl);
    } else {
      setThumbnail(null);
    }
  };

  const fileToDataUrl = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const insertTextAtCursor = (text: string) => {
    setContent(prev => `${prev}${text}`);
  };

  const handlePasteImage = async (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const items = e.clipboardData?.items;
    if (!items) return;
    for (let i = 0; i < items.length; i += 1) {
      const item = items[i];
      if (item.type.startsWith("image/")) {
        e.preventDefault();
        const file = item.getAsFile();
        if (!file) return;
        
        const uploadedUrl = await uploadContentImage(file);
        if (uploadedUrl) {
          insertTextAtCursor(`\n![pasted-image](${API_URL}${uploadedUrl})\n`);
        } else {
          const dataUrl = await fileToDataUrl(file);
          insertTextAtCursor(`\n![pasted-image](${dataUrl})\n`);
        }
        break;
      }
    }
  };

  // 드래그 앤 드롭 핸들러
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length === 0) return;
    
    for (const file of imageFiles) {
      const uploadedUrl = await uploadContentImage(file);
      if (uploadedUrl) {
        insertTextAtCursor(`\n![${file.name}](${API_URL}/${uploadedUrl})\n`);
      }
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    const imageFiles = Array.from(files).filter(file => file.type.startsWith('image/'));
    
    for (const file of imageFiles) {
      const uploadedUrl = await uploadContentImage(file);
      if (uploadedUrl) {
        insertTextAtCursor(`\n![${file.name}](${uploadedUrl})\n`);
      }
    }
    
    e.target.value = '';
  };

  return (
    <Container>
      <Title>게시글 작성</Title>

      <FormRow>
        <Label>카테고리</Label>
        <Select 
          value={category} 
          onChange={(e:React.ChangeEvent<HTMLSelectElement>) => setCategory(e.target.value)}
          disabled={isLoadingCategories}
        >
          <option value="">
            {isLoadingCategories ? "카테고리 로딩 중..." : "카테고리를 선택하세요."}
          </option>
          {categories.map((cat) => (
            <option key={cat.category_id} value={cat.category_id.toString()}>
              {cat.name}
            </option>
          ))}
        </Select>
      </FormRow>

      <FormRow>
        <Label>대표 이미지</Label>
        <ThumbBox>
          {thumbnail ? (
            <Thumb src={thumbnail} alt="thumbnail" />
          ) : (
            <ThumbPlaceholder>
              {isUploadingImage ? "업로드 중..." : "+"}
            </ThumbPlaceholder>
          )}
          <input 
            type="file" 
            accept="image/*" 
            onChange={onChangeFile}
            disabled={isUploadingImage}
          />
          <Guide>
            - 확장자 : PNG, JPEG, JPG만 가능
            <br />- 용량 : 최대 10MB
            <br />- 권장 크기 : 1200 x 600 이상
            <br />- 이미지 업로드 시, 자동으로 사이즈(1200x580)가 조절됩니다.
          </Guide>
        </ThumbBox>
      </FormRow>

      <FormRow>
        <Label>제목</Label>
        <Input
          placeholder="제목을 입력하세요."
          value={title}
          onChange={(e:React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
        />
      </FormRow>

      <EditorWrapper data-color-mode="light">
        <EditorHeader>
          <Label>내용</Label>
        </EditorHeader>
        
        <EditorContainer
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          $isUploading={isUploadingContentImage}
        >
          <MDEditor 
            value={content}
            onChange={(v:string) => setContent(v || "")}
            height={480}
            textareaProps={{
              onPaste: handlePasteImage,
            }}
          />
          {isUploadingContentImage && (
            <UploadOverlay>
              <UploadMessage>이미지 업로드 중...</UploadMessage>
            </UploadOverlay>
          )}
        </EditorContainer>
      </EditorWrapper>

      {error && (
        <ErrorMessage>
          {error}
        </ErrorMessage>
      )}

      <Actions>
        <Button 
          type="button" 
          onClick={saveDraft}
          disabled={isLoading}
        >
          {isLoading ? "임시저장 중..." : "임시저장"}
        </Button>
        <PrimaryButton 
          type="button" 
          onClick={createPost}
          disabled={isLoading}
        >
          {isLoading ? "등록 중..." : "등록"}
        </PrimaryButton>
      </Actions>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  padding: 24px;
`;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
`;

const Subtitle = styled.h2`
  font-size: 14px;
  font-weight: 600;
  margin: 16px 0 8px;
`;

const FormRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 16px;
`;

const Label = styled.label`
  width: 100px;
  padding-top: 10px;
  color: #111827;
  font-size: 14px;
`;

const Select = styled.select`
  height: 40px;
  min-width: 240px;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  padding: 0 10px;
  background: #fff;
`;

const Input = styled.input`
  height: 40px;
  flex: 1;
  min-width: 320px;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  padding: 0 12px;
`;

const ThumbBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Thumb = styled.img`
  width: 240px;
  height: 144px;
  object-fit: cover;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
`;

const ThumbPlaceholder = styled.div`
  width: 240px;
  height: 144px;
  border: 1px dashed #9ca3af;
  color: #9ca3af;
  display: grid;
  place-items: center;
  border-radius: 4px;
  font-size: 28px;
`;

const Guide = styled.p`
  color: #6b7280;
  font-size: 12px;
  line-height: 1.5;
`;

const EditorWrapper = styled.div`
  margin-top: 16px;
`;

const EditorHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;


const EditorContainer = styled.div<{ $isUploading: boolean }>`
  position: relative;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  background: #fff;
  
  ${props => props.$isUploading && `
    border-color: #1b7eff;
    border-style: dashed;
  `}
`;

const UploadOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  border-radius: 4px;
`;

const UploadMessage = styled.div`
  background: #1b7eff;
  color: white;
  padding: 12px 24px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 20px;
`;

const Button = styled.button`
  height: 40px;
  padding: 0 16px;
  border-radius: 4px;
  background: #f3f4f6;
`;

const PrimaryButton = styled(Button)`
  background: #1b7eff;
  color: #fff;
  
  &:disabled {
    background: #9ca3af;
    cursor: not-allowed;
  }
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

export default PostCreate;



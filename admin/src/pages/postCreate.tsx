import styled from "styled-components";
import { useState, useEffect } from "react";
import MDEditor from "@uiw/react-md-editor";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/header/header";
import { colors } from "../common/designSystem";

interface Category {
  category_id: number;
  name: string;
  reg_user: string;
  mod_user: string;
  sort: number;
}

interface PostData {
  post_id: string;
  category: {
    category_id: number;
    name: string;
    reg_user: string;
    mod_user: string;
    sort: number;
  };
  content: {
    content_id: number;
    post_id: string;
    state: {
      state_id: number;
      name: string;
    };
    content: string;
  };
  postView: {
    view_id: number;
    post_id: string;
    view: number;
    regDate: string;
  };
  title: string;
  thumbnail: string;
  main_sort: number;
  use_yn: boolean;
  reg_user: string;
  regDate: string;
  modDate: string;
}

const PostCreate = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const postId = id;
  const isEditMode = Boolean(postId);
  
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [content, setContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [username, setUsername] = useState<string>("");
  const [isUploadingContentImage, setIsUploadingContentImage] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoadingPost, setIsLoadingPost] = useState(false);
  const [isDraftPost, setIsDraftPost] = useState(false);
  const [titleError, setTitleError] = useState<string>("");

  const API_URL = "";
  const MAX_TITLE_LENGTH = 100;

  const fetchCategories = async () => {
    setIsLoadingCategories(true);
    try {
      const response = await axios.get(`${API_URL}/api/client/category/select/all`);
      console.log(response.data);
      setCategories(response.data || []);
    } catch (err) {
      console.error("카테고리 로드 실패:", err);
      alert("카테고리를 불러오는데 실패했습니다.");
    } finally {
      setIsLoadingCategories(false);
    }
  };

  const fetchPostData = async (id: string) => {
    setIsLoadingPost(true);
    try {
      const response = await axios.get(`${API_URL}/api/admin/post/select/${id}`);
      const postData: PostData = response.data;
      
      setTitle(postData.title);
      setCategory(postData.category.category_id.toString());
      setContent(postData.content.content);
      
      const isDraft = postData.content.state.state_id === 2;
      setIsDraftPost(isDraft);
      
      if (postData.thumbnail) {
        const thumbnailUrl = postData.thumbnail.startsWith('http') 
          ? postData.thumbnail 
          : `${API_URL}${postData.thumbnail.startsWith('/') ? '' : '/'}${postData.thumbnail}`;
        
        setThumbnail(thumbnailUrl);
        setUploadedImageUrl(postData.thumbnail);
      }
      
    } catch (err) {
      console.error("게시글 데이터 로드 실패:", err);
      alert("게시글 데이터를 불러오는데 실패했습니다.");
    } finally {
      setIsLoadingPost(false);
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
      alert("이미지 업로드에 실패했습니다.");
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
      alert("이미지 업로드에 실패했습니다.");
      return null;
    } finally {
      setIsUploadingContentImage(false);
    }
  };

  const savePost = async (isDraft: boolean = false) => {
    // 제목 검증
    const titleValidationError = validateTitle(title);
    if (titleValidationError) {
      setTitleError(titleValidationError);
      return;
    }

    setIsLoading(true);

    try {
      if (isEditMode && postId) {
        const response = await axios.put(`${API_URL}/api/admin/post/update`, {
          post_id: postId,
          category_id: getCategoryId(category),
          state_id: isDraft ? 2 : 1, // 임시저장은 2, 등록은 1
          reg_user: username || "err",
          thumbnail: uploadedImageUrl || "",
          title: title.trim(),
          content: content.trim(),
          main_sort: 0,
          use_yn: true
        });

        if (response.status === 200) {
          const message = isDraft ? "임시저장되었습니다." : "게시글이 성공적으로 수정되었습니다.";
          alert(message);

          if (!isDraft) {
            setIsDraftPost(false);
            // 수정 성공 시 게시글 목록으로 이동
            navigate('/post');
          }
        }
      } else {
        // 생성 모드
        const response = await axios.post(`${API_URL}/api/admin/post/insert`, {
            category_id: getCategoryId(category),
            thumbnail: uploadedImageUrl || "",
            title: title.trim(),
            reg_user: username || "err",
            state_id: isDraft ? 2 : 1,
            content: content.trim(),
            main_sort: 0,
            use_yn: true
          });

        if (response.status === 200) {
          const message = isDraft ? "임시저장되었습니다." : "게시글이 성공적으로 등록되었습니다.";
          alert(message);

          if (!isDraft) {
            // 등록 성공 시 게시글 목록으로 이동
            navigate('/post');
          } else {
            // 임시저장 시 폼 초기화
            setTitle("");
            setCategory("");
            setThumbnail(null);
            setUploadedImageUrl(null);
            setContent("");
          }
        }
      }
    } catch (err) {
      console.error("게시글 저장 실패:", err);
      const errorMessage = isDraft 
        ? "임시저장에 실패했습니다." 
        : isEditMode 
          ? "게시글 수정에 실패했습니다." 
          : "게시글 등록에 실패했습니다.";
      alert(`${errorMessage} 다시 시도해주세요.`);
    } finally {
      setIsLoading(false);
    }
  };
  
  const createPost = () => savePost(false);
  const saveDraft = () => savePost(true);

  useEffect(() => {
    fetchCategories();
    const storedUsername = localStorage.getItem('@user_name');
    if (storedUsername) {
      setUsername(storedUsername);
    }
    
    if (isEditMode && postId) {
      fetchPostData(postId);
    }
  }, [isEditMode, postId]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('[data-dropdown]')) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  const onChangeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (!file.type.startsWith('image/')) {
      alert('이미지 파일만 업로드 가능합니다.');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert('파일 크기는 10MB 이하여야 합니다.');
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

  const handleDeleteThumbnail = () => {
    setThumbnail(null);
    setUploadedImageUrl(null);
  };

  const validateTitle = (titleValue: string): string => {
    if (!titleValue.trim()) {
      return "필수 항목을 입력하세요";
    }
    if (titleValue.length > MAX_TITLE_LENGTH) {
      return "제한 글자수를 초과하였습니다.";
    }
    return "";
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTitle(value);
    
    // 실시간 검증
    const error = validateTitle(value);
    setTitleError(error);
  };

  return (
    <Container>
      
      <Header title={isEditMode ? "게시글 수정" : "게시글 작성"}>
        <BtnWrapper>
          {(!isEditMode || isDraftPost) && (
            <TempSave onClick={saveDraft} disabled={isLoading || isLoadingPost}>임시저장</TempSave>
          )}
          <Save onClick={createPost} disabled={isLoading || isLoadingPost}>
            {isEditMode ? (isDraftPost ? "등록" : "수정") : "등록"}
          </Save>
        </BtnWrapper>
      </Header>

      <MainContents>
        {isLoadingPost && (
          <LoadingMessage>게시글 데이터를 불러오는 중...</LoadingMessage>
        )}
        
        <FormRow>
          <Label>카테고리</Label>
          <SelectWrapper data-dropdown>
            <SelectButton 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              disabled={isLoadingCategories || isLoadingPost}
              $isOpen={isDropdownOpen}
            >
              <SelectText>
                {isLoadingCategories 
                  ? "카테고리 로딩 중..." 
                  : isLoadingPost
                    ? "게시글 로딩 중..."
                    : category 
                      ? categories.find(cat => cat.category_id.toString() === category)?.name || "카테고리를 설정하세요."
                      : "카테고리를 설정하세요."
                }
              </SelectText>
              <ArrowIcon 
                src={isDropdownOpen ? "/admin/img/icon_arrowUp.png" : "/admin/img/icon_arrowDown.png"}
              />
            </SelectButton>
            
            {isDropdownOpen && (
              <DropdownList>
                {categories.map((cat) => (
                  <DropdownItem
                    key={cat.category_id}
                    onClick={() => {
                      setCategory(cat.category_id.toString());
                      setIsDropdownOpen(false);
                    }}
                    $isSelected={category === cat.category_id.toString()}
                  >
                    {cat.name}
                  </DropdownItem>
                ))}
              </DropdownList>
            )}
          </SelectWrapper>
        </FormRow>

        <FormRow>
          <Label>대표 이미지</Label>
          <ThumbBox>
            {thumbnail ? (
              <ThumbContainer>
                <Thumb src={thumbnail} alt="thumbnail" />
                <DeleteButton onClick={handleDeleteThumbnail} title="이미지 삭제">
                  <img src="/admin/img/icon_closeBtn.png" alt="삭제" />
                </DeleteButton>
              </ThumbContainer>
            ) : (
              <ThumbPlaceholder htmlFor="thumbnail-input">
                {isUploadingImage ? "업로드 중..." : <img src="/admin/img/icon_plus.png" />}
              </ThumbPlaceholder>
            )}
            <input 
              id="thumbnail-input"
              type="file" 
              accept="image/*" 
              onChange={onChangeFile}
              disabled={isUploadingImage || isLoadingPost}
              style={{ display: 'none' }}
            />
            <Guide>
              <li>대표 이미지는 최대 1개까지 설정할 수 있습니다.</li>
              <li>pdf.png.jpg 형식의 파일만 등록 가능합니다.</li>
              <li>이미지 업로드 시, 자동으로 사이즈(1200x600)가 조절됩니다.</li>
            </Guide>
          </ThumbBox>
        </FormRow>

        <FormRow>
          <Label $title = {true}>제목</Label>
          <InputWrapper>
            <Input
              placeholder="제목을 입력하세요."
              value={title}
              onChange={handleTitleChange}
              disabled={isLoadingPost}
              $hasError={!!titleError}
            />
            {titleError && <ErrorMessage>{titleError}</ErrorMessage>}
          </InputWrapper>
        </FormRow>

        <EditorWrapper data-color-mode="light">

          <Label>내용</Label>
          
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


      </MainContents>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  padding: 24px;
`;

const BtnWrapper = styled.div`
  display: flex;
  align-items: center;
  gap:15px;
`

const TempSave = styled.button`
  font-family: 'Pretendard-SemiBold';
  font-size: 16px;
  padding:10px 0%;
  width: 80px;
  height: 46px;
  border:1px solid ${colors.LightGray[400]};
  border-radius: 4px;
  color: ${colors.Black};
  background-color: ${colors.White};
`

const Save = styled(TempSave)`
  color: ${colors.White};
  background-color: ${colors.Black};
  border:none;
`

const MainContents = styled.div`
  width: 100%;
  padding:0 32 32 38px;
  display: flex;
  flex-direction: column;
  gap:24px;
`

const FormRow = styled.div`
  display: flex;
  gap: 24px;
`;

const Label = styled.div<{$title:boolean}>`
  width: 88px;
  height: 40px;
  
  display: flex;
  align-items: center;

  font-family: 'Pretendard-SemiBold';
  font-size: 16px;
  color: ${colors.Black};

  position:${props=>props.$title && `relative`};

  &::after{
    position:absolute;
    left:33px;
    top:50%;
    transform:translateY(-50%);
    content:${props=>props.$title ? `""`:`none`};
    width: 4px;
    height: 4px;
    border-radius:50%;
    background-color:${colors.Error}
  }
`;

const SelectWrapper = styled.div`
  position: relative;
  width: 320px;
`;

const SelectButton = styled.button<{ $isOpen: boolean }>`
  width: 100%;
  height: 40px;
  padding: 0 12px;
  border: 1px solid ${colors.LightGray[400]};
  background-color: ${colors.White};
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  font-family: 'Pretendard-Regular';
  font-size: 14px;
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

const SelectText = styled.span`
  font-family: 'Pretendard-Regular';
  color: ${colors.Gray[200]};
  font-size: 14px;
`;

const DropdownList = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 5px;
  background-color: ${colors.White};
  border: 1px solid ${colors.LightGray[300]};
  border-radius: 4px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 10;
`;

const DropdownItem = styled.div<{ $isSelected: boolean }>`
  padding: 10px 12px;
  height: 40px;
  cursor: pointer;
  font-family: 'Pretendard-Regular';
  font-size: 14px;
  color: ${colors.Black};
  background-color: ${props => props.$isSelected ? colors.LightGray[100] : 'transparent'};
  
  &:hover {
    background-color: ${colors.LightGray[100]};
  }
  
  &:first-child {
    border-radius: 4px 4px 0 0;
  }
  
  &:last-child {
    border-radius: 0 0 4px 4px;
  }
`;

const ArrowIcon = styled.img`
  width: 16px;
  height: 16px;
  pointer-events: none;
`

const ThumbBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Input = styled.input<{ $hasError: boolean }>`
  width: 100%;
  height: 40px;
  padding: 9px 16px;
  border: 1px solid ${props => props.$hasError ? colors.Error : colors.LightGray[400]};
  border-radius: 4px;
  font-family: 'Pretendard-Regular';
  font-size: 14px;
  line-height: 1.6;
  color: ${colors.Black};
  
  &::placeholder{
    font-family: 'Pretendard-Regular';
    font-size: 14px;
    line-height: 1.6;
    color: ${colors.Gray[200]};
  }
  
  &:focus {
    outline: none;
    border-color: ${props => props.$hasError ? colors.Error : colors.Black};
  }
`;

const ErrorMessage = styled.div`
  margin-top: 4px;
  font-family: 'Pretendard-Regular';
  font-size: 12px;
  color: ${colors.Error};
  line-height: 1.4;
`;

const ThumbPlaceholder = styled.label`
  width: 320px;
  height: 160px;
  object-fit: cover;
  border: 1px solid ${colors.LightGray[300]};
  border-radius: 4px;

  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  img{
    width: 32px;
    height: 32px;
  }
  
`

const ThumbContainer = styled.div`
  position: relative;
  width: 320px;
  height: 160px;
`;

const Thumb = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 24px;
  height: 24px;
  border: none;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
  
  img {
    width: 12px;
    height: 12px;
    filter: brightness(0) invert(1);
  }
`;


const Guide = styled.ul`
  font-family: 'Pretendard-Regular';
  color: ${colors.Gray[200]};
  font-size: 14px;
  line-height: 1.4;

  padding-left:20px;

  li{
    position:relative;

    &::before{
    position:absolute;
    left:-10px;
    top:50%;
    transform:translateY(-50%);
    content:"";
    width: 4px;
    height: 4px;
    border-radius:50%;
    background-color:${colors.Gray[200]};
  }
  }

`;

const EditorWrapper = styled.div`
`;

const EditorContainer = styled.div<{ $isUploading: boolean }>`
  position: relative;
  border: 1px solid ${colors.LightGray[300]};
  border-radius: 4px;
  
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


const LoadingMessage = styled.div`
  background: #f0f9ff;
  border: 1px solid #bae6fd;
  color: #0369a1;
  padding: 12px;
  border-radius: 4px;
  margin-bottom: 16px;
  font-size: 14px;
  text-align: center;
`;

export default PostCreate;



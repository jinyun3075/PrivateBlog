import styled from "styled-components";
import { useRef, useState } from "react";
import MDEditor from "@uiw/react-md-editor";

const PostCreate = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [content, setContent] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setThumbnail(url);
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
    const el = textareaRef.current;
    if (!el) {
      setContent(prev => `${prev}${text}`);
      return;
    }
    const start = el.selectionStart ?? 0;
    const end = el.selectionEnd ?? 0;
    const before = content.slice(0, start);
    const after = content.slice(end);
    const next = `${before}${text}${after}`;
    setContent(next);
    requestAnimationFrame(() => {
      el.selectionStart = el.selectionEnd = start + text.length;
      el.focus();
    });
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
        const dataUrl = await fileToDataUrl(file);
        insertTextAtCursor(`\n![pasted-image](${dataUrl})\n`);
        break;
      }
    }
  };

  return (
    <Container>
      <Title>게시글 작성</Title>

      <FormRow>
        <Label>카테고리</Label>
        <Select value={category} onChange={(e:React.ChangeEvent<HTMLSelectElement>) => setCategory(e.target.value)}>
          <option value="">카테고리를 선택하세요.</option>
          <option value="notice">공지</option>
          <option value="dev">개발</option>
          <option value="life">일상</option>
        </Select>
      </FormRow>

      <FormRow>
        <Label>대표 이미지</Label>
        <ThumbBox>
          {thumbnail ? (
            <Thumb src={thumbnail} alt="thumbnail" />
          ) : (
            <ThumbPlaceholder>+</ThumbPlaceholder>
          )}
          <input type="file" accept="image/*" onChange={onChangeFile} />
          <Guide>
            - 대표 이미지는 한 번에 1개만 설정할 수 있습니다.
            <br />- pdf,png,jpg 형식의 파일만 등록 가능합니다.
            <br />- 이미지 업로드 시, 최적의 사이즈(1200x600)가 권장됩니다.
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
        <Label>내용</Label>
        <MDEditor 
          value={content}
          onChange={(v:string) => setContent(v || "")}
          height={480}
          textareaProps={{
            ref: textareaRef,
            onPaste: handlePasteImage,
          }}
        />
      </EditorWrapper>

      <Actions>
        <Button type="button">임시저장</Button>
        <PrimaryButton type="button">등록</PrimaryButton>
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
`;

export default PostCreate;



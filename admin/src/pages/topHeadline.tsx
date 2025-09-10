<<<<<<< HEAD
const TopHeadline = () => {
  return(
    <>top headline</>
=======
import styled from "styled-components"
import Header from "../components/header/header"
import { colors } from "../common/designSystem"
import { MainContents } from "../common/style"

const TopHeadline = () => {
  return(
    <Container>
      <Header title="Top 헤드라인">
        <SaveBtn>저장</SaveBtn>
      </Header>

      <MainContents>
        <ToggleSection>
          <ToggleLabel>헤드 사용 여부</ToggleLabel>
          <ToggleSwitch>
            <ToggleInput type="checkbox" defaultChecked />
            <ToggleSlider />
          </ToggleSwitch>
        </ToggleSection>

        <TableContainer>
          <Table>
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
            <TableBody>
              <TableRow>
                <TableCell>
                  <DragHandle>⋮⋮</DragHandle>
                </TableCell>
                <TableCell>1</TableCell>
                <TableCell>다양한 ML 모델을 만드는 법: FeatureKit</TableCell>
                <TableCell>
                  <ChangeButton>변경</ChangeButton>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DragHandle>⋮⋮</DragHandle>
                </TableCell>
                <TableCell>2</TableCell>
                <TableCell>React 훅 완벽 가이드: useState, useEffect 등 주요 훅 사용법 정리 들어갑니다.</TableCell>
                <TableCell>
                  <ChangeButton>변경</ChangeButton>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DragHandle>⋮⋮</DragHandle>
                </TableCell>
                <TableCell>3</TableCell>
                <TableCell>Docker로 개발 환경 세팅하기</TableCell>
                <TableCell>
                  <ChangeButton>변경</ChangeButton>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </MainContents>
    </Container>
>>>>>>> develop
  )
}


<<<<<<< HEAD
=======

const Container = styled.div`
  width: 100%;
`

const SaveBtn = styled.button`
  background-color: ${colors.LightGray[300]};
  width: 80px;
  padding:10px 0;
  font-family: 'Pretendard-SemiBold';
  font-size: 16px;
  color: ${colors.White};
  border-radius: 4px;
`

const ToggleSection = styled.div`
  display: flex;
  align-items: center;
  gap:15px;
  padding: 18px 0;
`

const ToggleLabel = styled.h2`
  font-family: 'Pretendard-SemiBold';
  font-size: 18px;
  color: ${colors.Black};
`

const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 57.6px;
  height: 26.4px;
`

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
`

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
`

const TableContainer = styled.div`
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`

const TableHeader = styled.thead`
  border-top: 1.2px solid ${colors.LightGray[300]};
  border-bottom: 1.2px solid ${colors.LightGray[300]};
`

const TableBody = styled.tbody`

`

const TableRow = styled.tr`
  border-bottom: 1px solid ${colors.LightGray[300]};
`

const TableHeaderCell = styled.th<{ width?: string }>`
  background-color: ${colors.LightGray[0]};
  padding: 16px 20px;
  text-align: left;
  font-family: 'Pretendard-SemiBold';
  font-size: 16px;
  color: ${colors.Black};
  width: ${props => props.width || 'auto'};

`

const TableCell = styled.td`
  padding: 15.6px 19.2px;
  font-family: 'Pretendard-Medium';
  font-size: 16px;
  color: ${colors.Black};
`

const HeaderContent = styled.div`
  position: relative;
  
  &::before{
    content:"";
    position: absolute;
    width: 1.2px;
    height: 26px;
    top:calc(50% - 13px);
    left:-19.2px;

    background-color:${colors.LightGray[300]};
  }

`

const HeaderText = styled.div`
  font-family: 'Pretendard-SemiBold';
  font-size: 16px;
`

const DragHandle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 12px;
  height: 19px;
  color: ${colors.Gray[100]};
`

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
  
`

>>>>>>> develop
export default TopHeadline
